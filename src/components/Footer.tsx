import { Link } from 'react-router'
import { useLang } from '../content'
import { EXTERNAL } from '../routes'
import { ScrollMarquee } from './motion/ScrollMarquee'

export function Footer() {
  const { t, to } = useLang()
  const year = new Date().getFullYear()
  const heading = 'eyebrow mb-5 text-cream/50'
  const link = 'transition-colors hover:text-terracotta'

  return (
    <footer className="grain relative overflow-hidden bg-navy-mid text-cream">
      <ScrollMarquee text={t.marquee.footer} className="font-display border-b border-cream/10 py-8 text-[12vw] leading-none text-cream/10 italic md:text-[8vw]" />

      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-24">
        <div className="md:col-span-4">
          <Link to={to('home')} aria-label="Paradise Villas">
            <img src="/logo-escuro.png" alt="Paradise Villas" width={381} height={240} loading="lazy" className="h-24 w-auto" />
          </Link>
          <p className="font-display mt-6 text-2xl italic">{t.footer.tagline}</p>
        </div>

        <div className="md:col-span-3">
          <h2 className={heading}>{t.footer.contacts}</h2>
          <ul className="space-y-2">
            <li>
              <a href={`tel:${EXTERNAL.phone}`} className={link}>
                {EXTERNAL.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${EXTERNAL.email}`} className={link}>
                {EXTERNAL.email}
              </a>
            </li>
            <li className="text-cream/60">{EXTERNAL.address}</li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className={heading}>{t.footer.services}</h2>
          <ul className="space-y-2">
            <li>
              <a href={EXTERNAL.booking} target="_blank" rel="noopener" className={link}>
                {t.footer.alojamentos}
              </a>
            </li>
            <li>
              <Link to={to('gestao')} className={link}>
                {t.nav.gestao}
              </Link>
            </li>
            <li>
              <Link to={to('experiencias')} className={link}>
                {t.nav.experiencias}
              </Link>
            </li>
            <li>
              <Link to={to('sobre')} className={link}>
                {t.nav.sobre}
              </Link>
            </li>
            <li>
              <a href={EXTERNAL.ownerLogin} target="_blank" rel="noopener" className={link}>
                {t.nav.ownerLogin}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className={heading}>{t.footer.follow}</h2>
          <a href={EXTERNAL.instagram} target="_blank" rel="noopener" className={link}>
            Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-6 text-xs text-cream/60 md:flex-row md:items-center md:justify-between md:px-10">
          <p>
            © {year} Paradise Villas. {t.footer.rights} {t.footer.company}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to={to('privacidade')} className={link}>
                {t.legal.privacidade.title}
              </Link>
            </li>
            <li>
              <Link to={to('termos')} className={link}>
                {t.legal.termos.title}
              </Link>
            </li>
            <li>
              <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener" className={link}>
                {t.footer.complaints}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
