-- Add restrictive SELECT policy that denies public read access
-- Service role can still access the data for admin purposes
CREATE POLICY "No public read access to cancellation requests"
ON public.cancellation_requests
FOR SELECT
USING (false);

-- Note: The service role bypasses RLS, so admins can still access data
-- through the Supabase dashboard or edge functions using service role key