import { useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { trackFaqOpen } from '@/lib/analytics';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const FAQ_ITEMS = [
  {
    question: '¿Qué plotter o impresora necesita mi empresa?',
    answer:
      'Depende del tipo de trabajo, volumen de impresión, formatos y necesidades de tu operación. PPC ServiCenter te ayuda a elegir el plotter o impresora adecuado antes de cotizar.',
  },
  {
    question: '¿Venden plotters, impresoras, insumos y papelería para oficina?',
    answer:
      'Sí. Comercializamos plotters, impresoras, consumibles, insumos y papelería para oficina para empresas con distintas necesidades de operación.',
  },
  {
    question: '¿Realizan mantenimiento de impresoras y plotters?',
    answer:
      'Sí. Ofrecemos mantenimiento preventivo y correctivo para impresoras y plotters, con el objetivo de conservar su rendimiento, prevenir fallas y reducir tiempos de inactividad.',
  },
  {
    question: '¿Dan soporte técnico para impresoras y plotters HP?',
    answer:
      'Sí. Brindamos diagnóstico, mantenimiento y soporte técnico para impresoras y plotters HP según la falla, el modelo y las necesidades del equipo.',
  },
  {
    question: '¿Pueden revisar un equipo que no compré con PPC ServiCenter?',
    answer:
      'Sí, podemos revisar el caso. Compártenos la marca, modelo y falla del equipo para determinar qué tipo de diagnóstico, mantenimiento o soporte técnico requiere.',
  },
  {
    question: '¿Ofrecen instalación y puesta en marcha de los equipos?',
    answer:
      'Sí. Podemos realizar la instalación, configuración y puesta en marcha de impresoras y plotters para integrarlos correctamente a la operación de tu empresa.',
  },
  {
    question: '¿En qué zonas ofrecen venta y soporte técnico?',
    answer:
      'Atendemos empresas en todo México, con atención prioritaria en Ciudad de México, Estado de México, Puebla, Hidalgo, Querétaro, Michoacán y otras zonas del centro del país.',
  },
  {
    question: '¿Cómo solicito una cotización o soporte técnico?',
    answer:
      'Puedes contactarnos por WhatsApp. Compártenos el equipo, modelo, producto o servicio que necesitas y te orientamos para definir el siguiente paso.',
  },
] as const;

export default function FAQ() {
  const root = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const head = section.querySelector<HTMLElement>('[data-faq-head]');
      const list = section.querySelector<HTMLElement>('[data-faq-list]');
      const rule = section.querySelector<HTMLElement>('[data-faq-rule]');
      const items = section.querySelectorAll<HTMLElement>('[data-faq-item]');

      if (head) {
        const headChildren = head.children;

        if (headChildren.length) {
          gsap.from(headChildren, {
            y: 18,
            autoAlpha: 0,
            duration: 0.72,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: head,
              start: 'top 82%',
            },
          });
        }
      }

      if (list && items.length) {
        gsap.from(items, {
          y: 16,
          autoAlpha: 0,
          duration: 0.68,
          stagger: 0.055,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 80%',
          },
        });
      }

      if (list && rule) {
        gsap.from(rule, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.9,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: list,
            start: 'top 82%',
          },
        });
      }
    },
    { scope: root },
  );

  const toggle = (index: number, question: string) => {
    const next = openIndex === index ? null : index;
    setOpenIndex(next);

    if (next !== null) {
      trackFaqOpen({ question, index });
    }
  };

  return (
    <section
      ref={root}
      id="faq"
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
          className="
            grid
            gap-12

            lg:grid-cols-12
            lg:gap-14

            xl:gap-18
          "
        >
          {/* ==================================================
              LEFT / INTRO
              En desktop permanece visualmente estable mientras
              las preguntas ocupan el plano derecho.
          ================================================== */}
          <div
            data-faq-head
            className="
              lg:col-span-4
              lg:self-start
              lg:sticky
              lg:top-32
            "
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-graphite-400 sm:text-[11px]">
              PPC / PREGUNTAS FRECUENTES
            </p>

            <h2
              className="
                mt-4
                max-w-[390px]
                text-[clamp(1.8rem,3.2vw,2.8rem)]
                font-medium
                leading-[1.04]
                tracking-[-0.04em]
              "
            >
              Preguntas frecuentes sobre
              <span className="block text-graphite-400">
                equipos y soporte técnico.
              </span>
            </h2>

            <p
              className="
                mt-5
                max-w-[350px]
                text-[14px]
                leading-[1.65]
                text-graphite-600

                sm:text-[15px]
              "
            >
              Resolvemos dudas sobre plotters, impresoras, insumos, papelería, mantenimiento y soporte técnico para empresas.
            </p>
          </div>

          {/* ==================================================
              RIGHT / FAQ
              Sin cards: una sola superficie editorial.
          ================================================== */}
          <div
            data-faq-list
            className="
              relative

              lg:col-span-8
              lg:pt-1
            "
          >
            <div className="relative h-px bg-graphite-950/10">
              <div
                data-faq-rule
                className="absolute left-0 top-0 h-px w-[86px] bg-ppc-500"
              />
            </div>

            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <article
                  key={item.question}
                  data-faq-item
                  className="border-b border-graphite-950/10"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    onClick={() => toggle(index, item.question)}
                    className="
                      group
                      grid
                      w-full
                      grid-cols-[38px_1fr_auto]
                      items-start
                      gap-4
                      py-6
                      text-left

                      sm:grid-cols-[48px_1fr_auto]
                      sm:gap-5
                      sm:py-7

                      lg:grid-cols-[54px_1fr_auto]
                      lg:py-8
                    "
                  >
                    <span
                      className="
                        pt-[4px]
                        text-[9px]
                        font-medium
                        tracking-[0.14em]
                        text-graphite-300

                        sm:text-[10px]
                      "
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span
                      className="
                        max-w-[650px]
                        text-[clamp(1.15rem,1.65vw,1.48rem)]
                        font-medium
                        leading-[1.14]
                        tracking-[-0.025em]
                        text-graphite-950
                        transition-colors
                        duration-300

                        group-hover:text-graphite-600
                      "
                    >
                      {item.question}
                    </span>

                    <span
                      className="
                        relative
                        mt-[1px]
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                      "
                    >
                      <Plus
                        aria-hidden="true"
                        strokeWidth={1.35}
                        className={`
                          h-[18px]
                          w-[18px]
                          transition-all
                          duration-300
                          ${
                            isOpen
                              ? 'rotate-45 text-ppc-600'
                              : 'rotate-0 text-graphite-400 group-hover:text-graphite-700'
                          }
                        `}
                      />
                    </span>
                  </button>

                  <div
                    id={`faq-panel-${index}`}
                    className={`
                      grid
                      transition-[grid-template-rows]
                      duration-500
                      ease-out-expo
                      ${
                        isOpen
                          ? 'grid-rows-[1fr]'
                          : 'grid-rows-[0fr]'
                      }
                    `}
                  >
                    <div className="overflow-hidden">
                      <div
                        className="
                          grid
                          grid-cols-[38px_1fr_auto]
                          gap-4
                          pb-7

                          sm:grid-cols-[48px_1fr_auto]
                          sm:gap-5
                          sm:pb-8

                          lg:grid-cols-[54px_1fr_auto]
                          lg:pb-9
                        "
                      >
                        <span aria-hidden="true" />

                        <p
                          className="
                            max-w-[590px]
                            pr-4
                            text-[14px]
                            leading-[1.66]
                            text-graphite-600

                            sm:text-[15px]
                          "
                        >
                          {item.answer}
                        </p>

                        <span aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}

            <div
              className="
                mt-5
                flex
                items-center
                justify-between
                gap-5
              "
            >
              <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-graphite-400">
                EQUIPO / SOPORTE / SERVICIO
              </span>

              <span className="h-2 w-2 bg-ppc-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}