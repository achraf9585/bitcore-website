"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, Mail, MapPin, Phone } from "lucide-react"
import { useTranslations } from "next-intl"

export function ContactUs() {
  const t = useTranslations('Contact')

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
        {/* Background Gradients */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-20 left-20 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground text-lg">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="p-6 rounded-2xl bg-background/20 border border-border/50 hover:bg-background/30 transition-colors">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-primary/10 rounded-full text-primary">
                        <Mail size={24} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">{t('emailTitle')}</h4>
                        <p className="text-muted-foreground">contact@bitcore.solution</p>
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-background/20 border border-border/50 hover:bg-background/30 transition-colors">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-purple-500/10 rounded-full text-purple-500">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">{t('callTitle')}</h4>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-background/20 border border-border/50 hover:bg-background/30 transition-colors">
                <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-blue-500/10 rounded-full text-blue-500">
                        <MapPin size={24} />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">{t('locationTitle')}</h4>
                        <p className="text-muted-foreground">Digital First • Worldwide</p>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-background/20 backdrop-blur-md border border-border/50 rounded-2xl p-8"
          >
            <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">{t('firstName')}</Label>
                        <Input id="firstName" placeholder="John" className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">{t('lastName')}</Label>
                        <Input id="lastName" placeholder="Doe" className="bg-background/50" />
                    </div>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="bg-background/50" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">{t('message')}</Label>
                    <Textarea 
                        id="message" 
                        placeholder={t('message')} 
                        className="bg-background/50 min-h-[120px]" 
                    />
                </div>

                <Button type="submit" size="lg" className="w-full text-lg">
                    {t('send')} <Send className="ml-2 h-4 w-4 rtl:rotate-180" />
                </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
