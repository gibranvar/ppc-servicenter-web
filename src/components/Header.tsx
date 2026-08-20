import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';

import { buildWhatsAppUrl } from '@/lib/whatsapp';
import {
  trackNavigationClick,
  trackWhatsAppClick,
} from '@/lib/analytics';

const NAV_LINKS = [
  {
    label: 'Servicios',
    href: '#soluciones',
    meta: 'Plotters, impresoras, venta y soporte',
  },
  {
    label: 'Equipos',
    href: '#equipos',
    meta: 'Plotters, impresoras, insumos y consumibles',
  },
  {
    label: 'Tecnología',
    href: '#servicios',
    meta: 'Cómputo, redes, infraestructura y CCTV',
  },
  {
    label: 'Soporte',
    href: '#soporte',
    meta: 'Impresoras, plotters y equipos HP',
  },
  {
    label: 'Mantenimiento',
    href: '#por-que-ppc',
    meta: 'Preventivo, correctivo y continuidad operativa',
  },
  {
    label: 'FAQ',
    href: '#faq',
    meta: 'Equipos, soporte y servicio',
  },
] as const;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuTriggerRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    // Move focus outside the menu BEFORE aria-hidden becomes true.
    // This avoids Chrome's "Blocked aria-hidden..." accessibility warning.
    menuTriggerRef.current?.focus({
      preventScroll: true,
    });

    setMenuOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    // `inert` keeps every hidden link/button out of keyboard focus and
    // out of interaction while the full-screen menu is closed.
    mobileNavigationRef.current?.toggleAttribute('inert', !menuOpen);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    let focusFrame = 0;

    if (menuOpen) {
      window.addEventListener('keydown', onKeyDown);

      // Once the menu is visible, move focus into it.
      focusFrame = window.requestAnimationFrame(() => {
        closeButtonRef.current?.focus({
          preventScroll: true,
        });
      });
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);

      if (focusFrame) {
        window.cancelAnimationFrame(focusFrame);
      }
    };
  }, [menuOpen]);

  const goTo = (label: string, href: string) => {
    trackNavigationClick({
      target: label,
    });

    if (menuOpen) {
      closeMenu();
    }

    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <>
      {/* =====================================================
          HEADER
          Mobile / tablet <1024: full width
          Desktop >=1024: floating / centered
      ====================================================== */}
      <header
        className="
          fixed
          inset-x-0
          top-0
          z-50

          lg:top-5
          lg:px-6

          xl:top-6
          xl:px-8
        "
      >
        <div
          className={`
            mx-auto
            flex
            h-[68px]
            w-full
            items-center
            justify-between
            px-6

            transition-[background-color,border-color,box-shadow,backdrop-filter]
            duration-500
            ease-out-expo

            sm:px-8

            lg:h-[66px]
            lg:max-w-[1320px]
            lg:rounded-[18px]
            lg:border
            lg:px-6

            xl:h-[70px]
            xl:max-w-[1360px]
            xl:px-7

            ${
              scrolled
                ? `
                  border-b
                  border-white/[0.62]
                  bg-paper-50/[0.80]
                  shadow-[0_12px_38px_rgba(15,23,42,0.10),inset_0_1px_0_rgba(255,255,255,0.78)]
                  backdrop-blur-[22px]
                  backdrop-saturate-150

                  lg:border-white/[0.68]
                  lg:bg-paper-50/[0.74]
                  lg:shadow-[0_18px_55px_rgba(15,23,42,0.13),inset_0_1px_0_rgba(255,255,255,0.82)]
                  lg:backdrop-blur-[24px]
                `
                : `
                  border-b
                  border-white/[0.42]
                  bg-paper-50/[0.66]
                  shadow-[0_8px_28px_rgba(15,23,42,0.055),inset_0_1px_0_rgba(255,255,255,0.66)]
                  backdrop-blur-[18px]
                  backdrop-saturate-150

                  lg:border-white/[0.62]
                  lg:bg-paper-50/[0.82]
                  lg:shadow-[0_12px_34px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.76)]
                  lg:backdrop-blur-[20px]
                `
            }
          `}
        >
          {/* LOGO */}
          <button
            type="button"
            onClick={() => goTo('logo', '#top')}
            className="flex shrink-0 items-center gap-2.5 text-left sm:gap-3"
            aria-label="PPC Service Center — inicio"
          >
            <span
              className="
                relative
                flex
                h-8
                w-8
                items-center
                justify-center
                bg-graphite-950
                text-[11px]
                font-bold
                tracking-[-0.08em]
                text-white
              "
            >
              PPC

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  h-2
                  w-2
                  bg-ppc-500
                "
              />
            </span>

            <span
              className="
                block
                font-mono
                text-[8px]
                uppercase
                leading-[1.15]
                tracking-[0.15em]
                text-graphite-600

                min-[380px]:text-[9px]

                sm:text-[10px]
                sm:tracking-[0.16em]

                lg:text-[9px]

                xl:text-[10px]
              "
            >
              Servi
              <br />
              Center
            </span>
          </button>

          {/* =====================================================
              DESKTOP NAV
          ====================================================== */}
          <nav
            className="
              hidden
              items-center

              lg:flex
              lg:gap-3

              xl:gap-5
            "
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(link.label, link.href);
                }}
                className="
                  group
                  flex
                  items-center
                  gap-1.5
                  whitespace-nowrap
                  text-[11px]
                  font-medium
                  text-graphite-650
                  transition-colors
                  duration-300

                  hover:text-graphite-950

                  xl:gap-2
                  xl:text-[12px]
                "
              >
                <span
                  className="
                    font-mono
                    text-[8px]
                    text-graphite-350

                    xl:text-[9px]
                  "
                >
                 
                </span>

                <span>{link.label}</span>
              </a>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Desktop CTA */}
            <a
              href={buildWhatsAppUrl('general')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackWhatsAppClick({
                  location: 'header',
                  context: 'general',
                  label: 'Cotizar',
                })
              }
              className="
                group
                hidden
                items-center
                bg-graphite-950
                font-medium
                text-white
                transition-colors
                duration-300

                hover:bg-ppc-500

                lg:inline-flex
                lg:gap-2
                lg:px-4
                lg:py-2.5
                lg:text-[12px]

                xl:gap-3
                xl:px-5
                xl:py-3
                xl:text-[13px]
              "
            >
              Cotizar

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

            {/* =====================================================
                MOBILE / TABLET MENU TRIGGER
                Dos líneas propias, más limpio que icono genérico.
            ====================================================== */}
            <button
              ref={menuTriggerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="
                group
                inline-flex
                h-11
                items-center
                gap-3
                border
                border-graphite-950/14
                px-3.5
                text-graphite-950
                transition-colors
                duration-300

                hover:border-graphite-950/30
                hover:bg-white/50

                lg:hidden
              "
            >
              <span
                aria-hidden="true"
                className="
                  relative
                  block
                  h-[12px]
                  w-[18px]
                "
              >
                <span
                  className="
                    absolute
                    left-0
                    top-[2px]
                    h-px
                    w-[18px]
                    bg-current
                    transition-transform
                    duration-300

                    group-hover:translate-x-0.5
                  "
                />

                <span
                  className="
                    absolute
                    bottom-[2px]
                    left-0
                    h-px
                    w-[12px]
                    bg-current
                    transition-[width,transform]
                    duration-300

                    group-hover:w-[18px]
                  "
                />
              </span>

              <span
                className="
                  hidden
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.16em]

                  min-[380px]:block

                  sm:text-[10px]
                "
              >
                Menú
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE / TABLET MENU
          Full-screen editorial navigation.
          Mobile: single column.
          Tablet: nav + information rail.
      ====================================================== */}
      <div
        ref={mobileNavigationRef}
        id="mobile-navigation"
        className={`
          fixed
          inset-0
          z-[60]
          overflow-y-auto
          bg-graphite-950
          text-white

          transition-[clip-path]
          duration-700
          ease-out-expo

          lg:hidden

          ${
            menuOpen
              ? '[clip-path:inset(0_0_0_0)]'
              : 'pointer-events-none [clip-path:inset(0_0_0_100%)]'
          }
        `}
        aria-hidden={!menuOpen}
      >
        <div className="container-page flex min-h-[100svh] flex-col">
          {/* TOP */}
          <div
            className="
              flex
              h-[68px]
              shrink-0
              items-center
              justify-between
              border-b
              border-white/[0.10]
            "
          >
            <button
              type="button"
              onClick={() => goTo('logo-menu', '#top')}
              className="flex items-center gap-2.5 text-left"
              aria-label="PPC Service Center — inicio"
            >
              <span
                className="
                  relative
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  bg-white
                  text-[11px]
                  font-bold
                  tracking-[-0.08em]
                  text-graphite-950
                "
              >
                PPC
                <span className="absolute -right-1 -top-1 h-2 w-2 bg-ppc-400" />
              </span>

              <span
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  leading-[1.15]
                  tracking-[0.16em]
                  text-white/[0.50]

                  min-[380px]:text-[9px]
                "
              >
                Service
                <br />
                Center
              </span>
            </button>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="
                group
                inline-flex
                h-11
                items-center
                gap-2.5
                border
                border-white/[0.14]
                px-3.5
                text-white
                transition-colors
                duration-300

                hover:border-white/[0.28]
                hover:bg-white
                hover:text-graphite-950
              "
            >
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.15em] min-[380px]:block">
                Cerrar
              </span>

              <X
                className="
                  h-4
                  w-4
                  transition-transform
                  duration-300

                  group-hover:rotate-90
                "
                strokeWidth={1.6}
              />
            </button>
          </div>

          {/* CONTENT */}
          <div
            className="
              grid
              flex-1
              pt-12
              pb-8

              sm:pt-14
              sm:pb-10

              md:grid-cols-[minmax(0,1fr)_250px]
              md:gap-12
              md:py-12
            "
          >
            {/* NAV */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-2 w-2 bg-ppc-400" />
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/[0.32]">
                  NAVEGACIÓN
                </span>
              </div>

              <nav
                className="border-t border-white/[0.10]"
                aria-label="Navegación móvil"
              >
                {NAV_LINKS.map((link, index) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => {
                      event.preventDefault();
                      goTo(link.label, link.href);
                    }}
                    style={{
                      transitionDelay: menuOpen
                        ? `${100 + index * 45}ms`
                        : '0ms',
                    }}
                    className={`
                      group
                      grid
                      w-full
                      grid-cols-[34px_1fr_auto]
                      items-center
                      gap-3
                      border-b
                      border-white/[0.10]
                      py-4
                      text-left
                      transition-[opacity,transform,color]
                      duration-500

                      sm:grid-cols-[40px_1fr_auto]
                      sm:py-5

                      ${
                        menuOpen
                          ? 'translate-x-0 opacity-100'
                          : 'translate-x-5 opacity-0'
                      }
                    `}
                  >
                    <span
                      className="
                        font-mono
                        text-[8px]
                        text-white/[0.40]

                        sm:text-[9px]
                      "
                    >
                      0{index + 1}
                    </span>

                    <span>
                      <span
                        className="
                          block
                          text-[clamp(1.55rem,7vw,2.35rem)]
                          font-medium
                          leading-none
                          tracking-[-0.045em]
                          transition-colors
                          duration-300

                          group-hover:text-ppc-300

                          md:text-[2rem]
                        "
                      >
                        {link.label}
                      </span>

                      <span
                        className="
                          mt-1.5
                          block
                          text-[10px]
                          leading-[1.4]
                          text-white/[0.60]

                          sm:text-[11px]
                        "
                      >
                        {link.meta}
                      </span>
                    </span>

                    <ArrowUpRight
                      className="
                        h-4
                        w-4
                        text-white/[0.30]
                        transition-all
                        duration-300

                        group-hover:translate-x-0.5
                        group-hover:-translate-y-0.5
                        group-hover:text-white
                      "
                      strokeWidth={1.5}
                    />
                  </a>
                ))}
              </nav>
            </div>

            {/* TABLET SIDE RAIL */}
            <aside
              className="
                mt-10
                hidden
                border-l
                border-white/[0.10]
                pl-8

                md:flex
                md:flex-col
                md:justify-between
              "
            >
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/[0.28]">
                  PPC / SERVICE CENTER
                </p>

                <p
                  className="
                    mt-5
                    max-w-[190px]
                    text-[1.15rem]
                    font-medium
                    leading-[1.12]
                    tracking-[-0.025em]
                    text-white/[0.82]
                  "
                >
                  Impresión profesional, equipos y soporte técnico.
                </p>
              </div>

              <div className="pb-1">
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/[0.28]">
                  CONTACTO
                </p>

                <a
                  href={buildWhatsAppUrl('general')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackWhatsAppClick({
                      location: 'header',
                      context: 'general',
                      label: 'WhatsApp — Menú tablet',
                    });

                    closeMenu();
                  }}
                  className="
                    group
                    mt-4
                    inline-flex
                    items-center
                    gap-2
                    text-[13px]
                    font-medium
                    text-white
                    transition-colors
                    duration-300

                    hover:text-ppc-300
                  "
                >
                  WhatsApp

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
            </aside>
          </div>

          {/* MOBILE FOOTER
              Sin CTA duplicado: la web ya tiene su CTA flotante.
          */}
          <div
            className="
              shrink-0
              border-t
              border-white/[0.10]
              pt-4
              pb-7

              min-[430px]:pb-8

              md:hidden
            "
          >
            <div
              className="
                flex
                items-end
                justify-between
                gap-6
              "
            >
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/[0.26]">
                  PPC / SERVICE CENTER
                </p>

                <p className="mt-2 max-w-[190px] text-[11px] leading-[1.45] text-white/[0.42]">
                  Impresión profesional, equipos y soporte técnico.
                </p>
              </div>

              <span
                className="
                  mb-0.5
                  h-2
                  w-2
                  shrink-0
                  bg-ppc-400
                "
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}