import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Assets temporales para maquetación.
 * Para producción conviene sustituirlos por material autorizado
 * entregado por PPC / fabricante y servirlo desde /public.
 */
const PLOTTER_IMAGE =
  'https://www.framuntechno.com/wp-content/uploads/2024/01/tipos-de-plotters-para-impresion-y-corte-Roland-en-Framun-Techno.png.webp';

const INK_IMAGE =
  'https://live.staticflickr.com/65535/55471543988_e71aac4867_b.jpg';

const PRINTER_IMAGE =
  'https://live.staticflickr.com/65535/55471415981_75d1016904_b.jpg';
  
export default function Equipment() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-equipment-head] > *', {
          y: 18,
          opacity: 0,
          duration: 0.72,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-equipment-head]',
            start: 'top 82%',
          },
        });

        gsap.from('[data-equipment-main]', {
          y: 24,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-equipment-layout]',
            start: 'top 80%',
          },
        });

        gsap.from('[data-equipment-side]', {
          x: 24,
          opacity: 0,
          duration: 0.78,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-equipment-layout]',
            start: 'top 79%',
          },
        });

        gsap.from('[data-equipment-rule]', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.9,
          stagger: 0.08,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '[data-equipment-layout]',
            start: 'top 81%',
          },
        });
      });

      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          gsap.to('[data-plotter-visual]', {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-equipment-layout]',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });

          gsap.to('[data-ink-visual]', {
            yPercent: -4,
            ease: 'none',
            scrollTrigger: {
              trigger: '[data-equipment-layout]',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.1,
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
      id="equipos"
      className="
        relative
        overflow-hidden
        border-b
        border-graphite-950/10
        bg-paper-50
        text-graphite-950
      "
    >
      <div className="container-page py-20 sm:py-24 lg:py-28 xl:py-30">
      
        <div
          data-equipment-head
          className="
            grid
            gap-7
            border-b
            border-graphite-950/10
            pb-10

            lg:grid-cols-12
            lg:gap-10
            lg:pb-12
          "
        >
          <div className="lg:col-span-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-graphite-400 sm:text-[11px]">
              PPC / EQUIPOS, INSUMOS Y PAPELERÍA
            </p>
          </div>

          <div className="lg:col-span-9">
            <h2
              className="
                max-w-[690px]
                text-[clamp(1.8rem,3.2vw,2.8rem)]
                font-medium
                leading-[1.04]
                tracking-[-0.04em]
              "
            >
              Plotters, impresoras, insumos
              <span className="block text-graphite-400">
                y papelería para empresas.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[600px]
                text-[14px]
                leading-[1.65]
                text-graphite-600

                sm:text-[15px]

                lg:mt-6
              "
            >
              Equipos de impresión, plotters, impresoras, consumibles y papelería para distintas necesidades de operación. Te ayudamos a elegir y cotizar la opción adecuada según el uso, volumen de trabajo y requerimientos de tu empresa.
            </p>
          </div>
        </div>

      
        <div
          data-equipment-layout
          className="
            grid
            border-b
            border-graphite-950/10

            lg:grid-cols-12
          "
        >
          
          <article
            data-equipment-main
            className="
              group
              relative
              border-b
              border-graphite-950/10
              py-10

              sm:py-12

              lg:col-span-7
              lg:border-b-0
              lg:border-r
              lg:pr-12
              lg:py-14

              xl:pr-14
            "
          >
            <div className="absolute inset-x-0 top-0 h-px bg-graphite-950/10">
              <div
                data-equipment-rule
                className="
                  h-px
                  w-[96px]
                  bg-ppc-500
                  transition-[width]
                  duration-500

                  group-hover:w-[150px]
                "
              />
            </div>

            <div className="flex items-center justify-between gap-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ppc-600">
                PLOTTERS / GRAN FORMATO
              </p>

              <span className="text-[9px] font-medium tracking-[0.14em] text-graphite-300">
                01
              </span>
            </div>

            <div
              className="
                relative
                mt-8
                h-[320px]
                overflow-hidden

                sm:h-[390px]

                lg:mt-10
                lg:h-[470px]
              "
            >
              {/* planos técnicos, no card */}
              <div
                className="
                  absolute
                  inset-x-[5%]
                  bottom-[16%]
                  h-[46%]
                  border
                  border-graphite-950/[0.08]
                  bg-ppc-50
                "
                style={{
                  clipPath: 'polygon(8% 0, 100% 0, 92% 100%, 0 100%)',
                }}
              />

              <div
                className="
                  absolute
                  inset-x-[13%]
                  bottom-[8%]
                  h-[28%]
                  border
                  border-graphite-950/[0.07]
                  bg-white/70
                "
                style={{
                  clipPath: 'polygon(7% 0, 100% 0, 93% 100%, 0 100%)',
                }}
              />

              <div className="absolute bottom-[15%] left-[6%] right-[6%] h-px bg-graphite-950/10" />
              <div className="absolute bottom-[23%] left-[18%] h-px w-[48%] bg-ppc-500/55" />
              <span className="absolute bottom-[21.8%] left-[18%] h-2 w-2 bg-ppc-500" />

              <div
                className="
                  absolute
                  bottom-[4%]
                  left-1/2
                  h-[8%]
                  w-[48%]
                  -translate-x-1/2
                  rounded-[50%]
                  bg-graphite-950/12
                  blur-[24px]
                "
              />

              <img
                data-plotter-visual
                src={PLOTTER_IMAGE}
                alt="Plotter profesional para impresión de gran formato"
                loading="lazy"
                decoding="async"
                className="
                  absolute
                  bottom-[-7%]
                  left-1/2
                  h-[116%]
                  w-[120%]
                  max-w-none
                  -translate-x-1/2
                  object-contain
                  object-center
                  transition-transform
                  duration-700
                  will-change-transform

                  group-hover:scale-[1.012]

                  sm:w-[112%]

                  lg:h-[120%]
                  lg:w-[108%]
                "
                style={{
                  mixBlendMode: 'multiply',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 72% 80% at 52% 54%, #000 56%, rgba(0,0,0,.96) 69%, rgba(0,0,0,.46) 84%, transparent 98%)',
                  maskImage:
                    'radial-gradient(ellipse 72% 80% at 52% 54%, #000 56%, rgba(0,0,0,.96) 69%, rgba(0,0,0,.46) 84%, transparent 98%)',
                }}
              />

            </div>

            <div
              className="
                mt-8
                grid
                gap-5
                border-t
                border-graphite-950/10
                pt-6

                sm:grid-cols-[1fr_auto]
                sm:items-end

                lg:mt-9
              "
            >
              <div>
                <h3
                  className="
                    max-w-[16ch]
                    text-[clamp(1.5rem,1.9vw,1.85rem)]
                    font-medium
                    leading-[1.05]
                    tracking-[-0.03em]
                  "
                >
                  Plotters.
                </h3>

                <p
                  className="
                    mt-3
                    max-w-[500px]
                    text-[14px]
                    leading-[1.62]
                    text-graphite-600
                  "
                >
                  Equipos para impresión de gran formato, producción gráfica y aplicaciones profesionales.
                </p>
              </div>

              <a
                href={buildWhatsAppUrl('printing')}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick({
                    location: 'services',
                    context: 'printing',
                    service: 'Plotters',
                    label: 'Cotizar plotter',
                  })
                }
                className="
                  group/link
                  inline-flex
                  w-fit
                  items-center
                  gap-2.5
                  text-[13px]
                  font-medium
                  text-graphite-950
                  transition-colors

                  hover:text-ppc-600
                "
              >
                Cotizar plotter

                <ArrowUpRight
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300

                    group-hover/link:translate-x-0.5
                    group-hover/link:-translate-y-0.5
                  "
                />
              </a>
            </div>
          </article>

        
          <div
            className="
              lg:col-span-5
              lg:pl-12

              xl:pl-14
            "
          >
            {/* IMPRESORAS */}
            <article
              data-equipment-side
              className="
                group
                relative
                grid
                gap-7
                border-b
                border-graphite-950/10
                py-10

                sm:grid-cols-[1fr_180px]
                sm:items-center
                sm:py-12

                lg:min-h-[50%]
                lg:grid-cols-[1fr_150px]
                lg:py-14

                xl:grid-cols-[1fr_170px]
              "
            >
              <div className="absolute inset-x-0 top-0 h-px bg-graphite-950/10">
                <div
                  data-equipment-rule
                  className="h-px w-[64px] bg-ppc-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ppc-600">
                    IMPRESORAS
                  </p>

                  <span className="text-[9px] font-medium tracking-[0.14em] text-graphite-300">
                    02
                  </span>
                </div>

                <h3
                  className="
                    mt-7
                    max-w-[13ch]
                    text-[clamp(1.35rem,1.65vw,1.6rem)]
                    font-medium
                    leading-[1.06]
                    tracking-[-0.028em]
                  "
                >
                  Impresoras
                </h3>

                <p className="mt-3 max-w-[330px] text-[13px] leading-[1.6] text-graphite-600 lg:text-[14px]">
                  Equipos para oficinas y entornos de trabajo que requieren rendimiento y continuidad.
                </p>

                <a
                  href={buildWhatsAppUrl('printing')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick({
                      location: 'services',
                      context: 'printing',
                      service: 'Impresoras',
                      label: 'Cotizar impresora',
                    })
                  }
                  className="
                    group/link
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    text-[12px]
                    font-medium
                    text-graphite-950
                    transition-colors

                    hover:text-ppc-600
                  "
                >
                  Cotizar impresora

                  <ArrowUpRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300

                      group-hover/link:translate-x-0.5
                      group-hover/link:-translate-y-0.5
                    "
                  />
                </a>
              </div>

              {/* visual lineal de impresora */}
              <div
                className="
                  relative
                  mx-auto
                  h-[150px]
                  w-full
                  max-w-[180px]

                  lg:h-[170px]
                "
              >
                <img
                data-plotter-visual
                src={PRINTER_IMAGE}
                alt="Impresora profesional para oficina y entorno empresarial"
                loading="lazy"
                decoding="async"
                className="
                  absolute
                  bottom-[-7%]
                  left-1/2
                  h-[116%]
                  w-[120%]
                  max-w-none
                  -translate-x-1/2
                  object-contain
                  object-center
                  transition-transform
                  duration-700
                  will-change-transform

                  group-hover:scale-[1.012]

                  sm:w-[112%]

                  lg:h-[120%]
                  lg:w-[108%]
                "
                style={{
                  mixBlendMode: 'multiply',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 72% 80% at 52% 54%, #000 56%, rgba(0,0,0,.96) 69%, rgba(0,0,0,.46) 84%, transparent 98%)',
                  maskImage:
                    'radial-gradient(ellipse 72% 80% at 52% 54%, #000 56%, rgba(0,0,0,.96) 69%, rgba(0,0,0,.46) 84%, transparent 98%)',
                }}
              />

                <div className="absolute bottom-[18%] left-[8%] right-[8%] h-px bg-graphite-950/10" />
              </div>
            </article>

            {/* INSUMOS */}
            <article
              data-equipment-side
              className="
                group
                relative
                grid
                gap-7
                py-10

                sm:grid-cols-[1fr_180px]
                sm:items-center
                sm:py-12

                lg:min-h-[50%]
                lg:grid-cols-[1fr_150px]
                lg:py-14

                xl:grid-cols-[1fr_170px]
              "
            >
              <div className="absolute inset-x-0 top-0 h-px bg-graphite-950/10">
                <div
                  data-equipment-rule
                  className="h-px w-[64px] bg-ppc-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ppc-600">
                    INSUMOS + PAPELERÍA
                  </p>

                  <span className="text-[9px] font-medium tracking-[0.14em] text-graphite-300">
                    03
                  </span>
                </div>

                <h3
                  className="
                    mt-7
                    max-w-[13ch]
                    text-[clamp(1.35rem,1.65vw,1.6rem)]
                    font-medium
                    leading-[1.06]
                    tracking-[-0.028em]
                  "
                >
                  Insumos y papelería para oficina.
                </h3>

                <p className="mt-3 max-w-[330px] text-[13px] leading-[1.6] text-graphite-600 lg:text-[14px]">
                  Tintas, consumibles, suministros y papelería para mantener tu operación y trabajo diario abastecidos.
                </p>

                <a
                  href={buildWhatsAppUrl('printing')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick({
                      location: 'services',
                      context: 'printing',
                      service: 'Insumos',
                      label: 'Cotizar insumos',
                    })
                  }
                  className="
                    group/link
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    text-[12px]
                    font-medium
                    text-graphite-950
                    transition-colors

                    hover:text-ppc-600
                  "
                >
                  Cotizar insumos y papelería

                  <ArrowUpRight
                    className="
                      h-4
                      w-4
                      transition-transform
                      duration-300

                      group-hover/link:translate-x-0.5
                      group-hover/link:-translate-y-0.5
                    "
                  />
                </a>
              </div>

              <div
                className="
                  relative
                  mx-auto
                  h-[150px]
                  w-full
                  max-w-[180px]
                  overflow-hidden

                  lg:h-[170px]
                "
              >
                <img
                  data-ink-visual
                  src={INK_IMAGE}
                  alt="Cartuchos de tinta y consumibles para impresoras"
                  loading="lazy"
                  decoding="async"
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-[88%]
                    w-[120%]
                    max-w-none
                    -translate-x-1/2
                    -translate-y-1/2
                    object-contain
                    object-center
                    transition-transform
                    duration-700
                    will-change-transform

                    group-hover:scale-[1.02]
                  "
                  style={{
                    mixBlendMode: 'multiply',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 64% 72% at 50% 50%, #000 54%, rgba(0,0,0,.9) 70%, rgba(0,0,0,.32) 84%, transparent 98%)',
                    maskImage:
                      'radial-gradient(ellipse 64% 72% at 50% 50%, #000 54%, rgba(0,0,0,.9) 70%, rgba(0,0,0,.32) 84%, transparent 98%)',
                  }}
                />

                <div className="absolute bottom-[18%] left-[8%] right-[8%] h-px bg-graphite-950/10" />
              </div>
            </article>
          </div>
        </div>

        {/* ==================================================
            CLOSING NOTE
        ================================================== */}
        <div
          className="
            flex
            flex-col
            gap-3
            pt-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-graphite-400">
            PLOTTERS / IMPRESORAS / INSUMOS / PAPELERÍA
          </span>

          <span className="text-[11px] text-graphite-500">
            ¿No sabes qué equipo necesitas? Te ayudamos a cotizarlo.
          </span>
        </div>
      </div>
    </section>
  );
}