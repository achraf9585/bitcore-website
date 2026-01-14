import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
const handleI18nRouting = createMiddleware(routing);

import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

// Define allowed roles for dashboard
const ALLOWED_ADMIN_ROLES = ['super_admin', 'admin_web', 'admin_design', 'admin_mkt', 'admin_fivem'];

export default async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Check if accessing dashboard
  // Support both /dashboard and /en/dashboard etc.
  const path = request.nextUrl.pathname;
  const isDashboard = path.includes('/dashboard');
  const isDashboardLogin = path.includes('/dashboard/login');

  if (isDashboard && !isDashboardLogin) {
    if (!user) {
      // Redirect to dashboard login if not logged in
      // We need to preserve the locale
      const locale = request.nextUrl.pathname.split('/')[1] || 'en';
      const loginUrl = new URL(`/${locale}/dashboard/login`, request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Role Check
    const userRole = user.user_metadata?.role;
    if (!userRole || !ALLOWED_ADMIN_ROLES.includes(userRole)) {
       // Redirect to home if unauthorized
       const locale = request.nextUrl.pathname.split('/')[1] || 'en';
       return NextResponse.redirect(new URL(`/${locale}/`, request.url));
    }
  }

  return response;
}
 
export const config = {
  // Match only internationalized pathnames + dashboard
  matcher: ['/', '/(ar|en)/:path*', '/dashboard/:path*']
};
