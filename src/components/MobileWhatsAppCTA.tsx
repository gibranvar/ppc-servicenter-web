import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { trackWhatsAppClick } from '@/lib/analytics';


export default function MobileWhatsAppCTA() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cta = ctaRef.current;
    if (!cta) return;

    const hero = document.querySelector<HTMLElement>('#top');
    const finalCTA = document.querySelector<HTMLElement>('#contacto');

    let isVisible = false;
    let rafId = 0;
    let activeTween: gsap.core.Tween | null = null;

    gsap.set(cta, {
      y: 12,
      scale: 0.985,
      autoAlpha: 0,
      filter: 'blur(7px)',
      pointerEvents: 'none',
      transformOrigin: 'center bottom',
    });

    const showCTA = () => {
      if (isVisible) return;
      isVisible = true;

      activeTween?.kill();

      activeTween = gsap.to(cta, {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 0.78,
        ease: 'expo.out',
        pointerEvents: 'auto',
        overwrite: 'auto',
      });
    };

    const hideCTA = (immediate = false) => {
      if (!isVisible && !immediate) return;
      isVisible = false;

      activeTween?.kill();
      activeTween = null;

      if (immediate) {
        gsap.set(cta, {
          y: 8,
          scale: 0.99,
          autoAlpha: 0,
          filter: 'blur(4px)',
          pointerEvents: 'none',
        });
        return;
      }

      activeTween = gsap.to(cta, {
        y: 8,
        scale: 0.99,
        autoAlpha: 0,
        filter: 'blur(4px)',
        duration: 0.34,
        ease: 'power2.out',
        pointerEvents: 'none',
        overwrite: 'auto',
      });
    };

    const syncCTA = () => {
      rafId = 0;

      const viewportHeight = window.innerHeight;

      // Aparece cuando el final del Hero llega al 88% del viewport.
      const heroPassed = hero
        ? hero.getBoundingClientRect().bottom <= viewportHeight * 0.88
        : true;

      // Desaparece justo cuando empieza a entrar el CTA final.
      const finalCTAReached = finalCTA
        ? finalCTA.getBoundingClientRect().top <= viewportHeight
        : false;

      if (heroPassed && !finalCTAReached) {
        showCTA();
      } else {
        hideCTA();
      }
    };

    const requestSync = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(syncCTA);
    };

    // Estado correcto desde el primer frame, incluso con deep links.
    hideCTA(true);
    requestSync();

    window.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);

    return () => {
      window.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      activeTween?.kill();
      activeTween = null;
    };
  }, []);

  return (
    <div
      ref={ctaRef}
      className="
        fixed
        inset-x-3
        z-40

        md:hidden

        bottom-[max(12px,env(safe-area-inset-bottom))]
      "
      role="region"
      aria-label="Contacto por WhatsApp"
    >
      <a
        href={buildWhatsAppUrl('general')}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackWhatsAppClick({
            location: 'mobile-sticky',
            context: 'general',
            label: 'Hablar con PPC',
          })
        }
        className="
          group
          relative
          flex
          min-h-[68px]
          w-full
          items-center
          justify-between
          gap-4
          overflow-hidden
          border
          border-white/[0.62]
          bg-paper-50/[0.82]
          px-4
          py-3
          text-graphite-950

          shadow-[0_16px_42px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.78)]
          backdrop-blur-[22px]
          backdrop-saturate-150

          transition-[transform,background-color,border-color]
          duration-300

          active:scale-[0.985]
        "
      >
        <span
          className="
            absolute
            left-0
            top-0
            h-px
            w-[72px]
            bg-ppc-500
            transition-[width]
            duration-500

            group-hover:w-full
          "
          aria-hidden="true"
        />

        <span className="flex min-w-0 items-center gap-3">
          <span
            className="
              relative
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              bg-graphite-950
              text-[9px]
              font-semibold
              text-white
            "
          >
            PPC
            <span className="absolute -right-1 -top-1 h-2 w-2 bg-ppc-500" />
          </span>

          <span className="min-w-0">
            <span
              className="
                block
                font-mono
                text-[7px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-graphite-400
              "
            >
              EQUIPO / SOPORTE
            </span>

            <span
              className="
                mt-1
                block
                truncate
                text-[13px]
                font-medium
                leading-none
                tracking-[-0.015em]
                text-graphite-950
              "
            >
              Hablar con PPC
            </span>
          </span>
        </span>

        <span
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            border
            border-graphite-950/12
            bg-white/[0.72]
            text-graphite-950

            transition-all
            duration-300

            group-hover:border-graphite-950
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
            strokeWidth={1.6}
          />
        </span>
      </a>
    </div>
  );
}