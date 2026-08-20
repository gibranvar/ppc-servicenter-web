import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PRODUCT_IMAGE =
  'https://live.staticflickr.com/65535/55471347741_c633af9b8a_b.jpg';

const SUPPORT_ITEMS = [
  {
    label: 'Identificar la falla.',
    title: 'Soporte técnico para impresoras y plotters.',
    description:
      'Diagnóstico, mantenimiento preventivo y correctivo, y soporte técnico para mantener impresoras y plotters operando, incluyendo atención para equipos HP.',
  },
  {
    label: 'Evitar interrupciones.',
    title: 'Mantenimiento preventivo y correctivo',
    description:
      'Mantenimiento preventivo y correctivo para conservar el rendimiento de impresoras y plotters, prevenir fallas y reducir tiempos de inactividad.',
  },
  {
    label: 'EQUIPOS HP',
    title: 'Soporte para equipos HP',
    description:
      'Diagnóstico y soporte técnico para impresoras y plotters HP según la falla, el uso y las necesidades de cada equipo.',
  },
] as const;

export default function Support() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-support-head] > *', {
          y: 18,
          opacity: 0,
          duration: 0.72,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-support-head]',
            start: 'top 82%',
          },
        });

        gsap.from('[data-support-photo]', {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1.05,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '[data-support-layout]',
            start: 'top 80%',
          },
        });

        gsap.from('[data-support-item]', {
          y: 18,
          opacity: 0,
          duration: 0.72,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-support-list]',
            start: 'top 80%',
          },
        });

      });

      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.to('[data-support-product]', {
            yPercent: 5,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-support-layout]',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="soporte"
      className="
        relative
        overflow-hidden
        bg-[#f7f8f8]
        text-graphite-950
      "
    >
      <div className="container-page py-20 sm:py-24 lg:py-28 xl:py-30">
        {/* ==================================================
            INTRO
        ================================================== */}
        <div
          data-support-head
          className="
            grid
            gap-7
            border-b
            border-graphite-950/[0.10]
            pb-10

            lg:grid-cols-12
            lg:gap-10
            lg:pb-12
          "
        >
          <div className="lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-graphite-500 sm:text-[11px]">
              PPC / SOPORTE TÉCNICO
            </p>
          </div>

          <div className="lg:col-span-9">
            <h2
              className="
                max-w-[700px]
                text-[clamp(1.8rem,3.2vw,2.8rem)]
                font-medium
                leading-[1.04]
                tracking-[-0.04em]
              "
            >
              Soporte técnico para
              <span className="block text-graphite-400">
                impresoras y plotters.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[590px]
                text-[14px]
                leading-[1.65]
                text-graphite-600

                sm:text-[15px]

                lg:mt-6
              "
            >
              Diagnóstico, mantenimiento preventivo y correctivo, y soporte técnico para impresoras y plotters, incluyendo equipos HP. Atención prioritaria en CDMX, Estado de México y zona centro, con cobertura en otras regiones de México.
            </p>
          </div>
        </div>

        {/* ==================================================
            MAIN COMPOSITION
            Imagen/crop fuerte + contenido editorial.
            Sin diagrama, nodos ni "sistema".
        ================================================== */}
        <div
          data-support-layout
          className="
            grid
            gap-10
            py-12

            sm:py-14

            lg:grid-cols-12
            lg:items-stretch
            lg:gap-12
            lg:py-16
          "
        >
          {/* IMAGE PLANE */}
          <div
            data-support-photo
            className="
              relative
              min-h-[330px]
              overflow-hidden
              border-y
              border-graphite-950/[0.10]
              bg-paper-50
              shadow-[inset_0_1px_0_rgba(255,255,255,0.75)]

              sm:min-h-[390px]

              lg:col-span-7
              lg:min-h-[560px]
            "
          >
            <div
              className="
                absolute
                left-3
                top-3
                z-20
                flex
                items-center
                gap-3
                border
                border-graphite-950/[0.10]
                bg-white/95
                backdrop-blur-sm
                px-3
                py-2.5

                sm:left-0
                sm:top-0
                sm:border-0
                sm:border-b
                sm:border-r
                sm:px-4
                sm:py-3
              "
            >
              <span className="h-2 w-2 bg-ppc-400" />
              <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-graphite-500">
                ATENCIÓN TÉCNICA
              </span>
            </div>


            <div
              className="
                absolute
                bottom-[5%]
                left-1/2
                h-[9%]
                w-[56%]
                -translate-x-1/2
                rounded-[50%]
                bg-graphite-950/15
                blur-[28px]

                lg:hidden
              "
            />

            {/* MOBILE / TABLET
                Conserva el crop editorial actual.
            */}
            <img
              data-support-product
              src={PRODUCT_IMAGE}
              alt="Técnico realizando mantenimiento y soporte a impresora profesional"
              loading="lazy"
              decoding="async"
              className="
                absolute
                inset-0
                h-full
                w-full
                max-w-none
                object-cover
                object-center
                opacity-100
                will-change-transform

                sm:inset-auto
                sm:bottom-[-19%]
                sm:right-[-20%]
                sm:h-[150%]
                sm:w-[145%]
                sm:object-contain
                sm:object-right-bottom

                lg:hidden
              "
              style={{
                mixBlendMode: 'normal',
              }}
            />

            {/* DESKTOP
              
            */}
            <img
              data-support-product
              src={PRODUCT_IMAGE}
              alt="Técnico realizando mantenimiento y soporte a impresora profesional"
              loading="lazy"
              decoding="async"
              className="
                absolute
                inset-0
                hidden
                h-full
                w-full
                object-cover
                object-center
                opacity-100
                will-change-transform

                lg:block
              "
            />

            <div
              className="
                absolute
                bottom-5
                left-5
                z-20
                drop-shadow-[0_4px_18px_rgba(0,0,0,0.38)]

                sm:bottom-6
                sm:left-6
              "
            >
              <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-white/78">
                IMPRESORAS / PLOTTERS
              </p>

              <p className="mt-2 text-[11px] leading-[1.55] text-white">
                Diagnóstico · mantenimiento · soporte
              </p>
            </div>
          </div>

          {/* EDITORIAL LIST */}
          <div
            className="
              flex
              flex-col

              lg:col-span-5
              lg:pl-2
            "
          >
            <div data-support-list className="border-t border-graphite-950/[0.10]">
              {SUPPORT_ITEMS.map((item) => (
                <article
                  key={item.label}
                  data-support-item
                  className="
                    border-b
                    border-graphite-950/[0.10]
                    py-7

                    sm:py-8

                    lg:py-9
                  "
                >
                  <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#2c49e5]">
                    {item.label}
                  </p>

                  <h3
                    className="
                      mt-4
                      max-w-[18ch]
                      text-[clamp(1.28rem,1.55vw,1.55rem)]
                      font-medium
                      leading-[1.07]
                      tracking-[-0.028em]
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className="
                      mt-3
                      max-w-[420px]
                      text-[13px]
                      leading-[1.62]
                      text-graphite-400

                      lg:text-[14px]
                    "
                  >
                    {item.description}
                  </p>
                </article>
              ))}
            </div>

            <a
              href={buildWhatsAppUrl('support')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  location: 'services',
                  context: 'support',
                  service: 'Soporte técnico',
                  label: 'Solicitar soporte',
                })
              }
              className="
                group
                relative
                mt-auto
                block
                border-y
                border-graphite-950/[0.12]
                py-6

                sm:py-7

                lg:mt-10
                lg:py-8
              "
            >
              <span
                className="
                  absolute
                  left-0
                  top-[-1px]
                  h-px
                  w-[72px]
                  bg-ppc-400
                  transition-[width]
                  duration-500
                  ease-out-expo

                  group-hover:w-full
                "
              />

              <div
                className="
                  grid
                  gap-5

                  sm:grid-cols-[1fr_auto]
                  sm:items-end
                "
              >
                <div>
                  <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#2c49e5]">
                    ATENCIÓN / WHATSAPP
                  </p>

                  <p
                    className="
                      mt-3
                      max-w-[360px]
                      text-[clamp(1.3rem,1.65vw,1.6rem)]
                      font-medium
                      leading-[1.06]
                      tracking-[-0.028em]
                      text-graphite-950
                      transition-colors
                      duration-300

                      group-hover:text-ppc-600
                    "
                  >
                    ¿Tu equipo necesita atención?
                  </p>

                  <p className="mt-2 text-[10px] leading-[1.55] text-graphite-500">
                    Cuéntanos qué equipo tienes y qué problema presenta para orientarte y definir el siguiente paso.
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[13px] font-medium text-graphite-950">
                  <span>Solicitar soporte</span>

                  <span
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      border
                      border-graphite-950/[0.16]
                      transition-all
                      duration-300

                      group-hover:border-graphite-950/[0.30]
                      group-hover:bg-graphite-950
                      group-hover:text-white
                    "
                  >
                    <ArrowUpRight
                      className="
                        h-4
                        w-4
                        transition-transform
                        duration-300

                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                      "
                    />
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between gap-5 border-t border-graphite-950/[0.10] pt-5">
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-graphite-400">
            SOPORTE TÉCNICO / HP / MANTENIMIENTO
          </span>

          <span className="h-2 w-2 bg-ppc-400" />
        </div>
      </div>
    </section>
  );
}