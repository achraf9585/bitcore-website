"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge" // Assuming Shadcn badge exists or I'll use simple span
// I'll use simple span to be safe
import { Loader2, AlertCircle } from "lucide-react"

interface User {
  id: string
  email: string
  user_metadata: {
    full_name?: string
    avatar_url?: string
    role?: string
  }
  created_at: string
}

const ROLES = ['user', 'super_admin', 'admin_web', 'admin_design', 'admin_mkt', 'admin_fivem']

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/users')
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch users')
      }

      setUsers(data.users || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
      try {
        setUpdating(userId)
        const res = await fetch('/api/admin/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, role: newRole })
        })
        const data = await res.json()
        
        if (!res.ok) {
            alert(data.error)
            return
        }

        // Update local state
        setUsers(users.map(u => u.id === userId ? { ...u, user_metadata: { ...u.user_metadata, role: newRole } } : u))

      } catch (err: any) {
        alert(err.message)
      } finally {
        setUpdating(null)
      }
  }

  if (loading) {
    return <div className="flex h-96 items-center justify-center text-white"><Loader2 className="animate-spin h-8 w-8 text-primary" /></div>
  }

  if (error) {
    return (
        <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-6 text-red-500">
            <div className="flex items-center gap-2 mb-2 font-bold">
                <AlertCircle className="h-5 w-5" />
                Error Loading Users
            </div>
            <p>{error}</p>
            {error.includes('Missing Service Role Key') && (
                <p className="mt-4 text-sm text-red-400">
                    To manage users, you must add <code>SUPABASE_SERVICE_ROLE_KEY</code> to your <code>.env</code> file.
                </p>
            )}
        </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Users Management</h1>
        <span className="text-sm text-white/40">{users.length} Users</span>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/60">
                <thead className="bg-white/5 text-white">
                    <tr>
                        <th className="px-6 py-4 font-medium">User</th>
                        <th className="px-6 py-4 font-medium">Role</th>
                        <th className="px-6 py-4 font-medium">Created At</th>
                        <th className="px-6 py-4 font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8 border border-white/10">
                                        <AvatarImage src={user.user_metadata.avatar_url} />
                                        <AvatarFallback className="bg-primary/20 text-primary text-xs">
                                            {user.email?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-white">{user.user_metadata.full_name || 'No Name'}</span>
                                        <span className="text-xs">{user.email}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                                    user.user_metadata.role === 'super_admin' ? 'bg-purple-400/10 text-purple-400 ring-purple-400/20' : 
                                    user.user_metadata.role?.includes('admin') ? 'bg-blue-400/10 text-blue-400 ring-blue-400/20' :
                                    'bg-white/10 text-white/60 ring-white/20'
                                }`}>
                                    {user.user_metadata.role || 'user'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                {new Date(user.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                                <select 
                                    className="bg-[#0f0518] border border-white/10 rounded-md text-xs py-1 px-2 text-white focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={user.user_metadata.role || 'user'}
                                    disabled={updating === user.id}
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                >
                                    {ROLES.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                                {updating === user.id && <Loader2 className="inline ml-2 h-3 w-3 animate-spin" />}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}
