-- Create cancellation_requests table
CREATE TABLE public.cancellation_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  reason TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.cancellation_requests ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (customers can submit requests)
CREATE POLICY "Anyone can submit cancellation requests"
ON public.cancellation_requests
FOR INSERT
WITH CHECK (true);

-- No public read/update/delete access (only service role can manage)
-- You'll access this via Supabase dashboard or backend functions