"use client"
import { motion } from "framer-motion"
import NextImage from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Gamepad2, Globe, Palette, ChevronRight, Sparkles, Clock, Star, Plus, Code2 } from "lucide-react"
import { Link } from '@/i18n/routing'
import { ElementType, useState } from "react"
import { useCart } from "@/context/cart-context"
// import { toast } from "@/hooks/use-toast" // Removed to avoid missing module error

const iconMap: { [key: string]: ElementType } = {
  Gamepad2,
  Globe,
  Palette,
  Code2
}

interface ServiceFeature {
  title: string
  description: string
}

interface ServicePricing {
  name: string
  subtitle?: string
  price: string
  description?: string
  bestFor?: string
  features: string[]
  popular?: boolean
  delivery?: string
}

interface ServiceAddon {
  name: string
  price: string
}

interface ServiceData {
  title: string
  tagline?: string
  description: string
  icon: string
  gradient?: string
  accent?: string
  features: ServiceFeature[]
  pricing: ServicePricing[]
  addons?: ServiceAddon[]
}

interface ServiceDetailProps {
  service: ServiceData
  slug: string
}

export function ServiceDetail({ service, slug }: ServiceDetailProps) {
  const Icon = iconMap[service.icon] || Globe
  const gradient = service.gradient || "from-primary to-primary/60"
  const accent = service.accent || "text-primary"
  const { addItem } = useCart()
  const [loadingPkg, setLoadingPkg] = useState<string | null>(null)

  const handleAddToCart = (pkg: ServicePricing) => {
    // Add to cart
    addItem({
      id: pkg.name, // or generate random id handled by context
      name: pkg.name,
      price: pkg.price,
      description: pkg.description,
      serviceSlug: slug
    })
  }

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      {/* Modern Hero Section */}
      <section className="relative min-h-[85vh]  flex items-center justify-center overflow-hidden pt-20">
        {/* Dynamic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0f0518] via-[#0f0518] to-background z-10" />
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.08] dark:opacity-[0.15]`} />
          
          {/* Animated Blobs */}
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [0, 50, 0],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl ${gradient} rounded-full blur-[120px] opacity-20`}
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className={`absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr ${gradient} rounded-full blur-[140px] opacity-20`}
          />
          
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] dark:opacity-[0.07] bg-center" />
        </div>

        <div className="container px-4 mx-auto relative z-20">
          <div className="max-w-5xl mx-auto text-center">
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex justify-center mb-8"
            >
              <div className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl ${accent}`}>
                <Sparkles size={16} className="animate-pulse" />
                <span className="text-sm font-semibold uppercase tracking-widest">{service.tagline || "Premium Service"}</span>
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-tight"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                {service.title.split(' ')[0]} 
              </span>
              <br className="md:hidden" />
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${gradient} ml-2 md:ml-4`}>
                {service.title.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-xl md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto font-light"
            >
              {service.description}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className={`h-14 text-lg px-10 rounded-full bg-gradient-to-r ${gradient} hover:opacity-90 transition-all hover:scale-105 shadow-xl shadow-primary/20 border-0`} asChild>
                <Link href="#pricing">
                  View Packages
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 text-lg px-10 rounded-full border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all hover:scale-105" asChild>
                <Link href="/contact-us">
                  Custom Quote 
                  <ChevronRight className="ml-2 w-5 h-5"/>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Floating Icon Feature */}
        <motion.div
           initial={{ opacity: 0, rotate: -20, scale: 0.8 }}
           animate={{ opacity: 1, rotate: 0, scale: 1 }}
           transition={{ delay: 0.5, duration: 1 }}
           className="absolute hidden lg:block right-[5%] top-[40%] text-foreground/5 z-0 pointer-events-none"
        >
          <Icon size={500} strokeWidth={0.5} />
        </motion.div>
      </section>

      {/* Features Grid - Glassmorphism */}
      <section className="py-24 relative">
        <div className="container px-4 mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-neutral-100/50 dark:bg-white/5 border border-white/10 hover:border-primary/30 transition-all hover:shadow-2xl hover:-translate-y-1 backdrop-blur-sm"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} p-[1px] mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                    <Check className={`w-6 h-6 ${accent}`} />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 relative bg-neutral-900/5 dark:bg-black/20" id="pricing">
        <div className="container px-4 mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Choose the perfect package for your goals.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10 max-w-8xl mx-auto">
            {service.pricing.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${pkg.popular ? 'lg:-mt-8 lg:mb-8 z-10' : ''}`}
              >
                <Card className={`relative flex flex-col w-full overflow-hidden transition-all duration-300 rounded-[2rem] border-0 ring-1 ring-white/10 ${
                  pkg.popular 
                    ? 'bg-[#0f0518] shadow-2xl scale-100 ring-primary/50 text-white' 
                    : 'bg-white/60 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 hover:scale-[1.02] shadow-sm hover:shadow-xl'
                }`}>
                  {pkg.popular && (
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
                  )}
                  
                  <CardHeader className="pt-10 px-8 pb-0">
                    {pkg.popular && (
                      <div className="absolute top-6 right-6">
                        <Badge className={`bg-gradient-to-r ${gradient} text-white border-0 px-3 py-1 shadow-lg shadow-primary/20`}>Most Popular</Badge>
                      </div>
                    )}
                    <h3 className="text-2xl font-bold tracking-tight">{pkg.name}</h3>
                    {pkg.subtitle && <p className={`text-sm font-semibold uppercase tracking-wider mt-1 ${accent}`}>{pkg.subtitle}</p>}
                    
                    <div className="my-6">
                       <span className="text-4xl font-extrabold tracking-tight">{pkg.price}</span>
                       <span className={`text-sm block mt-1 ${pkg.popular ? 'text-white/60' : 'text-muted-foreground'}`}>{pkg.bestFor || pkg.description}</span>
                    </div>

                    
                  </CardHeader>
                  
                  <CardContent className="flex-grow px-8 py-4">
                    {/* Delivery Time */}
                    {pkg.delivery && (
                      <div className={`flex items-center gap-2 mb-6 text-sm font-medium p-3 rounded-lg border ${pkg.popular ? 'bg-white/10 border-white/10 text-white/90' : 'bg-secondary/50 border-secondary'}`}>
                        <Clock size={16} />
                        <span>Delivery: {pkg.delivery}</span>
                      </div>
                    )}

                    <div className="space-y-4">
                      {pkg.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm">
                          <div className={`mt-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center ${pkg.popular ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                             <Check size={10} strokeWidth={3} />
                          </div>
                          <span className={`leading-tight ${pkg.popular ? 'text-white/80' : 'text-muted-foreground/90'}`}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-8 pt-4">
                    <Button 
                      onClick={() => handleAddToCart(pkg)}
                      className={`w-full h-12 text-base rounded-xl transition-all shadow-lg ${
                        pkg.popular 
                          ? `bg-gradient-to-r ${gradient} text-white hover:opacity-90 hover:scale-[1.02]` 
                          : 'hover:scale-[1.02]'
                      }`} 
                      variant={pkg.popular ? "default" : "secondary"} 
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add Notes / Addons Section if exists */}
      {service.addons && (
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container px-4 mx-auto relative z-10">
            <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="max-w-4xl mx-auto"
            >
              <h3 className="text-3xl font-bold text-center mb-12">Enhance with Add-Ons</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {service.addons.map((addon, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col p-6 rounded-2xl border border-border bg-card/50 backdrop-blur-sm text-center hover:border-primary/50 transition-colors"
                  >
                    <div className="mb-4">
                      <div className={`mx-auto w-10 h-10 rounded-full bg-secondary flex items-center justify-center`}>
                        <Plus size={20} className="text-muted-foreground" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg mb-2">{addon.name}</h4>
                    <p className={`text-xl font-bold ${accent}`}>{addon.price}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Partners Section - Web Development Only */}
        <section className="py-20 border-t border-white/5 bg-white/[0.02] overflow-hidden">
          <div className="container mx-auto px-4 mb-12 text-center">
             <h3 className="text-xl md:text-2xl font-semibold text-white/40 uppercase tracking-widest">Trusted Partners</h3>
          </div>
          
          <div className="flex overflow-hidden relative w-full mask-linear-fade">
             <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
             <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
             
             <motion.div
              className="flex gap-16 md:gap-24 items-center whitespace-nowrap pl-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              style={{ width: "fit-content" }}
            >
              {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((i, index) => (
                <div key={index} className="relative w-32 h-16 md:w-40 md:h-20 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                   {/* Placeholder for Partner Logos - Using main logo for demo */}
                   <NextImage 
                      src="/logos/logo_header.png" 
                      alt={`Partner ${i}`} 
                      fill 
                      className="object-contain" 
                   />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
         <div className={`absolute inset-0 bg-gradient-to-t from-black via-neutral-900 to-background opacity-90`} />
         <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
         
         <div className="container px-4 mx-auto text-center relative z-10">
           <h2 className="text-5xl md:text-7xl font-bold mb-8 text-white tracking-tight">Let's build something<br/><span className={`text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>Extraordinary.</span></h2>
           <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto font-light">
             Your vision deserves the best execution. Start your journey with us today.
           </p>
           <Button size="lg" className="bg-white text-black hover:bg-neutral-200 text-lg px-12 py-8 rounded-full shadow-2xl transition-transform hover:scale-105" asChild>
             <Link href="/contact-us">Start Your Project</Link>
           </Button>
         </div>
      </section>
    </div>
  )
}

