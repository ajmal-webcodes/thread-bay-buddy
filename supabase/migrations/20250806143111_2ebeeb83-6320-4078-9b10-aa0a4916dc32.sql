-- Add address and contact fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN pincode TEXT,
ADD COLUMN home_phone TEXT,
ADD COLUMN work_phone TEXT,
ADD COLUMN address_line1 TEXT,
ADD COLUMN address_line2 TEXT,
ADD COLUMN city TEXT,
ADD COLUMN state TEXT,
ADD COLUMN country TEXT DEFAULT 'India';