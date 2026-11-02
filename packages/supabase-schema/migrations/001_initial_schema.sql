-- Projeto Mani - Nail Designers SaaS
-- Initial Schema Migration
-- PostgreSQL 16 + Supabase

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUMS
-- ============================================================================

CREATE TYPE appointment_status AS ENUM (
  'scheduled',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
  'no_show'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'partial',
  'paid',
  'refunded'
);

CREATE TYPE location_type AS ENUM (
  'studio',
  'home_visit',
  'online'
);

CREATE TYPE feed_source AS ENUM (
  'instagram',
  'pinterest',
  'manual'
);

CREATE TYPE member_role AS ENUM (
  'owner',
  'manager',
  'professional'
);

CREATE TYPE plan_type AS ENUM (
  'free',
  'starter',
  'pro',
  'enterprise'
);

-- ============================================================================
-- CORE TABLES
-- ============================================================================

-- Professionals (tenants) - nail designers/ studios
CREATE TABLE professionals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  business_name VARCHAR(255),
  location_type location_type DEFAULT 'studio',
  address JSONB,
  settings JSONB DEFAULT '{}',
  plan_type plan_type DEFAULT 'free',
  plan_expires_at TIMESTAMPTZ,
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

-- Team members (multi-tenant support)
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  email VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role member_role NOT NULL DEFAULT 'professional',
  phone VARCHAR(50),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  invited_at TIMESTAMPTZ,
  invited_by UUID REFERENCES members(id),
  joined_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(professional_id, email)
);

-- Clients (customers of nail designers)
CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  birth_date DATE,
  notes TEXT,
  tags TEXT[],
  is_vip BOOLEAN DEFAULT false,
  total_visits INTEGER DEFAULT 0,
  total_spent DECIMAL(10,2) DEFAULT 0,
  last_visit_at TIMESTAMPTZ,
  anamnese JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services offered
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  member_id UUID REFERENCES members(id) ON DELETE SET NULL,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  status appointment_status DEFAULT 'scheduled',
  location_type location_type DEFAULT 'studio',
  address JSONB,
  scheduled_start TIMESTAMPTZ NOT NULL,
  scheduled_end TIMESTAMPTZ NOT NULL,
  actual_start TIMESTAMPTZ,
  actual_end TIMESTAMPTZ,
  notes TEXT,
  price DECIMAL(10,2),
  payment_status payment_status DEFAULT 'pending',
  payment_method VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointment photos (before/after)
CREATE TABLE appointment_photos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('before', 'after')),
  url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Supplies/Products inventory
CREATE TABLE supplies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(255),
  category VARCHAR(100),
  quantity DECIMAL(10,2) DEFAULT 0,
  unit VARCHAR(20) DEFAULT 'unit',
  min_quantity DECIMAL(10,2) DEFAULT 0,
  cost DECIMAL(10,2),
  supplier VARCHAR(255),
  purchase_date DATE,
  expiry_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financial transactions
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  category VARCHAR(100),
  description TEXT,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50),
  transaction_date DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feed folders (organization for saved content)
CREATE TABLE feed_folders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  icon VARCHAR(50),
  color VARCHAR(20),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Feed posts (inspiration from Instagram/Pinterest)
CREATE TABLE feed_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  folder_id UUID REFERENCES feed_folders(id) ON DELETE SET NULL,
  source feed_source NOT NULL,
  external_id VARCHAR(255),
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  title TEXT,
  description TEXT,
  tags TEXT[],
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Anamnese templates
CREATE TABLE anamnese_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  fields JSONB NOT NULL DEFAULT '[]',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  professional_id UUID NOT NULL REFERENCES professionals(id) ON DELETE CASCADE,
  member_id UUID REFERENCES members(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  data JSONB,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_members_professional_id ON members(professional_id);
CREATE INDEX idx_members_email ON members(email);
CREATE INDEX idx_clients_professional_id ON clients(professional_id);
CREATE INDEX idx_clients_phone ON clients(phone);
CREATE INDEX idx_services_professional_id ON services(professional_id);
CREATE INDEX idx_appointments_professional_id ON appointments(professional_id);
CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_scheduled_start ON appointments(scheduled_start);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointment_photos_appointment_id ON appointment_photos(appointment_id);
CREATE INDEX idx_supplies_professional_id ON supplies(professional_id);
CREATE INDEX idx_transactions_professional_id ON transactions(professional_id);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);
CREATE INDEX idx_feed_folders_professional_id ON feed_folders(professional_id);
CREATE INDEX idx_feed_posts_professional_id ON feed_posts(professional_id);
CREATE INDEX idx_feed_posts_folder_id ON feed_posts(folder_id);
CREATE INDEX idx_anamnese_templates_professional_id ON anamnese_templates(professional_id);
CREATE INDEX idx_notifications_professional_id ON notifications(professional_id);

-- ============================================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_professionals_updated_at BEFORE UPDATE ON professionals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_supplies_updated_at BEFORE UPDATE ON supplies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_anamnese_templates_updated_at BEFORE UPDATE ON anamnese_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- RLS (Row Level Security) POLICIES
-- ============================================================================

-- Enable RLS on all tenant-scoped tables
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE supplies ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_folders ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE anamnese_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to get current professional_id from JWT claims
CREATE OR REPLACE FUNCTION auth.professional_id() RETURNS UUID AS $$
  SELECT COALESCE(
    current_setting('request.jwt.claims', true)::jsonb->>'professional_id',
    NULL
  )::UUID;
$$ LANGUAGE SQL STABLE;

-- Professionals: can only see their own record
CREATE POLICY "professionals_isolation" ON professionals
  FOR ALL USING (id = auth.professional_id());

-- Members: can only see members of same professional
CREATE POLICY "members_select" ON members
  FOR SELECT USING (professional_id = auth.professional_id());

CREATE POLICY "members_insert" ON members
  FOR INSERT WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "members_update" ON members
  FOR UPDATE USING (professional_id = auth.professional_id())
  WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "members_delete" ON members
  FOR DELETE USING (professional_id = auth.professional_id());

-- Clients: professional_id isolation
CREATE POLICY "clients_select" ON clients
  FOR SELECT USING (professional_id = auth.professional_id());

CREATE POLICY "clients_insert" ON clients
  FOR INSERT WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "clients_update" ON clients
  FOR UPDATE USING (professional_id = auth.professional_id())
  WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "clients_delete" ON clients
  FOR DELETE USING (professional_id = auth.professional_id());

-- Services: professional_id isolation
CREATE POLICY "services_select" ON services
  FOR SELECT USING (professional_id = auth.professional_id());

CREATE POLICY "services_insert" ON services
  FOR INSERT WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "services_update" ON services
  FOR UPDATE USING (professional_id = auth.professional_id())
  WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "services_delete" ON services
  FOR DELETE USING (professional_id = auth.professional_id());

-- Appointments: professional_id isolation
CREATE POLICY "appointments_select" ON appointments
  FOR SELECT USING (professional_id = auth.professional_id());

CREATE POLICY "appointments_insert" ON appointments
  FOR INSERT WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "appointments_update" ON appointments
  FOR UPDATE USING (professional_id = auth.professional_id())
  WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "appointments_delete" ON appointments
  FOR DELETE USING (professional_id = auth.professional_id());

-- Appointment photos: via appointment relationship
CREATE POLICY "appointment_photos_select" ON appointment_photos
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM appointments
      WHERE appointments.id = appointment_photos.appointment_id
      AND appointments.professional_id = auth.professional_id()
    )
  );

CREATE POLICY "appointment_photos_insert" ON appointment_photos
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM appointments
      WHERE appointments.id = appointment_photos.appointment_id
      AND appointments.professional_id = auth.professional_id()
    )
  );

CREATE POLICY "appointment_photos_delete" ON appointment_photos
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM appointments
      WHERE appointments.id = appointment_photos.appointment_id
      AND appointments.professional_id = auth.professional_id()
    )
  );

-- Supplies: professional_id isolation
CREATE POLICY "supplies_select" ON supplies
  FOR SELECT USING (professional_id = auth.professional_id());

CREATE POLICY "supplies_insert" ON supplies
  FOR INSERT WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "supplies_update" ON supplies
  FOR UPDATE USING (professional_id = auth.professional_id())
  WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "supplies_delete" ON supplies
  FOR DELETE USING (professional_id = auth.professional_id());

-- Transactions: professional_id isolation
CREATE POLICY "transactions_select" ON transactions
  FOR SELECT USING (professional_id = auth.professional_id());

CREATE POLICY "transactions_insert" ON transactions
  FOR INSERT WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "transactions_delete" ON transactions
  FOR DELETE USING (professional_id = auth.professional_id());

-- Feed folders: professional_id isolation
CREATE POLICY "feed_folders_select" ON feed_folders
  FOR SELECT USING (professional_id = auth.professional_id());

CREATE POLICY "feed_folders_insert" ON feed_folders
  FOR INSERT WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "feed_folders_update" ON feed_folders
  FOR UPDATE USING (professional_id = auth.professional_id())
  WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "feed_folders_delete" ON feed_folders
  FOR DELETE USING (professional_id = auth.professional_id());

-- Feed posts: professional_id isolation
CREATE POLICY "feed_posts_select" ON feed_posts
  FOR SELECT USING (professional_id = auth.professional_id());

CREATE POLICY "feed_posts_insert" ON feed_posts
  FOR INSERT WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "feed_posts_update" ON feed_posts
  FOR UPDATE USING (professional_id = auth.professional_id())
  WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "feed_posts_delete" ON feed_posts
  FOR DELETE USING (professional_id = auth.professional_id());

-- Anamnese templates: professional_id isolation
CREATE POLICY "anamnese_templates_select" ON anamnese_templates
  FOR SELECT USING (professional_id = auth.professional_id());

CREATE POLICY "anamnese_templates_insert" ON anamnese_templates
  FOR INSERT WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "anamnese_templates_update" ON anamnese_templates
  FOR UPDATE USING (professional_id = auth.professional_id())
  WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "anamnese_templates_delete" ON anamnese_templates
  FOR DELETE USING (professional_id = auth.professional_id());

-- Notifications: professional_id isolation
CREATE POLICY "notifications_select" ON notifications
  FOR SELECT USING (professional_id = auth.professional_id());

CREATE POLICY "notifications_update" ON notifications
  FOR UPDATE USING (professional_id = auth.professional_id())
  WITH CHECK (professional_id = auth.professional_id());

CREATE POLICY "notifications_delete" ON notifications
  FOR DELETE USING (professional_id = auth.professional_id());
