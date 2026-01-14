"use client"

import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Twitter, User } from "lucide-react"

export function Team() {
  const t = useTranslations('Team')

  const team = [
    {
      name: t('member1'),
      role: t('role1'),
      image: "/team/member1.jpg", 
      socials: { twitter: "#", github: "#", linkedin: "#" }
    },
    {
        name: t('member2'),
        role: t('role2'),
        image: "/team/member2.jpg",
        socials: { twitter: "#", linkedin: "#", dribbble: "#" }
    },
    {
        name: t('member3'),
        role: t('role3'),
        image: "/team/member3.jpg",
        socials: { github: "#", linkedin: "#" }
    },
    {
        name: t('member4'),
        role: t('role4'),
        image: "/team/member4.jpg",
        socials: { linkedin: "#", twitter: "#" }
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-24 flex justify-center relative overflow-hidden" id="team">
      {/* Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-500/30 blur-[100px] rounded-full animate-pulse" />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60"
          >
            {t('title')}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {team.map((member, index) => (
            <motion.div key={index} variants={item}>
                <Card className="bg-[#0f0518]/40 border-white/5 backdrop-blur-sm group hover:border-primary/20 transition-all duration-300 hover:-translate-y-2 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardHeader className="text-center pt-8 pb-4 relative z-10">
                        <div className="relative mx-auto w-24 h-24 mb-4">
                            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors duration-300" />
                            <Avatar className="w-24 h-24 border-2 border-white/10 group-hover:border-primary/50 transition-colors relative z-10">
                                <AvatarImage src={member.image} />
                                <AvatarFallback className="bg-[#1a1025] text-2xl font-bold text-white/80">
                                    {member.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                        <p className="text-sm text-white/50 font-medium tracking-wide uppercase">{member.role}</p>
                    </CardHeader>
                    
                    <CardContent className="flex justify-center gap-4 pb-8 relative z-10">
                        {member.socials.twitter && (
                            <a href={member.socials.twitter} className="text-white/40 hover:text-white transition-colors">
                                <Twitter size={18} />
                            </a>
                        )}
                        {member.socials.github && (
                             <a href={member.socials.github} className="text-white/40 hover:text-white transition-colors">
                                <Github size={18} />
                            </a>
                        )}
                        {member.socials.linkedin && (
                             <a href={member.socials.linkedin} className="text-white/40 hover:text-white transition-colors">
                                <Linkedin size={18} />
                            </a>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
