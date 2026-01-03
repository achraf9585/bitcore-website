"use client"

import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations('Footer')

  return (
    <footer className="border-t border-border/40 py-12 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Bitcore Solution</h3>
            <p className="text-muted-foreground max-w-sm">
              {t('desc')}
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">{t('services')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#fivem" className="hover:text-foreground transition-colors">FiveM Development</a></li>
              <li><a href="#web" className="hover:text-foreground transition-colors">Web Development</a></li>
              <li><a href="#design" className="hover:text-foreground transition-colors">UI/UX Design</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">{t('legal')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/legal/privacy" className="hover:text-foreground transition-colors">{t('privacy')}</a></li>
              <li><a href="/legal/terms" className="hover:text-foreground transition-colors">{t('terms')}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Bitcore Solution. {t('rights')}
        </div>
      </div>
    </footer>
  )
}
