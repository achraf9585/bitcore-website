"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User as UserIcon, Lock, Mail, Phone, Edit, Check } from "lucide-react"
import { motion } from "framer-motion"
import { PhoneInputWithFlag } from "@/components/ui/phone-input-with-flag"

export default function SettingsPage() {
  const t = useTranslations('Settings')
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("account")
  
  // Profile form state
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileMessage, setProfileMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  
  // Password form state
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState<{type: 'success' | 'error', text: string} | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)
  
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push('/login')
        return
      }
      setUser(user)
      setFullName(user.user_metadata.full_name || "")
      setPhoneNumber(user.user_metadata.phone_number || "")
      setLoading(false)
    }
    getUser()
  }, [router, supabase])

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileMessage(null)
    setIsUpdating(true)

    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: fullName,
        phone_number: phoneNumber
      }
    })

    setIsUpdating(false)
    if (error) {
      setProfileMessage({ type: 'error', text: error.message })
    } else {
      setProfileMessage({ type: 'success', text: t('profileUpdated') })
      setIsEditingProfile(false)
      // Refresh user data to ensure UI is in sync
      const { data: { user: updatedUser } } = await supabase.auth.getUser()
      if (updatedUser) setUser(updatedUser)
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: t('passwordsDoNotMatch') })
      return
    }

    if (newPassword.length < 6) {
        setMessage({ type: 'error', text: "Password must be at least 6 characters" })
        return
    }

    setIsUpdating(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    setIsUpdating(false)

    if (error) {
      setMessage({ type: 'error', text: error.message })
    } else {
      setMessage({ type: 'success', text: t('passwordUpdated') })
      setNewPassword("")
      setConfirmPassword("")
    }
  }

  if (loading) return (
    <div className="min-h-screen pt-24 flex justify-center items-center">
        <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
    </div>
  )

  const tabs = [
    { id: "account", label: t('account'), icon: UserIcon },
    { id: "security", label: t('security'), icon: Lock },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{t('title')}</h1>
        <p className="text-white/60">Manage your account settings and security preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <nav className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/20"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "account" && (
              <Card className="bg-[#0f0518]/50 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                     <div>
                        <CardTitle className="text-white">{t('profile')}</CardTitle>
                        <CardDescription className="text-white/60">View and update your account information.</CardDescription>
                     </div>
                     <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        className="border-white/10 text-white hover:bg-white/5 hover:text-white bg-transparent"
                     >
                        {isEditingProfile ? <Check size={16} className="mr-2" /> : <Edit size={16} className="mr-2" />}
                        {isEditingProfile ? "Done" : "Edit"}
                     </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24 border-2 border-white/10 shadow-xl">
                       <AvatarImage src={user?.user_metadata.avatar_url} />
                       <AvatarFallback className="bg-primary/20 text-primary text-3xl font-bold">
                          {user?.email?.charAt(0).toUpperCase()}
                       </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-white max-w-sm truncate">{user?.user_metadata.full_name || 'User'}</h3>
                        <p className="text-white/60 flex items-center gap-2">
                           <Mail size={16} /> {user?.email}
                        </p>
                    </div>
                  </div>
                  
                  <Separator className="bg-white/10" />
                  
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                      <div className="grid gap-6 sm:grid-cols-2">
                          <div className="space-y-2">
                              <Label className="text-white/80">{t('fullName')}</Label>
                              {isEditingProfile ? (
                                  <Input 
                                    value={fullName} 
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="bg-white/5 border-white/10 text-white focus-visible:ring-primary"
                                  />
                              ) : (
                                  <div className="px-3 py-2.5 rounded-md bg-white/5 border border-white/10 text-white/80 font-medium text-sm min-h-[42px] content-center">
                                      {fullName || "-"}
                                  </div>
                              )}
                          </div>
                           <div className="space-y-2">
                              <Label className="text-white/80">{t('phone')}</Label>
                              {isEditingProfile ? (
                                  <PhoneInputWithFlag 
                                    value={phoneNumber} 
                                    onChange={setPhoneNumber}
                                    placeholder={t('phone')}
                                    className="text-white"
                                  />
                              ) : (
                                  <div className="px-3 py-2.5 rounded-md bg-white/5 border border-white/10 text-white/80 font-medium text-sm min-h-[42px] content-center">
                                      {phoneNumber || "-"}
                                  </div>
                              )}
                          </div>
                          <div className="space-y-2">
                              <Label className="text-white/80">{t('email')}</Label>
                              <div className="px-3 py-2.5 rounded-md bg-white/5 border border-white/10 text-white/50 font-medium text-sm min-h-[42px] content-center cursor-not-allowed">
                                  {user?.email}
                              </div>
                          </div>
                           <div className="space-y-2">
                              <Label className="text-white/80">{t('memberSince')}</Label>
                              <div className="px-3 py-2.5 rounded-md bg-white/5 border border-white/10 text-white/50 font-medium text-sm min-h-[42px] content-center cursor-not-allowed">
                                   {user?.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}
                              </div>
                          </div>
                      </div>

                      {profileMessage && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3 rounded-md text-sm ${profileMessage.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                        >
                            {profileMessage.text}
                        </motion.div>
                      )}

                      {isEditingProfile && (
                           <div className="flex justify-end">
                                <Button type="submit" disabled={isUpdating} className="bg-primary text-secondary hover:bg-primary/90 font-bold">
                                    {isUpdating ? "Saving..." : t('saveChanges')}
                                </Button>
                           </div>
                      )}
                  </form>
                </CardContent>
              </Card>
            )}

            {activeTab === "security" && (
              <Card className="bg-[#0f0518]/50 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">{t('changePassword')}</CardTitle>
                  <CardDescription className="text-white/60">Update your password to keep your account secure.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdatePassword} className="space-y-4 max-w-md">
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-white/80">{t('newPassword')}</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary h-11"
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-white/80">{t('confirmPassword')}</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                         className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-primary h-11"
                        placeholder="••••••••"
                      />
                    </div>
                    
                    {message && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }} 
                          animate={{ opacity: 1, y: 0 }}
                          className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}
                        >
                            {message.text}
                        </motion.div>
                    )}

                    <Button type="submit" disabled={isUpdating} className="w-full bg-primary text-secondary hover:bg-primary/90 font-bold h-11">
                      {isUpdating ? "Updating..." : t('updatePassword')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
