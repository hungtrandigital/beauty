-- Database initialization script
-- This script runs when PostgreSQL container is first created

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row-Level Security (will be enabled per-table in migrations)
-- This is just a placeholder for future use

-- Create a function to set tenant context (for RLS)
CREATE OR REPLACE FUNCTION set_tenant_context(tenant_id UUID)
RETURNS void AS $$
BEGIN
  PERFORM set_config('app.current_tenant_id', tenant_id::text, false);
END;
$$ LANGUAGE plpgsql;

-- Note: Actual tables and RLS policies are created via TypeORM migrations
-- This init script only sets up extensions and helper functions

