import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function FinalCTA() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-final-head] > *', {
          y: 18,
          opacity: 0,
          duration: 0.72,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-final-head]',
            start: 'top 82%',
          },
        });

        gsap.from('[data-final-path]', {
          strokeDashoffset: 1,
          duration: 1.2,
          stagger: 0.12,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '[data-final-network]',
            start: 'top 80%',
          },
        });

        gsap.from('[data-final-core]', {
          scale: 0.9,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-final-network]',
            start: 'top 80%',
          },
        });

        gsap.from('[data-final-action]', {
          x: 18,
          opacity: 0,
          duration: 0.72,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-final-network]',
            start: 'top 78%',
          },
        });

        gsap.to('[data-final-pulse]', {
          scale: 1.55,
          opacity: 0.12,
          duration: 1.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.25,
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="contacto"
      className="
        relative
        overflow-hidden
        bg-ppc-800
        text-white
      "
    >
      <div className="container-page py-20 sm:py-24 lg:py-28 xl:py-30">
        {/* ==================================================
            HEADER
        ================================================== */}
        <div data-final-head className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/[0.56] sm:text-[11px]">
            PPC / CONTACTO
          </p>

          <h2
            className="
              mx-auto
              mt-4
              max-w-[680px]
              text-[clamp(1.8rem,3.2vw,2.8rem)]
              font-medium
              leading-[1.04]
              tracking-[-0.04em]
            "
          >
            Hablemos de
            <span className="block text-white/[0.62]">
              lo que sigue.
            </span>
          </h2>
        </div>

        {/* ==================================================
            DESKTOP / TABLET
            Un solo sistema visual: PPC como origen y dos rutas.
            Nada de cards, listas o acordeones.
        ================================================== */}
        <div
          data-final-network
          className="
            relative
            mt-14
            hidden
            min-h-[470px]
            border-y
            border-white/[0.14]

            md:block

            lg:mt-16
            lg:min-h-[520px]
          "
        >
          {/* construction guides */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.07]" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/[0.07]" />

          {/* network paths */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 520"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path
              data-final-path
              d="M 470 260 C 600 260, 655 145, 835 145"
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="1"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="0"
            />
            <path
              data-final-path
              d="M 470 260 C 600 260, 655 375, 835 375"
              fill="none"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="1"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset="0"
            />
          </svg>

          {/* core */}
          <div
            data-final-core
            className="
              absolute
              left-[39%]
              top-1/2
              z-20
              flex
              h-[112px]
              w-[112px]
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              border
              border-white/[0.22]
              bg-white
              shadow-[0_22px_75px_rgba(0,0,0,0.18)]

              lg:h-[124px]
              lg:w-[124px]
            "
          >
            <div className="flex h-[58px] w-[58px] items-center justify-center bg-ppc-800 text-[12px] font-semibold tracking-[-0.02em] text-white">
              PPC
            </div>

            <span
              data-final-pulse
              className="
                absolute
                inset-[-16px]
                border
                border-white/[0.26]
              "
            />

            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-ppc-300" />
          </div>

          {/* small origin copy */}
          <div
            className="
              absolute
              left-0
              top-1/2
              w-[27%]
              -translate-y-1/2
            "
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/[0.46]">
              UNA SOLA ENTRADA
            </p>
            <p className="mt-3 max-w-[230px] text-[13px] leading-[1.6] text-white/[0.62]">
              Equipo nuevo o soporte técnico. Elige el punto de partida.
            </p>
          </div>

          {/* sales endpoint */}
          <a
            data-final-action
            href={buildWhatsAppUrl('printing')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                location: 'final-cta',
                context: 'printing',
                service: 'Venta de equipos',
                label: 'Cotizar equipo',
              })
            }
            className="
              group
              absolute
              right-[2%]
              top-[20%]
              z-20
              w-[29%]
              border-l
              border-white/[0.18]
              pl-6

              lg:pl-8
            "
          >
            <div className="flex items-center gap-3">
              <span
                data-final-pulse
                className="h-2.5 w-2.5 bg-white"
              />
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/[0.52]">
                EQUIPO
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between gap-5">
              <span
                className="
                  text-[clamp(1.45rem,2vw,1.85rem)]
                  font-medium
                  leading-[1.04]
                  tracking-[-0.03em]
                  transition-colors
                  duration-300

                  group-hover:text-white/[0.78]
                "
              >
                Cotizar equipo
              </span>

              <ArrowUpRight
                className="
                  mb-0.5
                  h-5
                  w-5
                  shrink-0
                  text-white/[0.62]
                  transition-all
                  duration-300

                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                  group-hover:text-white/[0.78]
                "
              />
            </div>
          </a>

          {/* support endpoint */}
          <a
            data-final-action
            href={buildWhatsAppUrl('support')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                location: 'final-cta',
                context: 'support',
                service: 'Soporte técnico HP',
                label: 'Necesito soporte',
              })
            }
            className="
              group
              absolute
              bottom-[19%]
              right-[2%]
              z-20
              w-[29%]
              border-l
              border-white/[0.18]
              pl-6

              lg:pl-8
            "
          >
            <div className="flex items-center gap-3">
              <span
                data-final-pulse
                className="h-2.5 w-2.5 bg-white"
              />
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/[0.52]">
                SOPORTE · HP
              </span>
            </div>

            <div className="mt-5 flex items-end justify-between gap-5">
              <span
                className="
                  text-[clamp(1.45rem,2vw,1.85rem)]
                  font-medium
                  leading-[1.04]
                  tracking-[-0.03em]
                  transition-colors
                  duration-300

                  group-hover:text-white/[0.78]
                "
              >
                Necesito soporte
              </span>

              <ArrowUpRight
                className="
                  mb-0.5
                  h-5
                  w-5
                  shrink-0
                  text-white/[0.62]
                  transition-all
                  duration-300

                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                  group-hover:text-white/[0.78]
                "
              />
            </div>
          </a>
        </div>

        {/* ==================================================
            MOBILE
            Un pequeño sistema vertical; no repite la estructura del FAQ.
        ================================================== */}
        <div className="mx-auto mt-6 max-w-[320px] text-center md:hidden">
          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/[0.46]">
            UNA SOLA ENTRADA
          </p>

          <p className="mt-2.5 text-[13px] leading-[1.6] text-white/[0.62]">
            Equipo nuevo o soporte técnico. Elige el punto de partida.
          </p>
        </div>

        <div
          className="
            relative
            mt-8
            border-y
            border-white/[0.14]
            py-10

            md:hidden
          "
        >
          <div className="relative mx-auto h-[315px] w-full max-w-[340px]">
            {/* vertical axis */}
            <div className="absolute left-[38px] top-[54px] h-[198px] w-px bg-white/[0.20]" />

            {/* core */}
            <div
              data-final-core
              className="
                absolute
                left-0
                top-1/2
                z-20
                flex
                h-[76px]
                w-[76px]
                -translate-y-1/2
                items-center
                justify-center
                border
                border-white/[0.22]
                bg-white
              "
            >
              <div className="flex h-10 w-10 items-center justify-center bg-ppc-800 text-[10px] font-semibold text-white">
                PPC
              </div>
              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-ppc-300" />
            </div>

            {/* branch 1 */}
            <div className="absolute left-[38px] top-[72px] h-px w-[62px] bg-white/[0.20]" />
            <a
              data-final-action
              href={buildWhatsAppUrl('printing')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  location: 'final-cta',
                  context: 'printing',
                  service: 'Venta de equipos',
                  label: 'Cotizar equipo',
                })
              }
              className="
                group
                absolute
                right-0
                top-[43px]
                w-[66%]
                border-l
                border-white/[0.18]
                pl-5
              "
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.30]">
                EQUIPO
              </p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-[1.28rem] font-medium leading-[1.05] tracking-[-0.025em]">
                  Cotizar equipo
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/[0.62]" />
              </div>
            </a>

            {/* branch 2 */}
            <div className="absolute bottom-[72px] left-[38px] h-px w-[62px] bg-white/[0.20]" />
            <a
              data-final-action
              href={buildWhatsAppUrl('support')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  location: 'final-cta',
                  context: 'support',
                  service: 'Soporte técnico HP',
                  label: 'Necesito soporte',
                })
              }
              className="
                group
                absolute
                bottom-[43px]
                right-0
                w-[66%]
                border-l
                border-white/[0.18]
                pl-5
              "
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.30]">
                SOPORTE · HP
              </p>
              <div className="mt-3 flex items-center justify-between gap-4">
                <span className="text-[1.28rem] font-medium leading-[1.05] tracking-[-0.025em]">
                  Necesito soporte
                </span>
                <ArrowUpRight className="h-4 w-4 text-white/[0.62]" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}