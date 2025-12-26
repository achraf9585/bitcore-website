"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export function Hero() {
  const t = useTranslations('Hero')

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background is now handled globally in page.tsx */}
      <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
          {/* Gradient Overlays for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-background" />
          <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="container px-4 text-center relative z-20 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-gradient-to-r from-[#4cb8a9]/20 to-[#7a81cf]/20 text-white backdrop-blur-md border border-[#4cb8a9]/30 text-sm font-medium mb-6 animate-pulse">
            {t('badge')}
          </span>
          
          <div className="relative w-full max-w-5xl mx-auto mb-8 h-48 md:h-96">
            <Image
              src="/logos/logo_hero.png"
              alt={t('title')}
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-8 font-light tracking-wide">
            {t('description')}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-gradient-to-r from-[#4cb8a9] to-[#7a81cf] shadow-lg shadow-[#4cb8a9]/25 hover:shadow-[#4cb8a9]/40 hover:opacity-90 transition-all border-0">
              {t('explore')} <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full backdrop-blur-md bg-white/5 border-white/20 text-white hover:bg-[#4cb8a9]/10 hover:border-[#4cb8a9]/50 transition-colors">
              {t('contact')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
