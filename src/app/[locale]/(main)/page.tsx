"use client"

import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { AboutUs } from "@/components/about-us";
import { Testimonials } from "@/components/testimonials";
import { ContactUs } from "@/components/contact-us";
import { Team } from "@/components/team";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen">
       {/* Global Parallax Background */}
       <div 
        className="fixed inset-0 z-0"
      >
        <div className="absolute inset-0 bg-background/90 md:bg-background/80 z-10" /> {/* Overlay for readability */}
        
        <Image 
            src="/hero.jpg"
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={100}
        />
      </div>

      <div className="relative z-10">
        <Hero />
        <AboutUs />
        <Services />
        <Testimonials />
        <Team />
        <ContactUs />
      </div>
    </div>
  );
}
