import { Link } from 'react-router'
import { useLang } from '../content'
import { EXTERNAL } from '../routes'
import { Icon } from './icons'

export function Footer() {
  const { t, to } = useLang()
  const year = new Date().getFullYear()
  const heading = 'eyebrow mb-5 text-white'
  const link = 'text-white/65 transition-colors hover:text-terracotta'

  return (
    <footer className="bg-navy-deep text-white">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-20">
        <div className="md:col-span-4">
          <Link to={to('home')} aria-label="Paradise Villas">
            <img src="/logo-escuro.png" alt="Paradise Villas" width={381} height={240} loading="lazy" className="h-20 w-auto" />
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">{t.footer.tagline}</p>
          <p className="mt-4 text-xs leading-relaxed text-white/45">
            {t.footer.company}
            <br />
            {EXTERNAL.address}
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className={heading}>{t.footer.links}</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={EXTERNAL.booking} target="_blank" rel="noopener" className={link}>
                {t.nav.alojamentos}
              </a>
            </li>
            {(['experiencias', 'gestao', 'parceiros', 'sobre', 'contactos'] as const).map((key) => (
              <li key={key}>
                <Link to={to(key)} className={link}>
                  {t.nav[key]}
                </Link>
              </li>
            ))}
            <li>
              <a href={EXTERNAL.ownerLogin} target="_blank" rel="noopener" className={link}>
                {t.nav.ownerLogin}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className={heading}>{t.footer.contacts}</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={`tel:${EXTERNAL.phone}`} className={`${link} inline-flex items-center gap-2`}>
                <Icon name="phone" className="h-4 w-4" /> {EXTERNAL.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={EXTERNAL.whatsapp} target="_blank" rel="noopener" className={`${link} inline-flex items-center gap-2`}>
                <Icon name="message" className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${EXTERNAL.email}`} className={`${link} inline-flex items-center gap-2`}>
                <Icon name="mail" className="h-4 w-4" /> {EXTERNAL.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className={heading}>{t.footer.follow}</h2>
          <a
            href={EXTERNAL.instagram}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-xl bg-white/[0.07] px-4 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/15"
          >
            <Icon name="instagram" className="h-4 w-4" /> Instagram
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-5 py-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {year} Paradise Villas. {t.footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li>
              <Link to={to('privacidade')} className="transition-colors hover:text-white">
                {t.legal.privacidade.title}
              </Link>
            </li>
            <li>
              <Link to={to('termos')} className="transition-colors hover:text-white">
                {t.legal.termos.title}
              </Link>
            </li>
            <li>
              <a href="https://www.livroreclamacoes.pt" target="_blank" rel="noopener" className="transition-colors hover:text-white">
                {t.footer.complaints}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
