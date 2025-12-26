"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gamepad2, Globe, Palette } from "lucide-react"
import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"

export function Services() {
  const t = useTranslations('Services')

  const services = [
    {
      id: "fivem",
      title: t('fivemTitle'),
      description: t('fivemDesc'),
      icon: Gamepad2,
      color: "text-[#4cb8a9]",
      gradient: "from-[#4cb8a9]/20 to-[#7a81cf]/5"
    },
    {
      id: "web",
      title: t('webTitle'),
      description: t('webDesc'),
      icon: Globe,
      color: "text-[#7a81cf]",
      gradient: "from-[#7a81cf]/20 to-[#4cb8a9]/5"
    },
    {
      id: "design",
      title: t('designTitle'),
      description: t('designDesc'),
      icon: Palette,
      color: "text-[#4cb8a9]",
      gradient: "from-[#4cb8a9]/20 to-[#7a81cf]/5"
    }
  ]

  return (
    <section className="py-24 relative" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground text-lg">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/services/${service.id}`} className="block h-full">
                <Card className="h-full border-border/50 bg-background/20 backdrop-blur-sm hover:border-primary/50 transition-colors group overflow-hidden relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-background/80 border border-border flex items-center justify-center mb-4 ${service.color} group-hover:scale-110 transition-transform`}>
                      <service.icon size={24} />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
