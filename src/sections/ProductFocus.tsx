import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProductFocus() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-focus-copy] > *', {
          y: 18,
          opacity: 0,
          duration: 0.72,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-focus-copy]',
            start: 'top 82%',
          },
        });

        gsap.from('[data-focus-frame]', {
          scale: 0.96,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-focus-system]',
            start: 'top 80%',
          },
        });

        gsap.from('[data-focus-line]', {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: '[data-focus-system]',
            start: 'top 80%',
          },
        });

        gsap.from('[data-focus-node]', {
          scale: 0,
          opacity: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '[data-focus-system]',
            start: 'top 80%',
          },
        });

        gsap.to('[data-focus-pulse]', {
          scale: 1.55,
          opacity: 0.08,
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
      id="soluciones"
      className="
        relative
        overflow-hidden
        bg-graphite-950
        text-white
      "
    >
      <div className="container-page py-20 sm:py-24 lg:py-28 xl:py-30">
        <div
          className="
            grid
            gap-12

            lg:grid-cols-12
            lg:items-center
            lg:gap-14

            xl:gap-18
          "
        >
          
          <div
            data-focus-system
            className="
              relative
              order-2
              min-h-[360px]
              overflow-hidden
              border-y
              border-white/[0.10]

              sm:min-h-[410px]

              lg:order-1
              lg:col-span-6
              lg:min-h-[500px]
            "
          >
            {/* marco principal */}
            <div
              data-focus-frame
              className="
                absolute
                left-1/2
                top-1/2
                h-[68%]
                w-[76%]
                -translate-x-1/2
                -translate-y-1/2
                border
                border-white/[0.12]
              "
            >
              <div className="absolute inset-[10%] border border-white/[0.07]" />
              <div className="absolute inset-[22%] border border-white/[0.06]" />
            </div>

            {/* eje horizontal */}
            <div
              data-focus-line
              className="
                absolute
                left-[8%]
                right-[8%]
                top-1/2
                h-px
                bg-white/[0.14]
              "
            />

            {/* eje vertical */}
            <div
              className="
                absolute
                left-1/2
                top-[12%]
                bottom-[12%]
                w-px
                -translate-x-1/2
                bg-white/[0.06]
              "
            />

            {/* rutas superiores / inferiores */}
            <div
              data-focus-line
              className="
                absolute
                left-[18%]
                top-[32%]
                h-px
                w-[32%]
                bg-ppc-400/55
              "
            />

            <div
              data-focus-line
              className="
                bottom-[31%]
                right-[18%]
                absolute
                h-px
                w-[32%]
                bg-ppc-400/55
              "
            />

            {/* núcleo PPC */}
            <div
              data-focus-frame
              className="
                absolute
                left-1/2
                top-1/2
                z-20
                flex
                h-[96px]
                w-[96px]
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                border
                border-white/[0.16]
                bg-graphite-950
                shadow-[0_22px_70px_rgba(0,0,0,0.45)]

                sm:h-[108px]
                sm:w-[108px]
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  bg-white
                  text-[10px]
                  font-semibold
                  tracking-[-0.02em]
                  text-graphite-950

                  sm:h-14
                  sm:w-14
                  sm:text-[11px]
                "
              >
                PPC
              </div>

              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-ppc-400" />
              <span
                data-focus-pulse
                className="absolute inset-[-18px] border border-ppc-400/24"
              />
            </div>

            {/* nodos laterales */}
            <span
              data-focus-node
              className="
                absolute
                left-[17%]
                top-1/2
                h-2.5
                w-2.5
                -translate-y-1/2
                bg-ppc-400
              "
            />
            <span
              data-focus-node
              className="
                absolute
                right-[17%]
                top-1/2
                h-2.5
                w-2.5
                -translate-y-1/2
                bg-ppc-400
              "
            />
            <span
              data-focus-node
              className="
                absolute
                left-[18%]
                top-[30.8%]
                h-2
                w-2
                bg-white/[0.30]
              "
            />
            <span
              data-focus-node
              className="
                absolute
                bottom-[29.8%]
                right-[18%]
                h-2
                w-2
                bg-white/[0.30]
              "
            />

            {/* labels */}
            <p
              className="
                absolute
                left-[8%]
                top-[43%]
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-white/[0.28]
              "
            >
              EQUIPO
            </p>

            <p
              className="
                absolute
                right-[8%]
                top-[43%]
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-white/[0.28]
              "
            >
              SOPORTE
            </p>

            <p
              className="
                absolute
                left-[18%]
                top-[24%]
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-white/[0.22]
              "
            >
              IMPRESIÓN
            </p>

            <p
              className="
                absolute
                bottom-[23%]
                right-[18%]
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-white/[0.22]
              "
            >
              CONTINUIDAD
            </p>
          </div>

         
          <div
            data-focus-copy
            className="
              order-1

              lg:order-2
              lg:col-span-5
              lg:col-start-8
            "
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/[0.42] sm:text-[11px]">
              PPC / QUÉ HACEMOS
            </p>

            <h2
              className="
                mt-4
                max-w-[610px]
                text-[clamp(1.8rem,3.2vw,2.8rem)]
                font-medium
                leading-[1.04]
                tracking-[-0.04em]
              "
            >
              Equipo cuando lo necesitas.
              <span className="block text-white/[0.44]">
                Soporte cuando importa.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[530px]
                text-[14px]
                leading-[1.65]
                text-white/[0.50]

                sm:text-[15px]
              "
            >
             Desde la selección de plotters, impresoras, insumos y papelería para oficina hasta su instalación, mantenimiento y soporte técnico, PPC acompaña a empresas en CDMX, zona centro y otras regiones de México antes y después de la compra.
            </p>

            <div className="mt-9 border-t border-white/[0.11]">
              <div
                id="plotters"
                className="
                  grid
                  gap-3
                  border-b
                  border-white/[0.11]
                  py-6

                  sm:grid-cols-[120px_1fr]
                  sm:gap-6
                "
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ppc-300">
                  Venta de equipos
                </p>

                <div>
                  <h3 className="text-[1.3rem] font-medium leading-[1.07] tracking-[-0.028em]">
                    Plotters, impresoras, insumos y papelería para oficina, con orientación para elegir la opción adecuada según las necesidades de tu empresa.
                  </h3>

                  <a
                    href={buildWhatsAppUrl('printing')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick({
                        location: 'product-focus',
                        context: 'printing',
                        service: 'Venta',
                        label: 'Cotizar equipo',
                      })
                    }
                    className="
                      group
                      mt-3
                      inline-flex
                      items-center
                      gap-2
                      text-[12px]
                      font-medium
                      text-white/[0.62]
                      transition-colors
                      duration-300

                      hover:text-white
                    "
                  >
                    Cotizar equipo

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
                  </a>
                </div>
              </div>

              <div
                className="
                  grid
                  gap-3
                  border-b
                  border-white/[0.11]
                  py-6

                  sm:grid-cols-[120px_1fr]
                  sm:gap-6
                "
              >
                <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ppc-300">
                  Soporte técnico 
                </p>

                <div>
                  <h3 className="text-[1.3rem] font-medium leading-[1.07] tracking-[-0.028em]">
                    Diagnóstico, mantenimiento y atención técnica para mantener tus equipos trabajando y reducir tiempos de inactividad.
                  </h3>

                  <a
                    href={buildWhatsAppUrl('support')}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick({
                        location: 'product-focus',
                        context: 'support',
                        service: 'Soporte',
                        label: 'Solicitar soporte',
                      })
                    }
                    className="
                      group
                      mt-3
                      inline-flex
                      items-center
                      gap-2
                      text-[12px]
                      font-medium
                      text-white/[0.62]
                      transition-colors
                      duration-300

                      hover:text-white
                    "
                  >
                    Solicitar soporte

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
                  </a>
                </div>
              </div>
            </div>

            <p
              className="
                mt-5
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-white/[0.24]
              "
            >
              VENTA + SOPORTE TÉCNICO
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}