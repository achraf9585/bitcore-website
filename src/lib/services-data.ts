
export const servicesData = {
  fivem: {
    title: "FiveM Scripts Development",
    tagline: "Redefining Roleplay Experience",
    description: "Take your server to the next level with our premium FiveM scripts and development services. We specialize in high-performance, lag-free resources.",
    icon: "Gamepad2",
    gradient: "from-[#4cb8a9] to-[#7a81cf]",
    accent: "text-[#4cb8a9]",
    features: [
      {
        title: "Custom Frameworks",
        description: "Tailor-made frameworks (ESX/QBCore) optimized for your specific server needs."
      },
      {
        title: "Performance Optimization",
        description: "We analyze and refactor code to ensure 60+ FPS and low latency for all players."
      },
      {
        title: "Exclusive UI Design",
        description: "Clean, responsive NUI implementations using React/Vue and TailwindCSS."
      }
    ],
    pricing: [
      {
        name: "Starter Setup",
        price: "$249",
        description: "Essential setup for a new server.",
        features: [
          "FiveM server installation & deployment",
          "Framework setup: ESX or QBCore",
          "Installation of up to 10 scripts",
          "Basic jobs setup (Up to 4 jobs)",
          "Permissions & roles setup",
          "Database setup & optimization",
          "Fixing up to 5 existing bugs",
          "Basic performance optimization",
          "Launch-ready configuration"
        ],
        popular: false
      },
      {
        name: "Professional Server",
        price: "$599",
        description: "Advanced structure for growing communities.",
        features: [
          "Everything from Starter Setup",
          "Full server structure implementation",
          "Installation of up to 25 scripts",
          "1 Custom script (small–medium)",
          "Advanced jobs setup (Up to 8 jobs)",
          "Economy & balance configuration",
          "Database key cleanup & optimization",
          "Bug fixing (up to 15 issues)",
          "Full performance optimization",
          "Installation of up to 3 Maps/MLOs",
          "UI Customization (Logos, Colors)"
        ],
        popular: true
      },
      {
        name: "Enterprise Solution",
        price: "$1,299",
        description: "Complete turnkey server solution.",
        features: [
          "Everything from Professional",
          "Full ready-to-launch server pack",
          "Installation of up to 50 scripts",
          "6 Custom scripts (medium–high)",
          "Fully customized jobs (Up to 15)",
          "Advanced economy & progression",
          "Custom UI systems (HUD, Menus)",
          "Installation of up to 10 Maps/MLOs",
          "Advanced security & hardening",
          "Full testing & launch support",
          "Priority support"
        ],
        popular: false
      }
    ]
  },
  web: {
    title: "Web Development",
    tagline: "Digital Excellence Delivered",
    description: "Build your digital presence with cutting-edge web technologies. Fast, secure, and SEO-optimized websites.",
    icon: "Code2",
    gradient: "from-[#4cb8a9] to-[#7a81cf]",
    accent: "text-[#4cb8a9]",
    features: [
      {
        title: "Next.js Applications",
        description: "Server-side rendered applications for ease of SEO and lightning fast performance."
      },
      {
        title: "E-Commerce Solutions",
        description: "Full-featured online stores with stripe/payment integrations."
      },
      {
        title: "CMS Integration",
        description: "Manage your content easily with Headless CMS (Sanity, Strapi, etc)."
      }
    ],
    pricing: [
      {
        name: "Starter Package",
        subtitle: "Online Presence",
        price: "$400 – $700",
        bestFor: "Small businesses, freelancers, personal brands",
        description: "A professional starting point for your digital identity.",
        features: [
          "1–5 page website",
          "Modern & responsive design (mobile-friendly)",
          "Basic UI/UX design",
          "Contact form",
          "Basic SEO setup (titles, meta descriptions)",
          "Social media links",
          "Basic security & performance setup",
          "1 revision round"
        ],
        delivery: "7–10 days",
        popular: false
      },
      {
        name: "Business Package",
        subtitle: "Growth Website",
        price: "$900 – $1,500",
        bestFor: "SMEs, startups, service businesses",
        description: "Scalable solution designed for growing businesses.",
        features: [
          "6–10 pages",
          "Custom UI/UX design (brand-based)",
          "CMS (WordPress / Webflow / custom)",
          "Advanced contact forms",
          "SEO optimization (on-page)",
          "Google Analytics & Search Console",
          "Speed optimization",
          "Basic security hardening",
          "3 revision rounds"
        ],
        delivery: "2–3 weeks",
        popular: true
      },
      {
        name: "Professional Package",
        subtitle: "Conversion Focused",
        price: "$1,800 – $3,000",
        bestFor: "Companies that want leads & sales",
        description: "High-performance website built for conversions.",
        features: [
          "10–15 pages or dynamic website",
          "Fully custom UI/UX design",
          "Conversion-focused layout (CTA, funnels)",
          "Blog or portfolio system",
          "Multilingual setup (optional)",
          "Advanced SEO setup",
          "Performance & caching optimization",
          "CRM or email integration",
          "5 revision rounds"
        ],
        delivery: "3–4 weeks",
        popular: false
      },
      {
        name: "E-Commerce Package",
        subtitle: "Online Store",
        price: "$2,500 – $5,000+",
        bestFor: "Online sellers & brands",
        description: "Complete online store solution.",
        features: [
          "Custom e-commerce website",
          "Product & category setup",
          "Payment gateway integration",
          "Cart & checkout system",
          "Order management",
          "Email notifications",
          "Security & performance optimization",
          "Training on how to manage the store"
        ],
        delivery: "4–6 weeks",
        popular: false
      },
      {
        name: "Monthly Maintenance",
        subtitle: "Support & Care",
        price: "$50 – $300 / month",
        bestFor: "Ongoing peace of mind",
        description: "Keep your website secure and up-to-date.",
        features: [
          "Website updates",
          "Security monitoring",
          "Backups",
          "Bug fixes",
          "Performance checks",
          "Minor content changes"
        ],
        popular: false
      }
    ],
    addons: [
      { name: "SEO (monthly)", price: "$300 – $800" },
      { name: "Branding & logo design", price: "$200 – $600" },
      { name: "Copywriting", price: "$100 – $500" },
      { name: "Speed optimization", price: "$150 – $400" },
      { name: "Payment gateway setup", price: "$150 – $500" },
      { name: "Hosting & domain management", price: "$50 – $200/year" }
    ]
  },
  design: {
    title: " Design",
    tagline: "Pixel Perfect Imagination",
    description: "Visuals that tell your story. From branding to full interface design, we craft pixel-perfect assets.",
    icon: "Palette",
    gradient: "from-[#4cb8a9] to-[#7a81cf]",
    accent: "text-[#4cb8a9]",
    features: [
      {
        title: "Brand Identity",
        description: "Logos, color palettes, and typography that define your business."
      },
      {
        title: "User Interface (UI)",
        description: "Modern, clean interfaces for web and mobile applications."
      },
      {
        title: "User Experience (UX)",
        description: "User flows and wireframes to ensure intuitive navigation."
      }
    ],
    pricing: [
      {
        name: "Logo Package",
        price: "$199",
        description: "Kickstart your brand.",
        features: ["3 Logo Concepts", "Vector Files", "Color Palette", "Social Media Kit"],
        popular: false
      },
      {
        name: "UI Kit",
        price: "$899",
        description: "Component library for your app.",
        features: ["Design System", "50+ Components", "Figma Source File", "Interactive Prototypes"],
        popular: true
      },
      {
        name: "Full Product Design",
        price: "$2,499+",
        description: "Complete app design from scratch.",
        features: ["UX Research", "Wireframing", "High-Fidelity UI", "Mobile & Desktop", "Dev Handoff"],
        popular: false
      }
    ]
  }
}
