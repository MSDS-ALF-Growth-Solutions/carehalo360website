ALTER TABLE public.waitlist_signups
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS role text,
  ADD COLUMN IF NOT EXISTS caring_for text,
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS notes text;

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS role text,
  ADD COLUMN IF NOT EXISTS caring_for text,
  ADD COLUMN IF NOT EXISTS location text,
  ADD COLUMN IF NOT EXISTS notes text;