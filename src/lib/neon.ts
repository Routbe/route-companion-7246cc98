import type { NeonQueryFunction } from "@neondatabase/serverless";

/**
 * Server-only database bridge for project ROUT.
 *
 * The original app used @neondatabase/serverless with a direct Postgres URL.
 * Lovable Cloud does not expose the database password, so this module
 * re-implements the same sql/query/transaction surface using Supabase RPC
 * functions that are restricted to the backend service_role.
 *
 * Only import this in server functions, API route handlers, or other
 * server-only modules.
 */

async function getAdminClient() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

const RAW_SYMBOL = Symbol("raw-sql");

type RawSql = { [RAW_SYMBOL]: true; value: string };

export function unsafe(raw: string): RawSql {
  return { [RAW_SYMBOL]: true, value: raw };
}

function isRawSql(value: unknown): value is RawSql {
  return value !== null && typeof value === "object" && RAW_SYMBOL in value;
}

function serializeParam(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "boolean") return value ? "t" : "f";
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return JSON.stringify(value);
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

async function runSingleQuery(text: string, values: unknown[]): Promise<unknown[]> {
  const supabaseAdmin = await getAdminClient();
  const params = values.map(serializeParam);
  const { data, error } = await supabaseAdmin.rpc("exec_query", {
    _query: text,
    _params: params,
  });
  if (error) {
    throw new Error(`Database query failed: ${error.message} (${text.slice(0, 200)})`);
  }
  if (!data) return [];
  const rows = Array.isArray(data) ? data : [data];
  return rows.map((row) => {
    if (row && typeof row === "object" && "jsonb" in row) {
      return (row as { jsonb: unknown }).jsonb;
    }
    return row;
  });
}

async function runTransaction(calls: QueryCall[]): Promise<unknown[][]> {
  const supabaseAdmin = await getAdminClient();
  const payload = calls.map((call) => ({
    query: call.text,
    params: call.values.map(serializeParam),
  }));
  const { data, error } = await supabaseAdmin.rpc("exec_transaction", {
    _queries: payload,
  });
  if (error) {
    throw new Error(`Database transaction failed: ${error.message}`);
  }
  if (!data) return [];
  const results = Array.isArray(data) ? data : [data];
  return results.map((result) => {
    const rows = Array.isArray(result) ? result : [result];
    return rows.map((row: unknown) => {
      if (row && typeof row === "object" && "jsonb" in row) {
        return (row as { jsonb: unknown }).jsonb;
      }
      return row;
    });
  });
}

type QueryCall = {
  text: string;
  values: unknown[];
  then: Promise<unknown[]>["then"];
};

function createQueryCall(text: string, values: unknown[]): QueryCall {
  let promise: Promise<unknown[]> | null = null;
  return {
    text,
    values,
    then: (onfulfilled, onrejected) => {
      if (!promise) promise = runSingleQuery(text, values);
      return promise.then(onfulfilled, onrejected);
    },
  };
}

function buildTaggedTemplate(strings: TemplateStringsArray, values: unknown[]): { text: string; values: unknown[] } {
  let text = "";
  const boundValues: unknown[] = [];
  for (let i = 0; i < strings.length; i++) {
    text += strings[i];
    if (i < values.length) {
      const value = values[i];
      if (isRawSql(value)) {
        text += value.value;
      } else {
        boundValues.push(value);
        text += `$${boundValues.length}`;
      }
    }
  }
  return { text, values: boundValues };
}

const sqlCallable = function (
  this: unknown,
  stringsOrText: TemplateStringsArray | string,
  ...values: unknown[]
): QueryCall {
  if (Array.isArray(stringsOrText) && "raw" in stringsOrText) {
    const { text, values: boundValues } = buildTaggedTemplate(stringsOrText as TemplateStringsArray, values);
    return createQueryCall(text, boundValues);
  }
  const text = typeof stringsOrText === "string" ? stringsOrText : String(stringsOrText);
  return createQueryCall(text, values);
} as unknown as NeonQueryFunction<false, false>;

(sqlCallable as unknown as Record<string, unknown>).query = (
  text: string,
  values?: unknown[],
) => createQueryCall(text, values ?? []);

(sqlCallable as unknown as Record<string, unknown>).transaction = async (
  calls: QueryCall[],
) => {
  return runTransaction(calls);
};

(sqlCallable as unknown as Record<string, unknown>).unsafe = unsafe;

export const sql = sqlCallable;
