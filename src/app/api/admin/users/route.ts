import { createServerClient } from '@supabase/ssr'
import { createAdminClient } from '@/lib/supabase/admin'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies()

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll()
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                )
              } catch {
                // The `setAll` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
              }
            },
          },
        }
      )

    // 1. Check if current user is admin
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { role } = user.user_metadata || {}
    const ALLOWED_ADMIN_ROLES = ['super_admin'] // Only super_admin can view all users? Or all admins?
    // Let's allow all admins to view, but maybe only super_admin to edit.
    // For now, restrict list to super_admin usually, or admin_web etc.
    // Let's stick to the list from middleware.
    const IS_ADMIN = ['super_admin', 'admin_web', 'admin_design', 'admin_mkt', 'admin_fivem'].includes(role)

    if (!IS_ADMIN) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // 2. Use Admin Client to list users
    try {
        const adminClient = createAdminClient()
        const { data: { users }, error: listError } = await adminClient.auth.admin.listUsers()

        if (listError) {
            return NextResponse.json({ error: listError.message }, { status: 500 })
        }

        return NextResponse.json({ users })
    } catch (e: any) {
        // Likely Service Key missing
        return NextResponse.json({ error: 'Configuration Error: Missing Service Role Key' }, { status: 500 })
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
    // Endpoint to update user role
    try {
        const cookieStore = await cookies()
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
              cookies: {
                getAll() {
                  return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    // ignore
                },
              },
            }
          )

        // 1. Check if current user is SUPER ADMIN
        const { data: { user } } = await supabase.auth.getUser()
        const currentUserRole = user?.user_metadata?.role

        if (currentUserRole !== 'super_admin') {
             return NextResponse.json({ error: 'Forbidden: Only Super Admin can change roles' }, { status: 403 })
        }

        const body = await request.json()
        const { userId, role } = body

        if (!userId || !role) {
            return NextResponse.json({ error: 'Missing userId or role' }, { status: 400 })
        }

        // 2. Update via Admin Client
        const adminClient = createAdminClient()
        const { data, error } = await adminClient.auth.admin.updateUserById(
            userId,
            { user_metadata: { role: role } }
        )

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ data })

    } catch (error: any) {
         return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
