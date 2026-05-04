CREATE TABLE public.waitlist_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
ON public.waitlist_signups
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "No public read access to waitlist"
ON public.waitlist_signups
FOR SELECT
TO public
USING (false);

CREATE INDEX idx_waitlist_email ON public.waitlist_signups(email);