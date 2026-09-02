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
      admin_audit_log: {
        Row: {
          action: string
          admin_email: string | null
          admin_id: string
          created_at: string
          id: string
          notes: string | null
          target_label: string | null
          target_user_id: string | null
        }
        Insert: {
          action: string
          admin_email?: string | null
          admin_id: string
          created_at?: string
          id?: string
          notes?: string | null
          target_label?: string | null
          target_user_id?: string | null
        }
        Update: {
          action?: string
          admin_email?: string | null
          admin_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          target_label?: string | null
          target_user_id?: string | null
        }
        Relationships: []
      }
      alias_sync_jobs: {
        Row: {
          action: string
          attempts: number
          created_at: string
          id: string
          last_error: string | null
          max_attempts: number
          payload: Json
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          action: string
          attempts?: number
          created_at?: string
          id?: string
          last_error?: string | null
          max_attempts?: number
          payload?: Json
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          action?: string
          attempts?: number
          created_at?: string
          id?: string
          last_error?: string | null
          max_attempts?: number
          payload?: Json
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      analytics_events: {
        Row: {
          created_at: string
          device_type: string | null
          event_type: string
          id: string
          profile_id: string
          referrer: string | null
        }
        Insert: {
          created_at?: string
          device_type?: string | null
          event_type: string
          id?: string
          profile_id: string
          referrer?: string | null
        }
        Update: {
          created_at?: string
          device_type?: string | null
          event_type?: string
          id?: string
          profile_id?: string
          referrer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      badge_events: {
        Row: {
          action: string
          badge_slug: string
          created_at: string
          details: Json
          id: string
          source: string
          user_id: string
        }
        Insert: {
          action?: string
          badge_slug: string
          created_at?: string
          details?: Json
          id?: string
          source?: string
          user_id: string
        }
        Update: {
          action?: string
          badge_slug?: string
          created_at?: string
          details?: Json
          id?: string
          source?: string
          user_id?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          color: string
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          slug: string
          sort_order: number
        }
        Insert: {
          color?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name: string
          slug: string
          sort_order?: number
        }
        Update: {
          color?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
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
      qr_scans: {
        Row: {
          country: string | null
          device: string | null
          id: string
          scanned_at: string
          tracked_qr_id: string
          user_agent: string | null
        }
        Insert: {
          country?: string | null
          device?: string | null
          id?: string
          scanned_at?: string
          tracked_qr_id: string
          user_agent?: string | null
        }
        Update: {
          country?: string | null
          device?: string | null
          id?: string
          scanned_at?: string
          tracked_qr_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "qr_scans_tracked_qr_id_fkey"
            columns: ["tracked_qr_id"]
            isOneToOne: false
            referencedRelation: "tracked_qrs"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_qrs: {
        Row: {
          config: Json
          created_at: string
          id: string
          name: string
          qr_type: string
          qr_value: string
          updated_at: string
          user_id: string
        }
        Insert: {
          config?: Json
          created_at?: string
          id?: string
          name: string
          qr_type: string
          qr_value: string
          updated_at?: string
          user_id: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          name?: string
          qr_type?: string
          qr_value?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tracked_qrs: {
        Row: {
          created_at: string
          custom_domain: string | null
          dashboard_token: string
          expires_at: string | null
          id: string
          is_active: boolean
          kind: string
          label: string | null
          short_link_enabled: boolean
          slug: string
          target_type: string
          target_url: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          custom_domain?: string | null
          dashboard_token: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          kind?: string
          label?: string | null
          short_link_enabled?: boolean
          slug: string
          target_type: string
          target_url: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          custom_domain?: string | null
          dashboard_token?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          kind?: string
          label?: string | null
          short_link_enabled?: boolean
          slug?: string
          target_type?: string
          target_url?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          awarded_at: string
          awarded_by: string | null
          badge_id: string
          id: string
          user_id: string
        }
        Insert: {
          awarded_at?: string
          awarded_by?: string | null
          badge_id: string
          id?: string
          user_id: string
        }
        Update: {
          awarded_at?: string
          awarded_by?: string | null
          badge_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
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
