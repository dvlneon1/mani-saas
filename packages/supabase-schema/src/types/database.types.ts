// Projeto Mani - Database Types
// Generated from schema - manually maintained
// Run `supabase gen types typescript --local > types/database.types.ts` when CLI available

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      professionals: {
        Row: {
          id: string
          email: string
          name: string
          phone: string | null
          business_name: string | null
          location_type: location_type
          address: Json | null
          settings: Json
          plan_type: plan_type
          plan_expires_at: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          email: string
          name: string
          phone?: string | null
          business_name?: string | null
          location_type?: location_type
          address?: Json | null
          settings?: Json
          plan_type?: plan_type
          plan_expires_at?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string | null
          business_name?: string | null
          location_type?: location_type
          address?: Json | null
          settings?: Json
          plan_type?: plan_type
          plan_expires_at?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      members: {
        Row: {
          id: string
          professional_id: string
          email: string
          name: string
          role: member_role
          phone: string | null
          avatar_url: string | null
          is_active: boolean
          invited_at: string | null
          invited_by: string | null
          joined_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          professional_id: string
          email: string
          name: string
          role?: member_role
          phone?: string | null
          avatar_url?: string | null
          is_active?: boolean
          invited_at?: string | null
          invited_by?: string | null
          joined_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          professional_id?: string
          email?: string
          name?: string
          role?: member_role
          phone?: string | null
          avatar_url?: string | null
          is_active?: boolean
          invited_at?: string | null
          invited_by?: string | null
          joined_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          professional_id: string
          name: string
          email: string | null
          phone: string | null
          birth_date: string | null
          notes: string | null
          tags: string[] | null
          is_vip: boolean
          total_visits: number
          total_spent: number
          last_visit_at: string | null
          anamnese: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          professional_id: string
          name: string
          email?: string | null
          phone?: string | null
          birth_date?: string | null
          notes?: string | null
          tags?: string[] | null
          is_vip?: boolean
          total_visits?: number
          total_spent?: number
          last_visit_at?: string | null
          anamnese?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          professional_id?: string
          name?: string
          email?: string | null
          phone?: string | null
          birth_date?: string | null
          notes?: string | null
          tags?: string[] | null
          is_vip?: boolean
          total_visits?: number
          total_spent?: number
          last_visit_at?: string | null
          anamnese?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          professional_id: string
          name: string
          description: string | null
          category: string | null
          duration_minutes: number
          price: number
          cost: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          professional_id: string
          name: string
          description?: string | null
          category?: string | null
          duration_minutes?: number
          price: number
          cost?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          professional_id?: string
          name?: string
          description?: string | null
          category?: string | null
          duration_minutes?: number
          price?: number
          cost?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          professional_id: string
          client_id: string | null
          member_id: string | null
          service_id: string | null
          status: appointment_status
          location_type: location_type
          address: Json | null
          scheduled_start: string
          scheduled_end: string
          actual_start: string | null
          actual_end: string | null
          notes: string | null
          price: number | null
          payment_status: payment_status
          payment_method: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          professional_id: string
          client_id?: string | null
          member_id?: string | null
          service_id?: string | null
          status?: appointment_status
          location_type?: location_type
          address?: Json | null
          scheduled_start: string
          scheduled_end: string
          actual_start?: string | null
          actual_end?: string | null
          notes?: string | null
          price?: number | null
          payment_status?: payment_status
          payment_method?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          professional_id?: string
          client_id?: string | null
          member_id?: string | null
          service_id?: string | null
          status?: appointment_status
          location_type?: location_type
          address?: Json | null
          scheduled_start?: string
          scheduled_end?: string
          actual_start?: string | null
          actual_end?: string | null
          notes?: string | null
          price?: number | null
          payment_status?: payment_status
          payment_method?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      appointment_photos: {
        Row: {
          id: string
          appointment_id: string
          type: 'before' | 'after'
          url: string
          caption: string | null
          created_at: string
        }
        Insert: {
          id?: string
          appointment_id: string
          type: 'before' | 'after'
          url: string
          caption?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          appointment_id?: string
          type?: 'before' | 'after'
          url?: string
          caption?: string | null
          created_at?: string
        }
      }
      supplies: {
        Row: {
          id: string
          professional_id: string
          name: string
          brand: string | null
          category: string | null
          quantity: number
          unit: string
          min_quantity: number
          cost: number | null
          supplier: string | null
          purchase_date: string | null
          expiry_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          professional_id: string
          name: string
          brand?: string | null
          category?: string | null
          quantity?: number
          unit?: string
          min_quantity?: number
          cost?: number | null
          supplier?: string | null
          purchase_date?: string | null
          expiry_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          professional_id?: string
          name?: string
          brand?: string | null
          category?: string | null
          quantity?: number
          unit?: string
          min_quantity?: number
          cost?: number | null
          supplier?: string | null
          purchase_date?: string | null
          expiry_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          professional_id: string
          appointment_id: string | null
          type: 'income' | 'expense'
          category: string | null
          description: string | null
          amount: number
          payment_method: string | null
          transaction_date: string
          created_at: string
        }
        Insert: {
          id?: string
          professional_id: string
          appointment_id?: string | null
          type: 'income' | 'expense'
          category?: string | null
          description?: string | null
          amount: number
          payment_method?: string | null
          transaction_date: string
          created_at?: string
        }
        Update: {
          id?: string
          professional_id?: string
          appointment_id?: string | null
          type?: 'income' | 'expense'
          category?: string | null
          description?: string | null
          amount?: number
          payment_method?: string | null
          transaction_date?: string
          created_at?: string
        }
      }
      feed_folders: {
        Row: {
          id: string
          professional_id: string
          name: string
          icon: string | null
          color: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          professional_id: string
          name: string
          icon?: string | null
          color?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          professional_id?: string
          name?: string
          icon?: string | null
          color?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      feed_posts: {
        Row: {
          id: string
          professional_id: string
          folder_id: string | null
          source: feed_source
          external_id: string | null
          url: string
          thumbnail_url: string | null
          title: string | null
          description: string | null
          tags: string[] | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          professional_id: string
          folder_id?: string | null
          source: feed_source
          external_id?: string | null
          url: string
          thumbnail_url?: string | null
          title?: string | null
          description?: string | null
          tags?: string[] | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          professional_id?: string
          folder_id?: string | null
          source?: feed_source
          external_id?: string | null
          url?: string
          thumbnail_url?: string | null
          title?: string | null
          description?: string | null
          tags?: string[] | null
          metadata?: Json | null
          created_at?: string
        }
      }
      anamnese_templates: {
        Row: {
          id: string
          professional_id: string
          name: string
          fields: Json
          is_default: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          professional_id: string
          name: string
          fields?: Json
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          professional_id?: string
          name?: string
          fields?: Json
          is_default?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          professional_id: string
          member_id: string | null
          type: string
          title: string
          message: string | null
          data: Json | null
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          professional_id: string
          member_id?: string | null
          type: string
          title: string
          message?: string | null
          data?: Json | null
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          professional_id?: string
          member_id?: string | null
          type?: string
          title?: string
          message?: string | null
          data?: Json | null
          read_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      auth_professional_id: {
        Args: Record<string, never>
        Returns: string | null
      }
      create_default_feed_folders: {
        Args: Record<string, never>
        Returns: void
      }
      create_default_anamnese_template: {
        Args: Record<string, never>
        Returns: void
      }
      update_updated_at_column: {
        Args: Record<string, never>
        Returns: void
      }
    }
    Enums: {
      appointment_status: appointment_status
      payment_status: payment_status
      location_type: location_type
      feed_source: feed_source
      member_role: member_role
      plan_type: plan_type
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Enum types
export type appointment_status =
  | 'scheduled'
  | 'confirmed'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'no_show'

export type payment_status =
  | 'pending'
  | 'partial'
  | 'paid'
  | 'refunded'

export type location_type =
  | 'studio'
  | 'home_visit'
  | 'online'

export type feed_source =
  | 'instagram'
  | 'pinterest'
  | 'manual'

export type member_role =
  | 'owner'
  | 'manager'
  | 'professional'

export type plan_type =
  | 'free'
  | 'starter'
  | 'pro'
  | 'enterprise'

// Convenience table types
export type Professional = Database['public']['Tables']['professionals']['Row']
export type Member = Database['public']['Tables']['members']['Row']
export type Client = Database['public']['Tables']['clients']['Row']
export type Service = Database['public']['Tables']['services']['Row']
export type Appointment = Database['public']['Tables']['appointments']['Row']
export type AppointmentPhoto = Database['public']['Tables']['appointment_photos']['Row']
export type Supply = Database['public']['Tables']['supplies']['Row']
export type Transaction = Database['public']['Tables']['transactions']['Row']
export type FeedFolder = Database['public']['Tables']['feed_folders']['Row']
export type FeedPost = Database['public']['Tables']['feed_posts']['Row']
export type AnamneseTemplate = Database['public']['Tables']['anamnese_templates']['Row']
export type Notification = Database['public']['Tables']['notifications']['Row']

// Insert types
export type InsertProfessional = Database['public']['Tables']['professionals']['Insert']
export type InsertMember = Database['public']['Tables']['members']['Insert']
export type InsertClient = Database['public']['Tables']['clients']['Insert']
export type InsertService = Database['public']['Tables']['services']['Insert']
export type InsertAppointment = Database['public']['Tables']['appointments']['Insert']
export type InsertAppointmentPhoto = Database['public']['Tables']['appointment_photos']['Insert']
export type InsertSupply = Database['public']['Tables']['supplies']['Insert']
export type InsertTransaction = Database['public']['Tables']['transactions']['Insert']
export type InsertFeedFolder = Database['public']['Tables']['feed_folders']['Insert']
export type InsertFeedPost = Database['public']['Tables']['feed_posts']['Insert']
export type InsertAnamneseTemplate = Database['public']['Tables']['anamnese_templates']['Insert']
export type InsertNotification = Database['public']['Tables']['notifications']['Insert']

// Update types
export type UpdateProfessional = Database['public']['Tables']['professionals']['Update']
export type UpdateMember = Database['public']['Tables']['members']['Update']
export type UpdateClient = Database['public']['Tables']['clients']['Update']
export type UpdateService = Database['public']['Tables']['services']['Update']
export type UpdateAppointment = Database['public']['Tables']['appointments']['Update']
export type UpdateAppointmentPhoto = Database['public']['Tables']['appointment_photos']['Update']
export type UpdateSupply = Database['public']['Tables']['supplies']['Update']
export type UpdateFeedFolder = Database['public']['Tables']['feed_folders']['Update']
export type UpdateFeedPost = Database['public']['Tables']['feed_posts']['Update']
export type UpdateAnamneseTemplate = Database['public']['Tables']['anamnese_templates']['Update']
export type UpdateNotification = Database['public']['Tables']['notifications']['Update']
