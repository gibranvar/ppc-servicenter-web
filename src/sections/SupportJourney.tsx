import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const POINTS = [
  {
    eyebrow: 'ANTES DE COMPRAR',
    title: 'Elige el equipo adecuado.',
    description:
      'Te ayudamos a elegir la impresora o plotter adecuado según el tipo de trabajo, volumen de impresión y necesidades de tu empresa.',
  },
  {
    eyebrow: 'PUESTA EN MARCHA',
    title: 'Instalación lista para operar.',
    description:
      'Realizamos instalación, configuración y puesta en marcha de impresoras y plotters para integrarlos correctamente a tu operación.',
  },
  {
    eyebrow: 'DURANTE LA OPERACIÓN',
    title: 'Mantenimiento para seguir operando.',
    description:
      'Mantenimiento preventivo y correctivo para conservar el rendimiento de impresoras y plotters, prevenir fallas y reducir interrupciones.',
  },
  {
    eyebrow: 'CUANDO HAY UNA FALLA',
    title: 'Soporte para recuperar la operación.',
    description:
      'Diagnóstico y soporte técnico para resolver fallas en impresoras y plotters y reducir el tiempo fuera de servicio.',
  },
] as const;

export default function WhyPPC() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-why-head] > *', {
          y: 18,
          opacity: 0,
          duration: 0.72,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-why-head]',
            start: 'top 82%',
          },
        });

        gsap.from('[data-why-copy]', {
          y: 20,
          opacity: 0,
          duration: 0.75,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-why-system]',
            start: 'top 78%',
          },
        });

        gsap.from('[data-core]', {
          scale: 0.94,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-why-system]',
            start: 'top 78%',
          },
        });

        gsap.to('[data-ring-a]', {
          rotation: 360,
          duration: 34,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center center',
        });

        gsap.to('[data-ring-b]', {
          rotation: -360,
          duration: 46,
          repeat: -1,
          ease: 'none',
          transformOrigin: 'center center',
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="por-que-ppc"
      className="
        relative
        overflow-hidden
        border-b
        border-white/[0.10]
        bg-black
        text-white
      "
    >
      <div className="container-page py-20 sm:py-24 lg:py-28 xl:py-30">
        {/* ==================================================
            HEADER
            Misma escala de H2 que el resto de la home.
        ================================================== */}
        <div data-why-head className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/[0.42] sm:text-[11px]">
            PPC / ACOMPAÑAMIENTO + CONTINUIDAD
          </p>

          <h2
            className="
              mx-auto
              mt-4
              max-w-[720px]
              text-[clamp(1.8rem,3.2vw,2.8rem)]
              font-medium
              leading-[1.04]
              tracking-[-0.04em]
            "
          >
            Servicio antes y después
            <span className="block text-white/[0.46]">
              de la compra.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[590px]
              text-[14px]
              leading-[1.65]
              text-white/[0.56]

              sm:text-[15px]
            "
          >
            Desde la elección del equipo hasta su instalación, mantenimiento y soporte técnico, PPC acompaña a tu empresa para mantener impresoras y plotters funcionando antes y después de la compra.
          </p>
        </div>

        {/* ==================================================
            DESKTOP / TABLET
            Composición central, inspirada en la lógica de NAKA:
            gráfico en el centro + información alrededor.
            Sin cards, timelines ni retículas de beneficios.
        ================================================== */}
        <div
          data-why-system
          className="
            relative
            mt-14
            hidden
            min-h-[610px]
            border-y
            border-white/[0.10]

            lg:grid
            lg:min-h-[650px]
            lg:grid-cols-[minmax(0,1fr)_minmax(340px,430px)_minmax(0,1fr)]
            lg:grid-rows-2
            lg:gap-x-14
            lg:py-14
          "
        >
          {/* LEFT TOP */}
          <article
            data-why-copy
            className="
              flex
              max-w-[310px]
              flex-col
              justify-center
              self-stretch
              border-b
              border-white/[0.10]
              pr-6

              lg:pr-10
            "
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#2c49e5]">
              {POINTS[0].eyebrow}
            </p>

            <h3 className="mt-4 text-[clamp(1.35rem,1.6vw,1.65rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {POINTS[0].title}
            </h3>

            <p className="mt-3 text-[13px] leading-[1.62] text-white/[0.56] lg:text-[14px]">
              {POINTS[0].description}
            </p>
          </article>

          {/* RIGHT TOP */}
          <article
            data-why-copy
            className="
              col-start-3
              row-start-1
              ml-auto
              flex
              max-w-[310px]
              flex-col
              justify-center
              self-stretch
              border-b
              border-white/[0.10]
              pl-6

              lg:pl-10
            "
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#2c49e5]">
              {POINTS[1].eyebrow}
            </p>

            <h3 className="mt-4 text-[clamp(1.35rem,1.6vw,1.65rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {POINTS[1].title}
            </h3>

            <p className="mt-3 text-[13px] leading-[1.62] text-white/[0.56] lg:text-[14px]">
              {POINTS[1].description}
            </p>
          </article>

          {/* LEFT BOTTOM */}
          <article
            data-why-copy
            className="
              row-start-2
              flex
              max-w-[310px]
              flex-col
              justify-center
              self-stretch
              pr-6

              lg:pr-10
            "
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#2c49e5]">
              {POINTS[2].eyebrow}
            </p>

            <h3 className="mt-4 text-[clamp(1.35rem,1.6vw,1.65rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {POINTS[2].title}
            </h3>

            <p className="mt-3 text-[13px] leading-[1.62] text-white/[0.56] lg:text-[14px]">
              {POINTS[2].description}
            </p>
          </article>

          {/* RIGHT BOTTOM */}
          <article
            data-why-copy
            className="
              col-start-3
              row-start-2
              ml-auto
              flex
              max-w-[310px]
              flex-col
              justify-center
              self-stretch
              pl-6

              lg:pl-10
            "
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#2c49e5]">
              {POINTS[3].eyebrow}
            </p>

            <h3 className="mt-4 text-[clamp(1.35rem,1.6vw,1.65rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {POINTS[3].title}
            </h3>

            <p className="mt-3 text-[13px] leading-[1.62] text-white/[0.56] lg:text-[14px]">
              {POINTS[3].description}
            </p>
          </article>

          {/* ==================================================
              CENTRAL SYSTEM
          ================================================== */}
          <div
            data-core
            className="
              relative
              col-start-2
              row-span-2
              row-start-1
              flex
              items-center
              justify-center
            "
          >
            <div
              className="
                relative
                aspect-square
                w-full
                max-w-[390px]

                lg:max-w-[430px]
              "
            >
              {/* very light construction lines */}
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.07]" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/[0.07]" />

              {/* Rings */}
              <div
                data-ring-a
                className="
                  absolute
                  inset-[8%]
                  rounded-full
                  border
                  border-dashed
                  border-white/[0.26]
                "
              >
                <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 bg-ppc-500" />
                <span className="absolute bottom-[-4px] right-[24%] h-2 w-2 bg-white/[0.24]" />
              </div>

              <div
                data-ring-b
                className="
                  absolute
                  inset-[22%]
                  rounded-full
                  border
                  border-white/[0.20]
                "
              >
                <span className="absolute right-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 bg-ppc-500" />
              </div>

              <div
                className="
                  absolute
                  inset-[35%]
                  rounded-full
                  border
                  border-ppc-500/50
                  bg-ppc-500/[0.035]
                "
              />

              {/* Core */}
              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  flex
                  h-[92px]
                  w-[92px]
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  border
                  border-white/[0.16]
                  bg-white/[0.055]
                  shadow-[0_18px_60px_rgba(0,0,0,0.34)]

                  lg:h-[104px]
                  lg:w-[104px]
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
                    text-[11px]
                    font-semibold
                    tracking-[-0.02em]
                    text-graphite-950

                    lg:h-14
                    lg:w-14
                    lg:text-[12px]
                  "
                >
                  PPC
                </div>

                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-ppc-500" />
              </div>

              {/* perimeter labels */}
              <span className="absolute left-1/2 top-[3%] -translate-x-1/2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.32]">
                EQUIPO
              </span>
              <span className="absolute right-[2%] top-1/2 -translate-y-1/2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.32]">
                INSTALACIÓN
              </span>
              <span className="absolute bottom-[3%] left-1/2 -translate-x-1/2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.32]">
                SOPORTE
              </span>
              <span className="absolute left-[1%] top-1/2 -translate-y-1/2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.32]">
                SERVICIO
              </span>
            </div>
          </div>
        </div>

        {/* ==================================================
            TABLET
            Composición propia 768–1023px:
            sistema central arriba + cuatro puntos en 2×2.
            Evita comprimir tres columnas como en desktop.
        ================================================== */}
        <div
          className="
            mt-14
            hidden
            border-y
            border-white/[0.10]
            py-10

            md:block
            lg:hidden
          "
        >
          <div
            data-core
            className="
              relative
              mx-auto
              aspect-square
              w-[min(44vw,350px)]
            "
          >
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.07]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/[0.07]" />

            <div
              data-ring-a
              className="absolute inset-[8%] rounded-full border border-dashed border-white/[0.26]"
            >
              <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 bg-ppc-500" />
              <span className="absolute bottom-[-4px] right-[24%] h-2 w-2 bg-white/[0.24]" />
            </div>

            <div
              data-ring-b
              className="absolute inset-[22%] rounded-full border border-white/[0.20]"
            >
              <span className="absolute right-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 bg-ppc-500" />
            </div>

            <div className="absolute inset-[35%] rounded-full border border-ppc-500/60 bg-ppc-500/[0.08]" />

            <div
              className="
                absolute
                left-1/2
                top-1/2
                flex
                h-[94px]
                w-[94px]
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                border
                border-white/[0.16]
                bg-white/[0.055]
                shadow-[0_18px_55px_rgba(0,0,0,0.34)]
              "
            >
              <div className="flex h-12 w-12 items-center justify-center bg-white text-[11px] font-semibold text-graphite-950">
                PPC
              </div>

              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-ppc-500" />
            </div>

            <span className="absolute left-1/2 top-[3%] -translate-x-1/2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.32]">
              EQUIPO
            </span>
            <span className="absolute right-[2%] top-1/2 -translate-y-1/2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.32]">
              INSTALACIÓN
            </span>
            <span className="absolute bottom-[3%] left-1/2 -translate-x-1/2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.32]">
              SOPORTE
            </span>
            <span className="absolute left-[1%] top-1/2 -translate-y-1/2 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.32]">
              SERVICIO
            </span>
          </div>

          <div
            className="
              mt-10
              grid
              grid-cols-2
              border-t
              border-white/[0.10]
            "
          >
            {POINTS.map((point, index) => (
              <article
                key={point.title}
                data-why-copy
                className={`
                  min-h-[220px]
                  py-7

                  ${index % 2 === 0 ? 'pr-7' : 'border-l border-white/[0.10] pl-7'}
                  ${index < 2 ? 'border-b border-white/[0.10]' : ''}
                `}
              >
                <p className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#2c49e5]">
                  {point.eyebrow}
                </p>

                <h3
                  className="
                    mt-4
                    max-w-[14ch]
                    text-[1.38rem]
                    font-medium
                    leading-[1.06]
                    tracking-[-0.03em]
                  "
                >
                  {point.title}
                </h3>

                <p
                  className="
                    mt-3
                    max-w-[300px]
                    text-[13px]
                    leading-[1.62]
                    text-white/[0.56]
                  "
                >
                  {point.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ==================================================
            MOBILE
            El sistema visual permanece y los textos se exploran
            horizontalmente. No cards apiladas.
        ================================================== */}
        <div className="mt-11 md:hidden">
          <div
            data-core
            className="
              relative
              mx-auto
              aspect-square
              w-[82vw]
              max-w-[320px]
            "
          >
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.07]" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-white/[0.07]" />

            <div
              data-ring-a
              className="absolute inset-[8%] rounded-full border border-dashed border-white/[0.26]"
            >
              <span className="absolute left-1/2 top-[-4px] h-2 w-2 -translate-x-1/2 bg-ppc-500" />
            </div>

            <div
              data-ring-b
              className="absolute inset-[22%] rounded-full border border-white/[0.20]"
            >
              <span className="absolute right-[-4px] top-1/2 h-2 w-2 -translate-y-1/2 bg-ppc-500" />
            </div>

            <div className="absolute inset-[35%] rounded-full border border-ppc-500/60 bg-ppc-500/[0.08]" />

            <div
              className="
                absolute
                left-1/2
                top-1/2
                flex
                h-[86px]
                w-[86px]
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                border
                border-white/[0.16]
                bg-white/[0.055]
                shadow-[0_18px_50px_rgba(0,0,0,0.34)]
              "
            >
              <div className="flex h-11 w-11 items-center justify-center bg-white text-[10px] font-semibold text-graphite-950">
                PPC
              </div>

              <span className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-ppc-500" />
            </div>

            {/* perimeter labels / mobile */}
            <span className="absolute left-1/2 top-[2%] -translate-x-1/2 whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.12em] text-white/[0.45]">
              EQUIPO
            </span>

            <span className="absolute right-[-1%] top-1/2 -translate-y-1/2 whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.12em] text-white/[0.45]">
              INSTALACIÓN
            </span>

            <span className="absolute bottom-[2%] left-1/2 -translate-x-1/2 whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.12em] text-white/[0.45]">
              SOPORTE
            </span>

            <span className="absolute left-[-1%] top-1/2 -translate-y-1/2 whitespace-nowrap text-[7px] font-semibold uppercase tracking-[0.12em] text-white/[0.45]">
              SERVICIO
            </span>
          </div>

          <div className="relative -mx-[var(--page-gutter)] mt-8">
            <div
              className="
                flex
                snap-x
                snap-mandatory
                overflow-x-auto
                px-[var(--page-gutter)]
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {POINTS.map((point) => (
                <article
                  key={point.title}
                  data-why-copy
                  className="
                    w-[78vw]
                    max-w-[315px]
                    shrink-0
                    snap-start
                    border-l
                    border-white/[0.20]
                    pr-8
                    pl-5

                    sm:w-[58vw]
                  "
                >
                  <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#2c49e5]">
                    {point.eyebrow}
                  </p>

                  <h3 className="mt-4 text-[1.45rem] font-medium leading-[1.05] tracking-[-0.03em]">
                    {point.title}
                  </h3>

                  <p className="mt-3 text-[14px] leading-[1.62] text-white/[0.56]">
                    {point.description}
                  </p>
                </article>
              ))}

              <div aria-hidden="true" className="w-[var(--page-gutter)] shrink-0" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-5 border-t border-white/[0.10] pt-5">
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/[0.36]">
            VENTA / INSTALACIÓN / MANTENIMIENTO / SOPORTE
          </span>

          <span className="h-2 w-2 bg-ppc-500" />
        </div>
      </div>
    </section>
  );
}