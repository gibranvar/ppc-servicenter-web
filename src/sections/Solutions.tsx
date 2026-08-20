import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const CAPABILITIES = [
  {
    label: 'CÓMPUTO',
    title: 'Equipos para trabajo diario.',
    description:
      'Configuración y soporte de redes para mantener equipos, usuarios y servicios comunicados.',
  },
  {
    label: 'REDES',
    title: 'Conectividad para la operación.',
    description:
      'Configuración y soporte de redes para mantener equipos, usuarios y servicios comunicados.',
  },
  {
    label: 'INFRAESTRUCTURA',
    title: 'La capa que conecta todo.',
    description:
      'Implementación y soporte de infraestructura tecnológica para oficinas y espacios de trabajo.',
  },
  {
    label: 'CCTV',
    title: 'Visibilidad sobre el espacio.',
    description:
      'Soluciones de videovigilancia para supervisión, seguridad y control de instalaciones.',
  },
] as const;

export default function OtherSolutions() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-other-head] > *', {
          y: 18,
          opacity: 0,
          duration: 0.72,
          stagger: 0.07,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '[data-other-head]',
            start: 'top 82%',
          },
        });

        /*
         * MOTION — SISTEMA CENTRAL
         * Mismo lenguaje en desktop, tablet y mobile.
         * Sin parpadeos. El protagonismo está en el ensamblaje,
         * la profundidad y los recorridos de luz.
         */
        gsap.utils
          .toArray<HTMLElement>('[data-other-system]')
          .forEach((system) => {
            const scene = system.querySelector<HTMLElement>('[data-stack-scene]');
            const copies = system.querySelectorAll<HTMLElement>('[data-other-copy]');
            const layers = system.querySelectorAll<HTMLElement>('[data-stack-layer]');
            const scans = system.querySelectorAll<HTMLElement>('[data-layer-scan]');
            const axes = system.querySelectorAll<HTMLElement>('[data-system-axis]');
            const nodes = system.querySelectorAll<HTMLElement>('[data-node-pulse]');
            const marks = system.querySelectorAll<HTMLElement>('[data-other-mark]');

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: system,
                start: 'top 82%',
              },
              defaults: {
                ease: 'power3.out',
              },
            });

            /*
             * 01 — Entra el conjunto completo con profundidad.
             * No rebota ni hace zoom exagerado.
             */
            if (scene) {
              tl.from(
                scene,
                {
                  autoAlpha: 0,
                  y: 22,
                  scale: 0.975,
                  filter: 'blur(5px)',
                  duration: 1.05,
                  ease: 'power4.out',
                },
                0,
              );

              /*
               * Parallax editorial muy leve al hacer scroll.
               * Mantiene el sistema vivo sin "flotar".
               */
              gsap.fromTo(
                scene,
                { yPercent: 1.5 },
                {
                  yPercent: -1.5,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: system,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.1,
                  },
                },
              );
            }

            /*
             * 02 — Se construye el eje vertical.
             */
            if (axes.length) {
              tl.from(
                axes,
                {
                  scaleY: 0,
                  autoAlpha: 0,
                  transformOrigin: 'top center',
                  duration: 0.9,
                  stagger: 0.06,
                  ease: 'power4.inOut',
                },
                0.08,
              );
            }

            /*
             * 03 — Las capas aparecen como planos técnicos.
             * El reveal va alternando dirección para dar profundidad.
             */
            if (layers.length) {
              layers.forEach((layer, index) => {
                const fromRight = index % 2 !== 0;

                gsap.set(layer, {
                  clipPath: fromRight
                    ? 'inset(0 0 0 100%)'
                    : 'inset(0 100% 0 0)',
                  autoAlpha: 0,
                  filter: 'brightness(1.35)',
                });

                tl.to(
                  layer,
                  {
                    clipPath: 'inset(0 0% 0 0%)',
                    autoAlpha: 1,
                    filter: 'brightness(1)',
                    duration: 0.92,
                    ease: 'power4.inOut',
                  },
                  0.18 + index * 0.10,
                );
              });
            }

            /*
             * 04 — Nodos aparecen como puntos de conexión.
             * Solo una vez; después se quedan quietos.
             */
            if (nodes.length) {
              tl.from(
                nodes,
                {
                  scale: 0,
                  autoAlpha: 0,
                  duration: 0.42,
                  stagger: 0.055,
                  ease: 'back.out(1.7)',
                },
                0.54,
              );
            }

            /*
             * 05 — Núcleo PPC.
             * Reveal limpio, sin parpadeo ni respiración infinita.
             */
            marks.forEach((mark) => {
              const tile = mark.querySelector<HTMLElement>('[data-logo-tile]');
              const accent = mark.querySelector<HTMLElement>(
                '[data-other-logo-accent]',
              );

              tl.from(
                mark,
                {
                  scale: 0.78,
                  autoAlpha: 0,
                  duration: 0.78,
                  ease: 'back.out(1.45)',
                },
                0.50,
              );

              if (tile) {
                tl.from(
                  tile,
                  {
                    scale: 0.86,
                    autoAlpha: 0,
                    duration: 0.50,
                    ease: 'power3.out',
                  },
                  0.60,
                );
              }

              if (accent) {
                tl.from(
                  accent,
                  {
                    scale: 0,
                    autoAlpha: 0,
                    duration: 0.42,
                    ease: 'back.out(1.8)',
                  },
                  0.66,
                );
              }
            });

            /*
             * 06 — Barridos de luz lentos y muy espaciados.
             * Esto reemplaza el "blink" y mantiene el sistema sofisticado.
             */
            scans.forEach((scan, index) => {
              gsap.fromTo(
                scan,
                {
                  xPercent: 0,
                  autoAlpha: 0,
                },
                {
                  xPercent: 560,
                  autoAlpha: 0.34,
                  duration: 1.15,
                  repeat: -1,
                  repeatDelay: 5.4 + index * 0.45,
                  ease: 'power2.inOut',
                  delay: 1.4 + index * 0.20,
                },
              );
            });

            /*
             * 07 — Copy editorial aparece después del sistema.
             */
            if (copies.length) {
              tl.from(
                copies,
                {
                  y: 14,
                  autoAlpha: 0,
                  duration: 0.68,
                  stagger: 0.055,
                  ease: 'power3.out',
                },
                0.38,
              );
            }
          });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="servicios"
      className="
        relative
        overflow-hidden
        bg-graphite-950
        text-white
      "
    >
      <div className="container-page py-20 sm:py-24 lg:py-28 xl:py-30">
        {/* ==================================================
            HEADER
            Misma escala exacta que todos los H2 internos.
        ================================================== */}
        <div data-other-head className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/[0.38] sm:text-[11px]">
            PPC / SOLUCIONES TECNOLÓGICAS
          </p>

          <h2
            className="
              mx-auto
              mt-4
              max-w-[700px]
              text-[clamp(1.8rem,3.2vw,2.8rem)]
              font-medium
              leading-[1.04]
              tracking-[-0.04em]
            "
          >
            Tecnología para
            <span className="block text-white/[0.42]">
              complementar tu operación.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-[590px]
              text-[14px]
              leading-[1.65]
              text-white/[0.50]

              sm:text-[15px]
            "
          >
            Soluciones de cómputo, redes, infraestructura y videovigilancia para empresas que necesitan mantener sus equipos, espacios y operación conectados, seguros y funcionando.
          </p>
        </div>

        {/* ==================================================
            DESKTOP / TABLET
            Una sola composición. No cards, no timeline.
            El centro representa la capa tecnológica y los textos
            viven alrededor como anotaciones.
        ================================================== */}
        <div
          data-other-system
          className="
            relative
            mt-14
            hidden
            min-h-[620px]
            border-y
            border-white/[0.10]

            lg:grid
            lg:min-h-[660px]
            lg:grid-cols-[minmax(220px,1fr)_minmax(320px,390px)_minmax(220px,1fr)]
            lg:grid-rows-2
            lg:gap-x-8
            lg:py-14

            xl:grid-cols-[minmax(0,1fr)_minmax(400px,500px)_minmax(0,1fr)]
            xl:gap-x-14
          "
        >
          {/* LEFT TOP */}
          <article
            data-other-copy
            className="
              flex
              max-w-[300px]
              flex-col
              justify-center
              self-stretch
              border-b
              border-white/[0.10]
              pr-6

              lg:pr-6

              xl:pr-10
            "
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ppc-300">
              {CAPABILITIES[0].label}
            </p>
            <h3 className="mt-4 text-[clamp(1.3rem,1.5vw,1.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {CAPABILITIES[0].title}
            </h3>
            <p className="mt-3 text-[13px] leading-[1.62] text-white/[0.46] lg:text-[14px]">
              {CAPABILITIES[0].description}
            </p>
          </article>

          {/* LEFT BOTTOM */}
          <article
            data-other-copy
            className="
              row-start-2
              flex
              max-w-[300px]
              flex-col
              justify-center
              self-stretch
              pr-6

              lg:pr-6

              xl:pr-10
            "
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ppc-300">
              {CAPABILITIES[1].label}
            </p>
            <h3 className="mt-4 text-[clamp(1.3rem,1.5vw,1.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {CAPABILITIES[1].title}
            </h3>
            <p className="mt-3 text-[13px] leading-[1.62] text-white/[0.46] lg:text-[14px]">
              {CAPABILITIES[1].description}
            </p>
          </article>

          {/* RIGHT TOP */}
          <article
            data-other-copy
            className="
              col-start-3
              row-start-1
              ml-auto
              flex
              max-w-[300px]
              flex-col
              justify-center
              self-stretch
              border-b
              border-white/[0.10]
              pl-6

              lg:pl-6

              xl:pl-10
            "
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ppc-300">
              {CAPABILITIES[2].label}
            </p>
            <h3 className="mt-4 text-[clamp(1.3rem,1.5vw,1.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {CAPABILITIES[2].title}
            </h3>
            <p className="mt-3 text-[13px] leading-[1.62] text-white/[0.46] lg:text-[14px]">
              {CAPABILITIES[2].description}
            </p>
          </article>

          {/* RIGHT BOTTOM */}
          <article
            data-other-copy
            className="
              col-start-3
              row-start-2
              ml-auto
              flex
              max-w-[300px]
              flex-col
              justify-center
              self-stretch
              pl-6

              lg:pl-6

              xl:pl-10
            "
          >
            <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-ppc-300">
              {CAPABILITIES[3].label}
            </p>
            <h3 className="mt-4 text-[clamp(1.3rem,1.5vw,1.6rem)] font-medium leading-[1.05] tracking-[-0.03em]">
              {CAPABILITIES[3].title}
            </h3>
            <p className="mt-3 text-[13px] leading-[1.62] text-white/[0.46] lg:text-[14px]">
              {CAPABILITIES[3].description}
            </p>
          </article>

          {/* ==================================================
              CENTRAL STACK
              Sistema arquitectónico, no dashboard.
          ================================================== */}
          <div
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
              data-stack-scene
              className="
                relative
                h-[430px]
                w-full
                max-w-[460px]

                lg:h-[390px]
                lg:max-w-[390px]

                xl:h-[470px]
                xl:max-w-[500px]
              "
            >
              {/* construction axes */}
              <div data-system-axis="vertical" className="absolute left-1/2 top-[4%] h-[92%] w-px -translate-x-1/2 bg-white/[0.055]" />
              

              {/* Layer 1 */}
              <div
                data-stack-layer
                className="
                  absolute
                  left-1/2
                  top-[8%]
                  h-[72px]
                  w-[64%]

                  xl:top-[9%]
                  xl:h-[88px]
                  -translate-x-1/2
                  border
                  border-white/[0.12]
                  bg-white/[0.025]
                "
                style={{ transform: 'translateX(-50%) skewY(-4deg)' }}
              >
                <span
                  data-layer-scan
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    -left-[28%]
                    w-[24%]
                    bg-[linear-gradient(90deg,transparent,rgba(61,99,255,0.10),transparent)]
                    opacity-0
                  "
                  aria-hidden="true"
                />
                <span className="absolute left-4 top-4 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.46]">
                  CÓMPUTO
                </span>
                <span className="absolute right-4 top-4 h-2 w-2 bg-ppc-400" />
              </div>

              {/* Layer 2 */}
              <div
                data-stack-layer
                className="
                  absolute
                  left-1/2
                  top-[29%]
                  h-[76px]
                  w-[76%]

                  xl:top-[28%]
                  xl:h-[96px]
                  -translate-x-1/2
                  border
                  border-white/[0.12]
                  bg-white/[0.018]
                "
                style={{ transform: 'translateX(-50%) skewY(-4deg)' }}
              >
                <span
                  data-layer-scan
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    -left-[28%]
                    w-[24%]
                    bg-[linear-gradient(90deg,transparent,rgba(61,99,255,0.10),transparent)]
                    opacity-0
                  "
                  aria-hidden="true"
                />
                <span className="absolute left-4 top-4 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.46]">
                  REDES
                </span>

                <span data-node-pulse className="absolute left-[29%] top-[55%] h-2 w-2 bg-ppc-400" />
                <span data-node-pulse className="absolute right-[25%] top-[34%] h-2 w-2 bg-white/[0.30]" />
              </div>

              {/* Layer 3 */}
              <div
                data-stack-layer
                className="
                  absolute
                  left-1/2
                  top-[51%]
                  h-[82px]
                  w-[88%]

                  xl:top-[50%]
                  xl:h-[106px]
                  -translate-x-1/2
                  border
                  border-white/[0.12]
                  bg-white/[0.015]
                "
                style={{ transform: 'translateX(-50%) skewY(-4deg)' }}
              >
                <span
                  data-layer-scan
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    -left-[28%]
                    w-[24%]
                    bg-[linear-gradient(90deg,transparent,rgba(61,99,255,0.10),transparent)]
                    opacity-0
                  "
                  aria-hidden="true"
                />
                <span className="absolute left-4 top-4 text-[8px] font-semibold uppercase tracking-[0.14em] text-white/[0.46]">
                  INFRAESTRUCTURA
                </span>

                
                
                
                

                
                
                
              </div>

              {/* Layer 4 */}
              <div
                data-stack-layer
                className="
                  absolute
                  bottom-[5%]
                  left-1/2
                  h-[72px]
                  w-[68%]

                  xl:bottom-[7%]
                  xl:h-[92px]
                  -translate-x-1/2
                  border
                  border-ppc-400/35
                  bg-ppc-400/[0.035]
                "
                style={{ transform: 'translateX(-50%) skewY(-4deg)' }}
              >
                <span
                  data-layer-scan
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    -left-[28%]
                    w-[24%]
                    bg-[linear-gradient(90deg,transparent,rgba(61,99,255,0.10),transparent)]
                    opacity-0
                  "
                  aria-hidden="true"
                />
                <span className="absolute left-4 top-4 text-[8px] font-semibold uppercase tracking-[0.14em] text-ppc-300">
                  CCTV
                </span>

                <div className="absolute right-4 top-4 h-8 w-8 border border-white/[0.14]">
                  <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 border border-ppc-400/70" />
                </div>
              </div>

              {/* central mark */}
              <div
                data-other-mark
                className="
                  absolute
                  left-1/2
                  top-1/2
                  z-20
                  flex
                  h-[82px]
                  w-[82px]
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  border
                  border-white/[0.16]
                  bg-graphite-950
                  shadow-[0_22px_70px_rgba(0,0,0,0.45)]
                "
              >
                <div
                  data-other-logo
                  data-logo-tile
                  className="relative z-10 flex h-11 w-11 items-center justify-center bg-white text-[10px] font-semibold text-graphite-950"
                >
                  PPC
                </div>
                <span data-other-logo-accent className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-ppc-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================
            TABLET 768–1023
            Composición propia: stack a la izquierda + índice editorial
            a la derecha. No intenta comprimir el layout de desktop.
        ================================================== */}
        <div
          data-other-system
          className="
            mt-14
            hidden
            border-y
            border-white/[0.10]
            py-10

            md:grid
            md:grid-cols-[minmax(270px,0.9fr)_minmax(0,1.1fr)]
            md:items-center
            md:gap-9

            lg:hidden
          "
        >
          {/* STACK COMPACTO */}
          <div
            data-stack-scene
            className="
              relative
              mx-auto
              h-[390px]
              w-full
              max-w-[330px]
            "
          >
            <div data-system-axis="vertical" className="absolute left-1/2 top-[4%] h-[92%] w-px -translate-x-1/2 bg-white/[0.055]" />
            

            {[
              { top: '8%', width: '62%', label: 'CÓMPUTO' },
              { top: '27%', width: '74%', label: 'REDES' },
              { top: '48%', width: '86%', label: 'INFRAESTRUCTURA' },
              { top: '71%', width: '66%', label: 'CCTV' },
            ].map((layer, index) => (
              <div
                key={layer.label}
                data-stack-layer
                className="
                  absolute
                  left-1/2
                  h-[76px]
                  -translate-x-1/2
                  border
                  border-white/[0.12]
                  bg-white/[0.02]
                "
                style={{
                  top: layer.top,
                  width: layer.width,
                  transform: 'translateX(-50%) skewY(-4deg)',
                }}
              >
                <span
                  data-layer-scan
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    -left-[30%]
                    w-[26%]
                    bg-[linear-gradient(90deg,transparent,rgba(61,99,255,0.10),transparent)]
                    opacity-0
                  "
                  aria-hidden="true"
                />
                <span className="absolute left-3 top-3 text-[7px] font-semibold uppercase tracking-[0.13em] text-white/[0.46]">
                  {layer.label}
                </span>

                {index % 2 === 0 && (
                  <span className="absolute right-3 top-3 h-2 w-2 bg-ppc-400" />
                )}

                {index === 1 && (
                  <>
                    <span
                      data-node-pulse
                      className="absolute left-[30%] top-[58%] h-2 w-2 bg-ppc-400"
                    />
                    <span
                      data-node-pulse
                      className="absolute right-[26%] top-[34%] h-2 w-2 bg-white/[0.30]"
                    />
                  </>
                )}
              </div>
            ))}

            <div
              data-other-mark
              className="
                absolute
                left-1/2
                top-1/2
                z-20
                flex
                h-[78px]
                w-[78px]
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                border
                border-white/[0.16]
                bg-graphite-950
                shadow-[0_18px_55px_rgba(0,0,0,0.45)]
              "
            >
              <div
                data-other-logo
                data-logo-tile
                className="relative z-10 flex h-10 w-10 items-center justify-center bg-white text-[10px] font-semibold text-graphite-950"
              >
                PPC
              </div>
              <span data-other-logo-accent className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-ppc-400" />
            </div>
          </div>

          {/* ÍNDICE EDITORIAL */}
          <div className="border-t border-white/[0.10]">
            {CAPABILITIES.map((item) => (
              <article
                key={item.label}
                data-other-copy
                className="
                  grid
                  grid-cols-[96px_1fr]
                  gap-5
                  border-b
                  border-white/[0.10]
                  py-5
                "
              >
                <p className="pt-1 text-[8px] font-semibold uppercase tracking-[0.13em] text-ppc-300">
                  {item.label}
                </p>

                <div>
                  <h3 className="text-[1.18rem] font-medium leading-[1.08] tracking-[-0.025em]">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-[360px] text-[12.5px] leading-[1.58] text-white/[0.44]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ==================================================
            MOBILE
            Visual primero. Después, contenido horizontal abierto.
            No cards apiladas.
        ================================================== */}
        <div data-other-system className="mt-11 md:hidden">
          <div data-stack-scene className="relative mx-auto h-[360px] w-full max-w-[340px]">
            <div data-system-axis="vertical" className="absolute left-1/2 top-[4%] h-[92%] w-px -translate-x-1/2 bg-white/[0.055]" />

            {[
              { top: '8%', width: '62%', label: 'CÓMPUTO' },
              { top: '27%', width: '74%', label: 'REDES' },
              { top: '48%', width: '86%', label: 'INFRAESTRUCTURA' },
              { top: '71%', width: '66%', label: 'CCTV' },
            ].map((layer, index) => (
              <div
                key={layer.label}
                data-stack-layer
                className="
                  absolute
                  left-1/2
                  h-[72px]
                  -translate-x-1/2
                  border
                  border-white/[0.12]
                  bg-white/[0.02]
                "
                style={{
                  top: layer.top,
                  width: layer.width,
                  transform: 'translateX(-50%) skewY(-4deg)',
                }}
              >
                <span
                  data-layer-scan
                  className="
                    pointer-events-none
                    absolute
                    inset-y-0
                    -left-[30%]
                    w-[26%]
                    bg-[linear-gradient(90deg,transparent,rgba(61,99,255,0.10),transparent)]
                    opacity-0
                  "
                  aria-hidden="true"
                />
                <span className="absolute left-3 top-3 text-[7px] font-semibold uppercase tracking-[0.13em] text-white/[0.46]">
                  {layer.label}
                </span>
                {index % 2 === 0 && (
                  <span className="absolute right-3 top-3 h-2 w-2 bg-ppc-400" />
                )}
              </div>
            ))}

            <div
              data-other-mark
              className="
                absolute
                left-1/2
                top-1/2
                z-20
                flex
                h-[76px]
                w-[76px]
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                border
                border-white/[0.16]
                bg-graphite-950
                shadow-[0_18px_55px_rgba(0,0,0,0.45)]
              "
            >
              <div
                data-other-logo
                data-logo-tile
                className="relative z-10 flex h-10 w-10 items-center justify-center bg-white text-[10px] font-semibold text-graphite-950"
              >
                PPC
              </div>
              <span data-other-logo-accent className="absolute -right-1 -top-1 h-2.5 w-2.5 bg-ppc-400" />
            </div>
          </div>

          <div
            className="
              mt-8
              border-t
              border-white/[0.10]
            "
          >
            {CAPABILITIES.map((item) => (
              <article
                key={item.label}
                data-other-copy
                className="
                  border-b
                  border-white/[0.10]
                  py-6
                "
              >
                <p className="text-[8px] font-semibold uppercase tracking-[0.13em] text-ppc-300">
                  {item.label}
                </p>

                <h3 className="mt-3 text-[1.18rem] font-medium leading-[1.08] tracking-[-0.025em]">
                  {item.title}
                </h3>

                <p className="mt-2.5 max-w-[520px] text-[13px] leading-[1.58] text-white/[0.44]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* ==================================================
            SINGLE CTA
            No CTA repetido por capacidad.
        ================================================== */}
        <div
          className="
            mt-10
            flex
            flex-col
            gap-5
            border-t
            border-white/[0.10]
            pt-5

            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/[0.24]">
            CÓMPUTO / REDES / INFRAESTRUCTURA / CCTV
          </span>

          <a
            href={buildWhatsAppUrl('infrastructure')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick({
                location: 'services',
                context: 'infrastructure',
                service: 'Otras soluciones',
                label: 'Consultar otra solución',
              })
            }
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2.5
              text-[13px]
              font-medium
              text-white
              transition-colors
              duration-300

              hover:text-ppc-300
            "
          >
            Consultar otra solución

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
    </section>
  );
}