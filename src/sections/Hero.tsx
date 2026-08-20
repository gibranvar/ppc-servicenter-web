import { useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PRODUCT_IMAGE =
  'https://www.hp.com/content/dam/sites/worldwide/printers/large-format/designjet-technical-plotters/1128951_update/HP_DesignJet_Technical_plotters-Products_T850-36in-sfp.jpg';

type HeroBrand = {
  name: string;
  file: string;
  imageClassName: string;
};

const HERO_BRANDS: HeroBrand[] = [
  {
    name: 'HP',
    file: 'hp-logo.svg',
    imageClassName:
      'max-h-[30px] max-w-[64px] sm:max-h-[32px] sm:max-w-[68px] md:max-h-[38px] md:max-w-[82px] lg:max-h-[34px] lg:max-w-[72px]',
  },
  {
    name: 'Canon',
    file: 'canon-logo.svg',
    imageClassName:
      'max-h-[24px] max-w-[96px] sm:max-h-[26px] sm:max-w-[104px] md:max-h-[31px] md:max-w-[124px] lg:max-h-[28px] lg:max-w-[110px]',
  },
  {
    name: 'Brother',
    file: 'brother-logo.svg',
    imageClassName:
      'max-h-[25px] max-w-[102px] sm:max-h-[27px] sm:max-w-[110px] md:max-h-[32px] md:max-w-[128px] lg:max-h-[29px] lg:max-w-[118px]',
  },
  {
    name: 'Cisco',
    file: 'cisco-logo.svg',
    imageClassName:
      'max-h-[30px] max-w-[72px] sm:max-h-[32px] sm:max-w-[78px] md:max-h-[38px] md:max-w-[92px] lg:max-h-[34px] lg:max-w-[84px]',
  },
  {
    name: 'Epson',
    file: 'epson-logo.svg',
    imageClassName:
      'max-h-[23px] max-w-[92px] sm:max-h-[25px] sm:max-w-[100px] md:max-h-[30px] md:max-w-[116px] lg:max-h-[27px] lg:max-w-[106px]',
  },
  {
    name: 'Lenovo',
    file: 'lenovo-logo.svg',
    imageClassName:
      'max-h-[23px] max-w-[88px] sm:max-h-[25px] sm:max-w-[96px] md:max-h-[30px] md:max-w-[112px] lg:max-h-[27px] lg:max-w-[102px]',
  },
  {
    name: 'MikroTik',
    file: 'mikrotik-logo.svg',
    imageClassName:
      'max-h-[23px] max-w-[102px] sm:max-h-[25px] sm:max-w-[110px] md:max-h-[30px] md:max-w-[128px] lg:max-h-[27px] lg:max-w-[118px]',
  },
  {
    name: 'Samsung',
    file: 'samsung-logo.svg',
    imageClassName:
      'max-h-[23px] max-w-[96px] sm:max-h-[25px] sm:max-w-[104px] md:max-h-[30px] md:max-w-[120px] lg:max-h-[27px] lg:max-w-[110px]',
  },
];

function HeroBrandLogo({ brand }: { brand: HeroBrand }) {
  return (
    <div className="flex min-w-0 items-center justify-center">
      <img
        src={`/brands/${brand.file}`}
        alt={`${brand.name}`}
        draggable={false}
        className={`
          block
          h-auto
          w-auto
          select-none
          object-contain
          brightness-0
          opacity-50
          transition-[opacity,transform]
          duration-300
          hover:scale-[1.04]
          hover:opacity-80
          ${brand.imageClassName}
        `}
      />
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const productStage = useRef<HTMLDivElement>(null);
  const productImage = useRef<HTMLImageElement>(null);
  const productSystem = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        
        const intro = gsap.timeline({
          defaults: {
            ease: 'power3.out',
          },
        });

        intro
          .from('[data-hero-kicker]', {
            y: 7,
            autoAlpha: 0,
            duration: 0.5,
          })
          .from(
            '[data-hero-title-line]',
            {
              yPercent: 112,
              rotate: 0.7,
              transformOrigin: 'left bottom',
              duration: 0.88,
              stagger: 0.065,
              ease: 'power4.out',
            },
            '-=0.22',
          )
          .from(
            '[data-hero-body]',
            {
              y: 12,
              autoAlpha: 0,
              duration: 0.62,
            },
            '-=0.46',
          )
          .from(
            '[data-hero-actions] > *',
            {
              y: 10,
              autoAlpha: 0,
              duration: 0.56,
              stagger: 0.07,
            },
            '-=0.38',
          )
          .from(
            '[data-hero-meta]',
            {
              y: 5,
              autoAlpha: 0,
              duration: 0.45,
            },
            '-=0.28',
          )
          .from(
            '[data-hero-brands]',
            {
              y: 8,
              autoAlpha: 0,
              duration: 0.55,
            },
            '-=0.28',
          )
          .from(
            '[data-hero-baseline]',
            {
              y: 8,
              autoAlpha: 0,
              duration: 0.55,
            },
            '-=0.42',
          );

        
        gsap.set('[data-system-layer]', {
          y: 18,
          scale: 0.985,
          autoAlpha: 0,
          transformOrigin: 'center bottom',
        });

        gsap.set('[data-system-path]', {
          scaleX: 0,
          autoAlpha: 0,
          transformOrigin: 'left center',
        });

        gsap.set('[data-product-image]', {
          x: 26,
          scale: 0.99,
          autoAlpha: 0,
          clipPath: 'inset(0% 10% 0% 90%)',
        });

        gsap.set('[data-product-shadow]', {
          scaleX: 0.72,
          autoAlpha: 0,
          transformOrigin: 'center center',
        });

        gsap.set('[data-system-label]', {
          y: 5,
          autoAlpha: 0,
        });

        gsap.set('[data-system-node]', {
          scale: 0.55,
          autoAlpha: 0,
          transformOrigin: 'center center',
        });

        let visualPlayed = false;

        const playVisual = () => {
          if (visualPlayed) return;
          visualPlayed = true;

          const visual = gsap.timeline({
            defaults: {
              ease: 'power3.out',
            },
          });

          visual
            .to(
              '[data-visual-shell]',
              {
                autoAlpha: 1,
                duration: 0.22,
                ease: 'power1.out',
              },
              0,
            )
            .to(
              '[data-system-layer]',
              {
                y: 0,
                scale: 1,
                autoAlpha: 1,
                duration: 0.72,
                stagger: 0.09,
              },
              0.03,
            )
            .to(
              '[data-product-image]',
              {
                x: 0,
                scale: 1,
                autoAlpha: 1,
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.08,
                ease: 'power4.out',
              },
              0.10,
            )
            .to(
              '[data-product-shadow]',
              {
                scaleX: 1,
                autoAlpha: 1,
                duration: 0.72,
              },
              0.28,
            )
            .to(
              '[data-system-path]',
              {
                scaleX: 1,
                autoAlpha: 1,
                duration: 0.9,
                stagger: 0.08,
                ease: 'power3.inOut',
              },
              0.34,
            )
            .to(
              '[data-system-label]',
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.46,
                stagger: 0.07,
              },
              0.72,
            )
            .to(
              '[data-system-node]',
              {
                scale: 1,
                autoAlpha: 1,
                duration: 0.42,
                stagger: 0.07,
                ease: 'back.out(1.35)',
              },
              0.82,
            );
        };

        const productImages = gsap.utils.toArray<HTMLImageElement>(
          '[data-product-image]',
        );

        const activeImage =
          productImages.find((image) => image.offsetParent !== null) ??
          productImages[0];

        const onImageLoad = () => {
          requestAnimationFrame(playVisual);
        };

        let fallbackTimer = 0;

        if (
          activeImage &&
          activeImage.complete &&
          activeImage.naturalWidth > 0
        ) {
          requestAnimationFrame(playVisual);
        } else if (activeImage) {
          activeImage.addEventListener('load', onImageLoad, {
            once: true,
          });

          // Never leave the visual blank if an external asset is slow.
          fallbackTimer = window.setTimeout(playVisual, 1100);
        } else {
          playVisual();
        }

        return () => {
          activeImage?.removeEventListener('load', onImageLoad);

          if (fallbackTimer) {
            window.clearTimeout(fallbackTimer);
          }
        };
      });

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set('[data-visual-shell]', {
          autoAlpha: 1,
        });

        gsap.set('[data-system-node]', {
          autoAlpha: 1,
          scale: 1,
        });
      });

      mm.add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          if (
            !productStage.current ||
            !productImage.current ||
            !productSystem.current
          ) {
            return;
          }

          /*
           * Desktop depth.
           */
          const imageX = gsap.quickTo(productImage.current, 'x', {
            duration: 0.9,
            ease: 'power3.out',
          });

          const imageY = gsap.quickTo(productImage.current, 'y', {
            duration: 0.9,
            ease: 'power3.out',
          });

          const systemX = gsap.quickTo(productSystem.current, 'x', {
            duration: 1.15,
            ease: 'power3.out',
          });

          const systemY = gsap.quickTo(productSystem.current, 'y', {
            duration: 1.15,
            ease: 'power3.out',
          });

          const onPointerMove = (event: PointerEvent) => {
            const rect = productStage.current?.getBoundingClientRect();
            if (!rect) return;

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            imageX(x * 6);
            imageY(y * 4);
            systemX(x * -4);
            systemY(y * -2.5);
          };

          const onPointerLeave = () => {
            imageX(0);
            imageY(0);
            systemX(0);
            systemY(0);
          };

          productStage.current.addEventListener('pointermove', onPointerMove);
          productStage.current.addEventListener(
            'pointerleave',
            onPointerLeave,
          );

          gsap.to(productImage.current, {
            yPercent: 3,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.15,
            },
          });

          gsap.to(productSystem.current, {
            yPercent: -2,
            ease: 'none',
            scrollTrigger: {
              trigger: root.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.25,
            },
          });

          return () => {
            productStage.current?.removeEventListener(
              'pointermove',
              onPointerMove,
            );
            productStage.current?.removeEventListener(
              'pointerleave',
              onPointerLeave,
            );
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  const goToSolutions = () => {
    document.querySelector('#soluciones')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section
      ref={root}
      id="top"
      className="
        relative
        isolate
        min-h-0
        overflow-hidden
        bg-paper-50
        pb-5
        pt-[112px]

        min-[430px]:pb-10

        sm:pb-12
        sm:pt-[106px]

        md:pb-10
        md:pt-[96px]

        lg:pb-12
        lg:pt-[140px]

        xl:pb-14
        xl:pt-[148px]
      "
    >
      <div
        className="
          container-page
          relative

          md:grid
          md:min-h-[550px]
          md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]
          md:items-center
          md:gap-7

          lg:grid
          lg:grid-cols-12
          lg:items-center
          lg:gap-x-14
          lg:gap-y-10

          xl:gap-x-16
        "
      >
        {/* ==================================================
            COPY
        ================================================== */}
        <div
          className="
            relative
            z-30
            mx-auto
            w-[calc(100%-20px)]
            max-w-[560px]
            text-left

            sm:mx-0
            sm:w-full

            md:relative
            md:left-auto
            md:top-auto
            md:w-auto
            md:max-w-none
            md:translate-y-0
            md:pr-2

            lg:relative
            lg:col-span-6
            lg:left-auto
            lg:top-auto
            lg:mx-0
            lg:w-full
            lg:max-w-[590px]
            lg:translate-y-0
            lg:pr-4

            xl:max-w-[610px]
          "
        >
          <p
            data-hero-kicker
            className="
              mb-5
              hidden
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-graphite-500

              sm:block
              sm:mb-6
              sm:text-[11px]

              lg:mb-7
            "
          >
            PPC SERVICENTER / EQUIPOS + SOPORTE TÉCNICO
          </p>

          {/* ÚNICO H1 SEMÁNTICO — el salto de líneas cambia por breakpoint */}
          <h1 className="text-graphite-950">
            {/* MOBILE */}
            <span
              className="
                block
                max-w-[11.5ch]
                text-left
                text-[clamp(2.15rem,11vw,2.55rem)]
                font-medium
                leading-[0.99]
                tracking-[-0.047em]

                sm:hidden
              "
            >
              <span className="block overflow-hidden pb-[0.045em]">
                <span data-hero-title-line className="block">
                  Plotters,
                </span>
              </span>

              <span className="block overflow-hidden pb-[0.045em]">
                <span data-hero-title-line className="block">
                  impresoras y
                </span>
              </span>

              <span className="block overflow-hidden pb-[0.045em]">
                <span data-hero-title-line className="block">
                  soporte técnico
                </span>
              </span>

              <span className="block overflow-hidden pb-[0.045em]">
                <span data-hero-title-line className="block">
                  para empresas.
                </span>
              </span>
            </span>

            {/* TABLET / DESKTOP */}
            <span
              className="
                hidden
                max-w-[590px]
                font-medium
                leading-[1.01]
                tracking-[-0.044em]

                sm:block
                sm:text-[clamp(2.65rem,5.8vw,3.35rem)]

                md:text-[clamp(2.2rem,4.25vw,2.55rem)]
                md:leading-[1.02]

                lg:text-[clamp(2.9rem,3.55vw,3.45rem)]
                lg:leading-[1.015]
              "
            >
              <span className="block overflow-hidden pb-[0.045em]">
                <span data-hero-title-line className="block">
                  Plotters, impresoras
                </span>
              </span>

              <span className="block overflow-hidden pb-[0.045em]">
                <span data-hero-title-line className="block">
                  y soporte técnico
                </span>
              </span>

              <span className="block overflow-hidden pb-[0.045em]">
                <span data-hero-title-line className="block">
                  para empresas.
                </span>
              </span>
            </span>
          </h1>

          <p
            data-hero-body
            className="
              mt-5
              max-w-[510px]
              text-[13px]
              leading-[1.6]
              text-graphite-600

              sm:mt-6
              sm:text-[15px]

              md:mt-5
              md:max-w-[360px]
              md:text-[14px]
              md:leading-[1.58]

              lg:mt-7
              lg:max-w-[510px]
              lg:text-[16px]
              lg:leading-[1.6]
            "
          >
            Venta de plotters, impresoras e insumos, con instalación, mantenimiento y soporte técnico para empresas en CDMX y zona centro, con cobertura en todo México.
          </p>

          <div
            data-hero-actions
            className="
              mt-5
              flex
              w-full
              flex-col
              items-stretch
              gap-2

              sm:mt-7

              md:mt-6
              md:w-full
              md:max-w-[250px]
              md:flex-col
              md:items-stretch
              md:gap-2.5

              lg:mt-8
              lg:max-w-none
              lg:flex-row
              lg:items-center
              lg:gap-2
            "
          >
            <a
              href={buildWhatsAppUrl('plotters')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  location: 'hero',
                  context: 'plotters',
                  label: 'Cotizar equipo',
                })
              }
              className="
                group
                inline-flex
                min-h-[54px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-md
                bg-ppc-500
                px-5
                text-[13px]
                font-medium
                text-white
                transition-colors
                duration-300

                hover:bg-ppc-600

                sm:w-auto
                sm:min-h-[48px]
                sm:w-auto
                sm:min-h-[48px]
                sm:px-6
                sm:text-sm

                md:w-full

                lg:w-auto
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

            <a
              href={buildWhatsAppUrl('support')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  location: 'hero',
                  context: 'support',
                  label: 'Necesito soporte',
                })
              }
              className="
                group
                inline-flex
                min-h-[52px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-md
                border
                border-graphite-950/15
                bg-transparent
                px-5
                text-[13px]
                font-medium
                text-graphite-800
                transition-all
                duration-300

                hover:border-graphite-950/35
                hover:bg-white/70
                hover:text-graphite-950

                sm:px-6
                sm:text-sm

                md:w-full

                lg:w-auto
              "
            >
              Solicitar soporte

              <ArrowRight
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300

                  group-hover:translate-x-1
                "
              />
            </a>
          </div>

          <div
            data-hero-meta
            className="
              mt-1
              text-left
              font-semibold
              uppercase
              text-graphite-400

              lg:mt-4
            "
            aria-label="Soporte técnico para impresoras y plotters HP"
          >
            {/* MOBILE / SMALL */}
            <div
              className="
                flex
                items-center
                gap-2
                whitespace-nowrap
                text-[8px]
                tracking-[0.085em]

                min-[390px]:text-[9px]
                min-[390px]:tracking-[0.10em]

                md:hidden
              "
            >
              <span className="h-px w-5 shrink-0 bg-ppc-500/55" />
              <span>Soporte · impresoras + plotters · HP</span>
            </div>

            {/* TABLET */}
            <div
              className="
                hidden
                md:block
                lg:hidden
              "
            >
              <div className="flex items-center gap-2">
                <span className="h-px w-6 shrink-0 bg-ppc-500/55" />
                <span className="text-[8px] tracking-[0.11em] text-graphite-500">
                  Soporte técnico
                </span>
              </div>

              <span
                className="
                  mt-1.5
                  block
                  pl-8
                  text-[8px]
                  tracking-[0.10em]
                  text-graphite-400
                "
              >
                Impresoras + plotters · HP
              </span>
            </div>

            {/* DESKTOP */}
            <div
              className="
                hidden
                items-center
                gap-2
                text-[10px]
                tracking-[0.13em]

                lg:flex
              "
            >
              <span className="h-px w-6 shrink-0 bg-ppc-500/50" />
              <span>Soporte técnico para impresoras y plotters · HP</span>
            </div>
          </div>
        </div>

        {/* ==================================================
            MOBILE PRODUCT SYSTEM
            Ya no es solo una imagen: producto + capas de operación.
        ================================================== */}
        <div
          data-visual-shell
          className="
            relative
            left-1/2
            z-10
            mt-2
            opacity-0
            h-[255px]
            w-screen
            -translate-x-1/2
            overflow-hidden

            min-[380px]:mt-3
            min-[380px]:h-[278px]

            sm:mt-5
            sm:h-[330px]

            md:relative
            md:left-auto
            md:right-auto
            md:top-auto
            md:mt-0
            md:h-[470px]
            md:w-auto
            md:translate-x-0
            md:translate-y-0
            md:self-center
            md:overflow-visible

            lg:hidden
          "
        >
          <div
            className="
              absolute
              inset-y-0
              left-4
              right-4
              overflow-hidden

              min-[380px]:left-5
              min-[380px]:right-5

              sm:left-6
              sm:right-6

              md:left-0
              md:right-0
              md:overflow-visible
            "
          >
            {/* technical field */}
            <div
              ref={productSystem}
              className="pointer-events-none absolute inset-0"
            >
              <div
                data-system-layer
                className="
                  absolute
                  bottom-[20%]
                  left-[7%]
                  h-[42%]
                  w-[82%]

                  md:bottom-[22%]
                  md:left-[8%]
                  md:h-[38%]
                  md:w-[84%]
                  border
                  border-graphite-950/[0.08]
                  bg-ppc-50
                "
                style={{
                  clipPath:
                    'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
                }}
              />

              <div
                data-system-layer
                className="
                  absolute
                  bottom-[13%]
                  left-[13%]
                  h-[28%]
                  w-[72%]

                  md:bottom-[15%]
                  md:left-[15%]
                  md:h-[24%]
                  md:w-[72%]
                  border
                  border-graphite-950/[0.08]
                  bg-white/65
                "
                style={{
                  clipPath:
                    'polygon(9% 0, 100% 0, 91% 100%, 0 100%)',
                }}
              />

              <div
                data-system-path
                className="
                  absolute
                  bottom-[12%]
                  left-[7%]
                  h-px
                  w-[82%]
                  bg-graphite-950/10
                "
              />

              <div
                data-system-path
                className="
                  absolute
                  bottom-[20%]
                  left-[18%]
                  h-px
                  w-[54%]
                  bg-ppc-500/60
                "
              />

              <span
                data-system-node
                className="
                  absolute
                  bottom-[18.5%]
                  left-[18%]
                  h-2
                  w-2
                  bg-ppc-500
                  opacity-0
                "
              />

              <span
                data-system-node
                className="
                  absolute
                  bottom-[10.5%]
                  right-[10%]
                  h-2
                  w-2
                  bg-graphite-950/25
                  opacity-0
                "
              />

              <span
                data-system-label
                className="
                  absolute
                  left-[8%]
                  top-[20%]

                  md:left-[6%]
                  md:top-[24%]
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.13em]
                  text-graphite-400
                "
              >
                EQUIPO
              </span>

              <span
                data-system-label
                className="
                  absolute
                  right-[8%]
                  top-[30%]

                  md:right-[5%]
                  md:top-[27%]
                  text-[7px]
                  font-semibold
                  uppercase
                  tracking-[0.13em]
                  text-graphite-400
                "
              >
                SOPORTE HP
              </span>
            </div>

            <div
              data-product-shadow
              className="
                pointer-events-none
                absolute
                bottom-[6%]
                left-1/2
                z-[1]
                h-[8%]
                w-[52%]
                -translate-x-1/2
                rounded-[50%]
                bg-graphite-950/15
                blur-[20px]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                bottom-[-7%]
                left-1/2
                z-10
                h-[116%]
                w-[150%]
                -translate-x-1/2

                min-[380px]:w-[142%]

                sm:bottom-[-5%]
                sm:h-[112%]
                sm:w-[124%]

                md:bottom-[7%]
                md:left-[52%]
                md:h-[94%]
                md:w-[138%]
              "
            >
              <img
                data-product-image
                src={PRODUCT_IMAGE}
                alt="Plotter profesional HP DesignJet"
                loading="eager"
                decoding="async"
                className="
                  h-full
                  w-full
                  max-w-none
                  object-contain
                  object-center
                  will-change-transform
                "
                style={{
                  mixBlendMode: 'multiply',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 54% 72% at 50% 55%, #000 52%, rgba(0,0,0,.98) 64%, rgba(0,0,0,.68) 76%, rgba(0,0,0,.16) 88%, transparent 97%)',
                  maskImage:
                    'radial-gradient(ellipse 54% 72% at 50% 55%, #000 52%, rgba(0,0,0,.98) 64%, rgba(0,0,0,.68) 76%, rgba(0,0,0,.16) 88%, transparent 97%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* ==================================================
            MARCAS / MOBILE + TABLET
            Integradas al Hero, sin tarjeta, sin glass y sin
            convertirlas en otro bloque protagonista.
        ================================================== */}
        <div
          data-hero-brands
          className="
            relative
            z-30
            mx-auto
            mt-7
            w-[calc(100%-20px)]
            max-w-[560px]
            border-t
            border-graphite-950/10
            pt-5

            min-[430px]:mt-8

            sm:mt-9
            sm:w-full
            sm:pt-6

            md:col-span-2
            md:mx-0
            md:mt-9
            md:w-full
            md:max-w-none
            md:justify-self-stretch
            md:pt-6

            lg:hidden
          "
        >
          <div className="flex w-full items-center justify-center gap-4">
            <span className="h-px min-w-0 flex-1 bg-graphite-950/[0.08]" />

            <span
              className="
                shrink-0
                text-center
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-graphite-400

                min-[390px]:text-[9px]

                md:text-[10px]
                md:tracking-[0.16em]
              "
            >
              Marcas que manejamos
            </span>

            <span className="h-px min-w-0 flex-1 bg-graphite-950/[0.08]" />
          </div>

          <div
            className="
              relative
              left-1/2
              mt-5
              w-[calc(100vw-40px)]
              -translate-x-1/2
              overflow-hidden

              min-[430px]:w-[calc(100vw-48px)]

              sm:mt-6
              sm:w-full

              md:left-auto
              md:mt-7
              md:w-full
              md:translate-x-0
            "
            aria-label="Marcas de equipos que maneja PPC Service Center"
          >
            <div
              className="
                flex
                w-max
                items-center
                animate-[hero-brands-marquee_32s_linear_infinite]
                will-change-transform
                hover:[animation-play-state:paused]
                motion-reduce:animate-none
              "
            >
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-5
                  pr-5

                  sm:gap-12
                  sm:pr-12

                  md:gap-14
                  md:pr-14
                "
              >
                {HERO_BRANDS.map((brand) => (
                  <div
                    key={`mobile-first-${brand.name}`}
                    className="
                      flex
                      h-11
                      w-[105px]
                      shrink-0
                      items-center
                      justify-center

                      sm:h-12
                      sm:w-[136px]

                      md:h-14
                      md:w-[154px]
                    "
                  >
                    <HeroBrandLogo brand={brand} />
                  </div>
                ))}
              </div>

              <div
                aria-hidden="true"
                className="
                  flex
                  shrink-0
                  items-center
                  gap-5
                  pr-5

                  sm:gap-12
                  sm:pr-12

                  md:gap-14
                  md:pr-14
                "
              >
                {HERO_BRANDS.map((brand) => (
                  <div
                    key={`mobile-second-${brand.name}`}
                    className="
                      flex
                      h-11
                      w-[105px]
                      shrink-0
                      items-center
                      justify-center

                      sm:h-12
                      sm:w-[136px]

                      md:h-14
                      md:w-[154px]
                    "
                  >
                    <HeroBrandLogo brand={brand} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="h-6 min-[430px]:h-8 sm:h-5 md:hidden"
          aria-hidden="true"
        />

        {/* ==================================================
            DESKTOP PRODUCT SYSTEM
            Capas / rutas / nodos, inspirado en el lenguaje visual
            de las secciones nuevas, sin convertirlo en dashboard.
        ================================================== */}
        <div
          ref={productStage}
          data-visual-shell
          className="
            absolute
            right-0
            opacity-0
            top-[calc(50%-58px)]
            z-10
            hidden
            h-[520px]
            w-[52%]
            max-w-[650px]
            -translate-y-1/2

            lg:relative
            lg:col-span-6
            lg:col-start-7
            lg:right-auto
            lg:top-auto
            lg:block
            lg:w-full
            lg:translate-y-0
            lg:justify-self-end

            xl:h-[550px]
            xl:max-w-[680px]
          "
        >
          <div
            ref={productSystem}
            className="
              pointer-events-none
              absolute
              inset-0
            "
          >
            {/* Layer 01 */}
            <div
              data-system-layer
              className="
                absolute
                bottom-[18%]
                right-[2%]
                h-[58%]
                w-[83%]
                border
                border-graphite-950/[0.08]
                bg-ppc-50
              "
              style={{
                clipPath:
                  'polygon(12% 0, 100% 0, 88% 100%, 0 100%)',
              }}
            />

            {/* Layer 02 */}
            <div
              data-system-layer
              className="
                absolute
                bottom-[11%]
                right-[8%]
                h-[43%]
                w-[72%]
                border
                border-graphite-950/[0.08]
                bg-white/70
              "
              style={{
                clipPath:
                  'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
              }}
            />

            {/* Layer 03 */}
            <div
              data-system-layer
              className="
                absolute
                bottom-[5%]
                right-[15%]
                h-[27%]
                w-[60%]
                border
                border-ppc-500/20
                bg-ppc-100/40
              "
              style={{
                clipPath:
                  'polygon(8% 0, 100% 0, 92% 100%, 0 100%)',
              }}
            />

            {/* paths */}
            <div
              data-system-path
              className="
                absolute
                bottom-[17%]
                left-[3%]
                h-px
                w-[86%]
                bg-graphite-950/10
              "
            />

            <div
              data-system-path
              className="
                absolute
                bottom-[29%]
                left-[12%]
                h-px
                w-[52%]
                bg-ppc-500/65
              "
            />

            <div
              data-system-path
              className="
                absolute
                right-[12%]
                top-[24%]
                h-px
                w-[30%]
                bg-graphite-950/10
              "
            />

            {/* nodes */}
            <span
              data-system-node
              className="
                absolute
                bottom-[27.9%]
                left-[12%]
                h-2.5
                w-2.5
                bg-ppc-500
                opacity-0
              "
            />

            <span
              data-system-node
              className="
                absolute
                right-[10.8%]
                top-[23%]
                h-2.5
                w-2.5
                bg-graphite-950/24
                opacity-0
              "
            />

            <span
              data-system-node
              className="
                absolute
                bottom-[15.9%]
                right-[10%]
                h-2.5
                w-2.5
                bg-ppc-500
                opacity-0
              "
            />

            {/* labels */}
            <span
              data-system-label
              className="
                absolute
                left-[4%]
                top-[17%]
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-graphite-400
              "
            >
              EQUIPO / GRAN FORMATO
            </span>

            <span
              data-system-label
              className="
                absolute
                right-[3%]
                top-[18%]
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-graphite-400
              "
            >
              SOPORTE TÉCNICO · HP
            </span>

            <span
              data-system-label
              className="
                absolute
                bottom-[4%]
                left-[28%]
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-graphite-300
              "
            >
              INSTALACIÓN / MANTENIMIENTO
            </span>
          </div>

          <div
            data-product-shadow
            className="
              pointer-events-none
              absolute
              bottom-[7%]
              left-[28%]
              z-[1]
              h-[9%]
              w-[52%]
              rounded-[50%]
              bg-graphite-950/13
              blur-[27px]
            "
          />

          <img
            ref={productImage}
            data-product-image
            src={PRODUCT_IMAGE}
            alt="Plotter profesional HP DesignJet"
            loading="eager"
            decoding="async"
            className="
              absolute
              bottom-[7%]
              right-[-1%]
              z-10
              h-[86%]
              w-[98%]
              max-w-none
              object-contain
              object-right-bottom
              will-change-transform

              xl:h-[88%]
            "
            style={{
              mixBlendMode: 'multiply',
              WebkitMaskImage:
                'radial-gradient(ellipse 74% 78% at 56% 54%, #000 54%, rgba(0,0,0,.94) 68%, rgba(0,0,0,.46) 83%, transparent 100%)',
              maskImage:
                'radial-gradient(ellipse 74% 78% at 56% 54%, #000 54%, rgba(0,0,0,.94) 68%, rgba(0,0,0,.46) 83%, transparent 100%)',
            }}
          />
        </div>

        {/* ==================================================
            BRAND BASELINE / DESKTOP
            La confianza vive dentro del Hero y sustituye la
            baseline genérica de Venta / Instalación / Soporte.
        ================================================== */}
        <div
          data-hero-baseline
          className="
            relative
            z-30
            hidden
            items-center
            border-t
            border-graphite-950/10
            py-4

            lg:relative
            lg:col-span-12
            lg:bottom-auto
            lg:left-auto
            lg:right-auto
            lg:mt-1
            lg:grid
            lg:grid-cols-[auto_minmax(0,1fr)_auto]
            lg:gap-6

            xl:mt-2
            xl:gap-8
          "
        >
          <span
            className="
              whitespace-nowrap
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.14em]
              text-graphite-400

              xl:text-[9px]
            "
          >
            Marcas que manejamos
          </span>

          <div
            data-hero-brands
            className="
              relative
              min-w-0
              overflow-hidden
            "
            aria-label="Marcas de equipos que maneja PPC Service Center"
          >
            <div
              className="
                flex
                w-max
                items-center
                animate-[hero-brands-marquee_34s_linear_infinite]
                will-change-transform
                hover:[animation-play-state:paused]
                motion-reduce:animate-none
              "
            >
              <div className="flex shrink-0 items-center gap-10 pr-10 xl:gap-12 xl:pr-12">
                {HERO_BRANDS.map((brand) => (
                  <div
                    key={`desktop-first-${brand.name}`}
                    className="flex h-10 w-[118px] shrink-0 items-center justify-center xl:w-[128px]"
                  >
                    <HeroBrandLogo brand={brand} />
                  </div>
                ))}
              </div>

              <div
                aria-hidden="true"
                className="flex shrink-0 items-center gap-10 pr-10 xl:gap-12 xl:pr-12"
              >
                {HERO_BRANDS.map((brand) => (
                  <div
                    key={`desktop-second-${brand.name}`}
                    className="flex h-10 w-[118px] shrink-0 items-center justify-center xl:w-[128px]"
                  >
                    <HeroBrandLogo brand={brand} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={goToSolutions}
            className="
              group
              inline-flex
              items-center
              gap-2
              whitespace-nowrap
              text-[10px]
              font-medium
              text-graphite-500
              transition-colors

              hover:text-graphite-950
            "
          >
            Explorar servicios

            <ArrowRight
              className="
                h-3.5
                w-3.5
                transition-transform
                duration-300

                group-hover:translate-x-1
              "
            />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes hero-brands-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }
      `}</style>
    </section>
  );
}