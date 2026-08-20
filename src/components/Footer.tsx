import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';

import { buildWhatsAppUrl } from '@/lib/whatsapp';
import {
  trackNavigationClick,
  trackWhatsAppClick,
} from '@/lib/analytics';

const FOOTER_NAV = [
  { label: 'Servicios', href: '#soluciones' },
  { label: 'Equipos', href: '#equipos' },
  { label: 'Tecnología', href: '#servicios' },
  { label: 'Soporte', href: '#soporte' },
  { label: 'Mantenimiento', href: '#por-que-ppc' },
  { label: 'FAQ', href: '#faq' },
] as const;

const CONTACT = {
  whatsappDisplay: '55 7231 8946',
  phoneDisplay: '55 5797 0666',
  phoneHref: 'tel:+525557970666',
  email: 'contacto@ppcservicenter.mx',
  address:
    'C. Iztapalapa 51, Metropolitana 3ra Secc, 57750 Cdad. Nezahualcóyotl, Méx.',
  hours: 'Lunes a viernes · 9:00 a.m. – 6:00 p.m.',
} as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-graphite-950/10
        bg-paper-50
        text-graphite-950
      "
    >
      <div className="container-page py-12 sm:py-14 lg:py-16">
        {/* ==================================================
            MAIN FOOTER
        ================================================== */}
        <div
          className="
            grid
            gap-12
            border-b
            border-graphite-950/10
            pb-12

            md:grid-cols-2

            lg:grid-cols-12
            lg:gap-10
            lg:pb-14
          "
        >
          {/* BRAND */}
          <div className="lg:col-span-5">
            <a
              href="#top"
              onClick={() =>
                trackNavigationClick({
                  target: 'footer-logo',
                })
              }
              className="inline-flex items-end gap-3"
              aria-label="PPC ServiCenter — Ir al inicio"
            >
              <span
                className="
                  text-[clamp(2.15rem,4vw,3.4rem)]
                  font-medium
                  leading-none
                  tracking-[-0.055em]
                "
              >
                PPC
              </span>

              <span
                className="
                  mb-1
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-graphite-400

                  sm:text-[10px]
                "
              >
                ServiCenter
              </span>
            </a>

            <p
              className="
                mt-6
                max-w-[470px]
                text-[14px]
                leading-[1.65]
                text-graphite-600

                sm:text-[15px]
              "
            >
              Venta de plotters, impresoras, insumos y papelería para oficina,
              con instalación, mantenimiento y soporte técnico para empresas.
            </p>

            <p
              className="
                mt-5
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-graphite-400
              "
            >
              PLOTTERS / IMPRESORAS / INSUMOS / PAPELERÍA / SOPORTE TÉCNICO
            </p>
          </div>

          {/* NAVIGATION */}
          <nav
            aria-label="Navegación del pie de página"
            className="
              lg:col-span-2
              lg:col-start-7
            "
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-graphite-400">
              EXPLORAR
            </p>

            <ul className="mt-5 space-y-3.5">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() =>
                      trackNavigationClick({
                        target: item.href,
                      })
                    }
                    className="
                      text-[13px]
                      text-graphite-600
                      transition-colors
                      duration-300

                      hover:text-graphite-950
                    "
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* CONTACT */}
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-graphite-400">
              CONTACTO
            </p>

            <div className="mt-5 space-y-4">
              <a
                href={buildWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    location: 'final-cta',
                    context: 'general',
                    label: 'WhatsApp — Footer',
                  })
                }
                className="
                  group
                  flex
                  w-fit
                  items-center
                  gap-2.5
                  text-[13px]
                  font-medium
                  text-graphite-950
                  transition-colors
                  duration-300

                  hover:text-ppc-600
                "
              >
                WhatsApp · {CONTACT.whatsappDisplay}

                <ArrowUpRight
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300

                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </a>

              <a
                href={CONTACT.phoneHref}
                className="
                  flex
                  w-fit
                  items-center
                  gap-2.5
                  text-[12px]
                  text-graphite-600
                  transition-colors
                  duration-300

                  hover:text-graphite-950
                "
              >
                <Phone aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.5} />
                {CONTACT.phoneDisplay}
              </a>

              <a
                href={`mailto:${CONTACT.email}`}
                className="
                  flex
                  w-fit
                  items-center
                  gap-2.5
                  break-all
                  text-[12px]
                  text-graphite-600
                  transition-colors
                  duration-300

                  hover:text-graphite-950
                "
              >
                <Mail aria-hidden="true" className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
                {CONTACT.email}
              </a>
            </div>

            <div className="mt-6 border-t border-graphite-950/10 pt-5">
              <div className="flex gap-2.5">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-graphite-400"
                  strokeWidth={1.5}
                />

                <div>
                  <address className="max-w-[310px] not-italic text-[11px] leading-[1.6] text-graphite-500">
                    {CONTACT.address}
                  </address>

                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.11em] text-graphite-400">
                    Oficina administrativa
                  </p>
                </div>
              </div>

              <p className="mt-4 text-[11px] leading-[1.6] text-graphite-500">
                {CONTACT.hours}
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================
            BOTTOM
        ================================================== */}
        <div
          className="
            flex
            flex-col
            gap-4
            pt-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.13em]
              text-graphite-400
            "
          >
            © {year} PPC ServiCenter
          </p>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-x-5
              gap-y-2
            "
          >
            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.13em]
                text-graphite-300
              "
            >
              CDMX · Edo. Méx. · Zona centro · México
            </span>

            <span
              className="
                text-[9px]
                uppercase
                tracking-[0.13em]
                text-graphite-300
              "
            >
              Aviso de privacidad
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}