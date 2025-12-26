"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Star, Quote } from "lucide-react"
import { useTranslations } from "next-intl"

export function Testimonials() {
  const t = useTranslations('Testimonials')

  const testimonials = [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Server Owner",
      content: t('t1'),
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Chen",
      role: "Startup Founder",
      content: t('t2'),
      rating: 5
    },
    {
      id: 3,
      name: "Marcus Johnson",
      role: "Creative Director",
      content: t('t3'),
      rating: 5
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Community Manager",
      content: t('t4'),
      rating: 4
    }
  ]

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">{t('title')}</h2>
          <p className="text-muted-foreground text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3 p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full"
                >
                    <Card className="h-full bg-background/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors p-6 flex flex-col justify-between">
                    <CardContent className="p-0">
                        <Quote className="text-primary/20 mb-4 h-8 w-8" />
                        <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                        
                        <div className="flex items-center gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                            <Star 
                            key={i} 
                            size={16} 
                            className={`${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} 
                            />
                        ))}
                        </div>
                        
                        <div>
                            <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                            <p className="text-xs text-primary font-medium">{testimonial.role}</p>
                        </div>
                    </CardContent>
                    </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
