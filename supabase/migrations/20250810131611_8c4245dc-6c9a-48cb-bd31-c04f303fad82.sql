-- Grant admin role to the specified email if not already granted
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::app_role
FROM auth.users u
LEFT JOIN public.user_roles r ON r.user_id = u.id AND r.role = 'admin'::app_role
WHERE u.email = 'ajmalrasheed382@gmail.com'
  AND r.id IS NULL;