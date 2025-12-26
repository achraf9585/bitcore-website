"use client"

import { motion } from "framer-motion"
import { Users, Target, Rocket } from "lucide-react"
import { useTranslations } from "next-intl"

export function AboutUs() {
  const t = useTranslations('About')

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {t('p1')}
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {t('p2')}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Target size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t('precisionTitle')}</h4>
                  <p className="text-sm text-muted-foreground">{t('precisionDesc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                  <Rocket size={24} />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{t('performanceTitle')}</h4>
                  <p className="text-sm text-muted-foreground">{t('performanceDesc')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative h-[500px] w-full flex items-center justify-center perspective-1000">
             {/* Glowing Background */}
             <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full transform scale-75 animate-pulse" />
             
             {/* Floating Particles/Elements */}
             {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl z-20"
                    initial={{ y: 0 }}
                    animate={{ 
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{ 
                        duration: 4 + i, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: i * 1.5 
                    }}
                    style={{
                        top: `${20 + i * 25}%`,
                        [i % 2 === 0 ? 'right' : 'left']: '5%',
                    }}
                >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i === 0 ? 'bg-blue-500/20 text-blue-500' : i === 1 ? 'bg-purple-500/20 text-purple-500' : 'bg-green-500/20 text-green-500'}`}>
                        {i === 0 ? <Users size={20} /> : i === 1 ? <Rocket size={20} /> : <Target size={20} />}
                    </div>
                </motion.div>
             ))}

             {/* Main Mascot */}
             <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                animate={{ 
                    y: [-15, 15, -15],
                    rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                }}
                className="relative z-10 w-full h-full flex items-center justify-center p-8"
             >
                 {/* Image Container with Drop Shadow */}
                 <div className="relative w-full max-w-[400px] drop-shadow-2xl filter hover:drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-500">
                    <img 
                        src="/mascot.png" 
                        alt="Bitcore Mascot" 
                        className="w-full h-auto object-contain"
                    />
                 </div>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
