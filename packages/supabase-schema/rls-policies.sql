-- Projeto Mani - RLS Policies Documentation
-- Extracted from 001_initial_schema.sql
-- 
-- Row Level Security ensures tenant isolation.
-- All queries are scoped to professional_id from JWT claims.

-- ============================================================================
-- RLS HELPER FUNCTION
-- ============================================================================

-- auth.professional_id()
-- Extracts professional_id from JWT claims set by Supabase Auth
-- Returns: UUID or NULL
--
-- Usage: All policies use this to filter rows by tenant
-- JWT must include: { "professional_id": "<uuid>" }

-- ============================================================================
-- POLICIES BY TABLE
-- ============================================================================

-- professionals
-- Policy: professionals_isolation
-- Scope: ALL operations
-- Rule: User can only access their own professional record
-- Notes: professional_id IS the primary key

-- members
-- Policies: members_select, members_insert, members_update, members_delete
-- Scope: CRUD operations
-- Rule: All members visible/managed within same professional_id
-- Notes: Multi-tenant team management

-- clients
-- Policies: clients_select, clients_insert, clients_update, clients_delete
-- Scope: CRUD operations
-- Rule: professional_id isolation
-- Notes: Client data belongs to professional, not member

-- services
-- Policies: services_select, services_insert, services_update, services_delete
-- Scope: CRUD operations
-- Rule: professional_id isolation
-- Notes: Service catalog per tenant

-- appointments
-- Policies: appointments_select, appointments_insert, appointments_update, appointments_delete
-- Scope: CRUD operations
-- Rule: professional_id isolation
-- Notes: Core scheduling table

-- appointment_photos
-- Policies: appointment_photos_select, appointment_photos_insert, appointment_photos_delete
-- Scope: Read, Create, Delete (no update)
-- Rule: Via appointment relationship - checks appointment.professional_id
-- Notes: Indirect isolation through parent record

-- supplies
-- Policies: supplies_select, supplies_insert, supplies_update, supplies_delete
-- Scope: CRUD operations
-- Rule: professional_id isolation
-- Notes: Inventory management per tenant

-- transactions
-- Policies: transactions_select, transactions_insert, transactions_delete
-- Scope: Read, Create, Delete (no update - immutable)
-- Rule: professional_id isolation
-- Notes: Financial records, updates blocked for audit

-- feed_folders
-- Policies: feed_folders_select, feed_folders_insert, feed_folders_update, feed_folders_delete
-- Scope: CRUD operations
-- Rule: professional_id isolation
-- Notes: Organization for saved inspiration content

-- feed_posts
-- Policies: feed_posts_select, feed_posts_insert, feed_posts_update, feed_posts_delete
-- Scope: CRUD operations
-- Rule: professional_id isolation
-- Notes: Saved Instagram/Pinterest content

-- anamnese_templates
-- Policies: anamnese_templates_select, anamnese_templates_insert, anamnese_templates_update, anamnese_templates_delete
-- Scope: CRUD operations
-- Rule: professional_id isolation
-- Notes: Custom client intake forms

-- notifications
-- Policies: notifications_select, notifications_update, notifications_delete
-- Scope: Read, Update (mark read), Delete
-- Rule: professional_id isolation
-- Notes: No insert policy - created by triggers/system

-- ============================================================================
-- JWT CLAIMS REQUIREMENTS
-- ============================================================================

-- Supabase Auth must include professional_id in JWT claims
-- Example JWT payload:
-- {
--   "sub": "user-uuid",
--   "email": "user@example.com",
--   "professional_id": "professional-uuid",
--   "role": "authenticated"
-- }
--
-- Configure in Supabase Dashboard:
-- Authentication > Providers > JWT Claims
-- Add custom claim: professional_id

-- ============================================================================
-- BYPASS POLICIES (Service Role)
-- ============================================================================

-- Service role (backend, webhooks) bypasses RLS
-- Use SUPABASE_SERVICE_ROLE_KEY for:
-- - Stripe webhooks
-- - Background jobs
-- - Admin operations
--
-- NEVER expose service role key to client

-- ============================================================================
-- TESTING RLS
-- ============================================================================

-- Test with SET LOCAL to simulate JWT:
-- BEGIN;
-- SET LOCAL request.jwt.claims = '{"professional_id": "<uuid>"}';
-- SELECT * FROM clients; -- Should only return rows for that professional
-- ROLLBACK;

-- ============================================================================
-- SECURITY NOTES
-- ============================================================================

-- 1. All tenant-scoped tables have RLS enabled
-- 2. Policies use auth.professional_id() for isolation
-- 3. Indirect relationships (appointment_photos) check parent table
-- 4. No INSERT policy on notifications (system-managed)
-- 5. No UPDATE policy on transactions (audit integrity)
-- 6. Service role bypasses RLS for backend operations
