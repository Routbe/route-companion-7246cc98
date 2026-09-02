export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      links: {
        Row: {
          created_at: string
          icon: string | null
          id: string
          position: number
          profile_id: string
          title: string
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          icon?: string | null
          id?: string
          position?: number
          profile_id: string
          title: string
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          icon?: string | null
          id?: string
          position?: number
          profile_id?: string
          title?: string
          updated_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "links_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          alias_status: string
          alias_sync_attempts: number
          alias_sync_error: string | null
          alias_sync_status: string
          alias_synced_at: string | null
          avatar_url: string | null
          bio: string | null
          blocks: Json
          bluesky_did: string | null
          business_info: Json
          card_style: string
          created_at: string
          custom_domain: string | null
          display_name: string | null
          favicon_url: string | null
          forwarding_email: string | null
          forwarding_email_token: string | null
          forwarding_email_token_expires_at: string | null
          forwarding_email_verified: boolean
          handle_grant: string | null
          id: string
          is_banned: boolean
          is_early_believer: boolean
          is_paid: boolean
          is_suspended: boolean
          moderated_at: string | null
          moderated_by: string | null
          moderation_reason: string | null
          payment_method: string | null
          redirect_target: string
          referral_count: number
          referred_by: string | null
          show_email_publicly: boolean
          status: string
          subdomain_enabled: boolean
          tagline: string | null
          theme: string
          tier: string
          updated_at: string
          username: string | null
          verified: boolean
          verified_at: string | null
          verified_legal_name: string | null
        }
        Insert: {
          alias_status?: string
          alias_sync_attempts?: number
          alias_sync_error?: string | null
          alias_sync_status?: string
          alias_synced_at?: string | null
          avatar_url?: string | null
          bio?: string | null
          blocks?: Json
          bluesky_did?: string | null
          business_info?: Json
          card_style?: string
          created_at?: string
          custom_domain?: string | null
          display_name?: string | null
          favicon_url?: string | null
          forwarding_email?: string | null
          forwarding_email_token?: string | null
          forwarding_email_token_expires_at?: string | null
          forwarding_email_verified?: boolean
          handle_grant?: string | null
          id: string
          is_banned?: boolean
          is_early_believer?: boolean
          is_paid?: boolean
          is_suspended?: boolean
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_reason?: string | null
          payment_method?: string | null
          redirect_target?: string
          referral_count?: number
          referred_by?: string | null
          show_email_publicly?: boolean
          status?: string
          subdomain_enabled?: boolean
          tagline?: string | null
          theme?: string
          tier?: string
          updated_at?: string
          username?: string | null
          verified?: boolean
          verified_at?: string | null
          verified_legal_name?: string | null
        }
        Update: {
          alias_status?: string
          alias_sync_attempts?: number
          alias_sync_error?: string | null
          alias_sync_status?: string
          alias_synced_at?: string | null
          avatar_url?: string | null
          bio?: string | null
          blocks?: Json
          bluesky_did?: string | null
          business_info?: Json
          card_style?: string
          created_at?: string
          custom_domain?: string | null
          display_name?: string | null
          favicon_url?: string | null
          forwarding_email?: string | null
          forwarding_email_token?: string | null
          forwarding_email_token_expires_at?: string | null
          forwarding_email_verified?: boolean
          handle_grant?: string | null
          id?: string
          is_banned?: boolean
          is_early_believer?: boolean
          is_paid?: boolean
          is_suspended?: boolean
          moderated_at?: string | null
          moderated_by?: string | null
          moderation_reason?: string | null
          payment_method?: string | null
          redirect_target?: string
          referral_count?: number
          referred_by?: string | null
          show_email_publicly?: boolean
          status?: string
          subdomain_enabled?: boolean
          tagline?: string | null
          theme?: string
          tier?: string
          updated_at?: string
          username?: string | null
          verified?: boolean
          verified_at?: string | null
          verified_legal_name?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
