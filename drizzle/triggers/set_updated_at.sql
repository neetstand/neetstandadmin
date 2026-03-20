-- ==============================================================================
-- Trigger: set_updated_at
-- Purpose: Attaches the handle_updated_at function to all tables with an updated_at column
-- ==============================================================================

-- chapters
DROP TRIGGER IF EXISTS trg_chapters_updated_at ON public.chapters;
DROP TRIGGER IF EXISTS set_chapters_updated_at ON public.chapters;
CREATE TRIGGER set_chapters_updated_at
BEFORE UPDATE ON public.chapters
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- sub_chapters
DROP TRIGGER IF EXISTS trg_sub_chapters_updated_at ON public.sub_chapters;
DROP TRIGGER IF EXISTS set_sub_chapters_updated_at ON public.sub_chapters;
CREATE TRIGGER set_sub_chapters_updated_at
BEFORE UPDATE ON public.sub_chapters
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- plans
DROP TRIGGER IF EXISTS trg_plans_updated_at ON public.plans;
DROP TRIGGER IF EXISTS set_plans_updated_at ON public.plans;
CREATE TRIGGER set_plans_updated_at
BEFORE UPDATE ON public.plans
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- profiles
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- roles
DROP TRIGGER IF EXISTS trg_roles_updated_at ON public.roles;
DROP TRIGGER IF EXISTS set_roles_updated_at ON public.roles;
CREATE TRIGGER set_roles_updated_at
BEFORE UPDATE ON public.roles
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- sprint_plans
DROP TRIGGER IF EXISTS trg_sprint_plans_updated_at ON public.sprint_plans;
DROP TRIGGER IF EXISTS set_sprint_plans_updated_at ON public.sprint_plans;
CREATE TRIGGER set_sprint_plans_updated_at
BEFORE UPDATE ON public.sprint_plans
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- sprint_plan_days
DROP TRIGGER IF EXISTS trg_sprint_plan_days_updated_at ON public.sprint_plan_days;
DROP TRIGGER IF EXISTS set_sprint_plan_days_updated_at ON public.sprint_plan_days;
CREATE TRIGGER set_sprint_plan_days_updated_at
BEFORE UPDATE ON public.sprint_plan_days
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- sprint_plan_bonuses
DROP TRIGGER IF EXISTS trg_sprint_plan_bonuses_updated_at ON public.sprint_plan_bonuses;
DROP TRIGGER IF EXISTS set_sprint_plan_bonuses_updated_at ON public.sprint_plan_bonuses;
CREATE TRIGGER set_sprint_plan_bonuses_updated_at
BEFORE UPDATE ON public.sprint_plan_bonuses
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- departments
DROP TRIGGER IF EXISTS trg_departments_updated_at ON public.departments;
DROP TRIGGER IF EXISTS set_departments_updated_at ON public.departments;
CREATE TRIGGER set_departments_updated_at
BEFORE UPDATE ON public.departments
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- settings
DROP TRIGGER IF EXISTS trg_settings_updated_at ON public.settings;
DROP TRIGGER IF EXISTS set_settings_updated_at ON public.settings;
CREATE TRIGGER set_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- questions
DROP TRIGGER IF EXISTS trg_questions_updated_at ON public.questions;
DROP TRIGGER IF EXISTS set_questions_updated_at ON public.questions;
CREATE TRIGGER set_questions_updated_at
BEFORE UPDATE ON public.questions
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
