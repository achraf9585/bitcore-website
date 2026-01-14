"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "@/i18n/routing"
import { useState } from "react"

export default function DashboardLoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        
        const supabase = createClient()
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (signInError) {
            setError(signInError.message)
            setLoading(false)
            return
        }

        // Check role after login
        const { data: { user } } = await supabase.auth.getUser()
        const userRole = user?.user_metadata?.role
        const ALLOWED_ADMIN_ROLES = ['super_admin', 'admin_web', 'admin_design', 'admin_mkt', 'admin_fivem']

        if (userRole && ALLOWED_ADMIN_ROLES.includes(userRole)) {
            router.push("/dashboard")
        } else {
            await supabase.auth.signOut()
            setError("Access Restricted: You do not have admin permissions.")
        }
        setLoading(false)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0f0518] px-4">
            <div className="w-full max-w-md space-y-8 rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Admin Login</h2>
                    <p className="mt-2 text-sm text-white/60">
                        Sign in to access the dashboard
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {error && (
                        <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input 
                                id="email-address" 
                                name="email" 
                                type="email" 
                                required 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="relative block w-full rounded-lg border-0 bg-white/5 py-3 text-white ring-1 ring-inset ring-white/10 placeholder:text-white/40 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4" 
                                placeholder="Email address" 
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                required 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="relative block w-full rounded-lg border-0 bg-white/5 py-3 text-white ring-1 ring-inset ring-white/10 placeholder:text-white/40 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 pl-4" 
                                placeholder="Password" 
                            />
                        </div>
                    </div>

                    <div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="group relative flex w-full justify-center rounded-lg bg-primary px-3 py-3 text-sm font-semibold text-white hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all disabled:opacity-50"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
