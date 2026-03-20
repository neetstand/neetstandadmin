-- ==============================================================================
-- Function: handle_updated_at
-- Purpose: Automatically updates the updated_at column to the current timestamp
-- ==============================================================================

DROP FUNCTION IF EXISTS public.handle_updated_at() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
