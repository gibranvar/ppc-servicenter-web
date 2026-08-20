import type { WhatsAppContext } from '@/lib/whatsapp';

export const NAV_LINKS = [
  { label: 'Plotters', href: '#plotters' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Cómo trabajamos', href: '#proceso' },
] as const;

export const HERO = {
  label: 'PPC / Tecnología empresarial',
  headlineLines: ['EQUIPOS.', 'INSUMOS.', 'SOPORTE.'],
  supporting:
    'Venta y soporte de plotters, impresión, insumos, cómputo, redes y videovigilancia para empresas en México.',
  ctaLabel: 'Cotizar por WhatsApp',
  secondaryLabel: 'Ver soluciones',
  ticker: ['PLOTTERS', 'INSUMOS', 'IMPRESIÓN', 'CÓMPUTO', 'REDES', 'CCTV', 'SOPORTE'],
} as const;

export interface ProductFocusItem {
  index: string;
  kicker: string;
  title: string;
  description: string;
  detail: string;
  ctaLabel: string;
  context: WhatsAppContext;
}

export const PRODUCT_FOCUS: ProductFocusItem[] = [
  {
    index: '01',
    kicker: 'Gran formato',
    title: 'Plotters',
    description:
      'Equipos para arquitectura, ingeniería, diseño y producción. Te ayudamos a elegir, instalar y mantener la solución adecuada.',
    detail: 'Venta / instalación / soporte / mantenimiento',
    ctaLabel: 'Cotizar un plotter',
    context: 'plotters',
  },
  {
    index: '02',
    kicker: 'Suministro',
    title: 'Insumos',
    description:
      'Tintas, tóner, consumibles y suministros para mantener tus equipos trabajando sin convertir cada reposición en un problema.',
    detail: 'Tintas / tóner / consumibles / refacciones',
    ctaLabel: 'Cotizar insumos',
    context: 'consumables',
  },
  {
    index: '03',
    kicker: 'Equipamiento',
    title: 'Tecnología',
    description:
      'Computadoras, impresoras, accesorios y equipo empresarial preparado para integrarse a tu operación.',
    detail: 'Cómputo / impresión / accesorios / configuración',
    ctaLabel: 'Cotizar equipo',
    context: 'equipment',
  },
];

export interface ServiceItem {
  index: string;
  name: string;
  description: string;
  meta: string;
  context: WhatsAppContext;
  ctaLabel: string;
}

export const SERVICES: ServiceItem[] = [
  {
    index: '01',
    name: 'Plotters y gran formato',
    description: 'Venta, instalación, configuración, mantenimiento y soporte para equipos de gran formato.',
    meta: 'VENTA + SOPORTE',
    context: 'plotters',
    ctaLabel: 'Cotizar plotter',
  },
  {
    index: '02',
    name: 'Impresión e insumos',
    description: 'Impresoras, multifuncionales, tintas, tóner, consumibles y suministros para tu operación.',
    meta: 'EQUIPO + SUMINISTRO',
    context: 'printing',
    ctaLabel: 'Cotizar impresión',
  },
  {
    index: '03',
    name: 'Cómputo y equipamiento',
    description: 'Computadoras, estaciones de trabajo y accesorios configurados para integrarse a tu empresa.',
    meta: 'VENTA + CONFIGURACIÓN',
    context: 'equipment',
    ctaLabel: 'Cotizar equipo',
  },
  {
    index: '04',
    name: 'Soporte IT',
    description: 'Atención remota y en sitio para resolver incidentes y mantener operando los equipos de tu empresa.',
    meta: 'REMOTO + EN SITIO',
    context: 'support',
    ctaLabel: 'Solicitar soporte',
  },
  {
    index: '05',
    name: 'Mantenimiento',
    description: 'Servicio preventivo y correctivo para reducir fallas, extender vida útil y evitar interrupciones.',
    meta: 'PREVENTIVO + CORRECTIVO',
    context: 'maintenance',
    ctaLabel: 'Cotizar mantenimiento',
  },
  {
    index: '06',
    name: 'Redes e infraestructura',
    description: 'Diseño, instalación y configuración de redes cableadas, inalámbricas e infraestructura tecnológica.',
    meta: 'DISEÑO + INSTALACIÓN',
    context: 'infrastructure',
    ctaLabel: 'Hablar con un especialista',
  },
  {
    index: '07',
    name: 'Videovigilancia',
    description: 'Cámaras y soluciones de seguridad para proteger instalaciones, equipos y operación.',
    meta: 'SEGURIDAD + CCTV',
    context: 'security',
    ctaLabel: 'Cotizar CCTV',
  },
];

export const SYSTEM_NODES = [
  { label: 'PLOTTERS', x: 50, y: 12 },
  { label: 'IMPRESIÓN', x: 82, y: 34 },
  { label: 'CÓMPUTO', x: 75, y: 76 },
  { label: 'SOPORTE', x: 25, y: 76 },
  { label: 'REDES', x: 18, y: 34 },
] as const;

export const PROCESS = [
  {
    index: '01',
    title: 'Dinos qué necesitas.',
    desc: 'Un equipo, insumos, mantenimiento o una solución completa. Empezamos por entender lo que necesitas resolver.',
  },
  {
    index: '02',
    title: 'Revisamos la mejor opción.',
    desc: 'Un especialista valida requerimientos, compatibilidad y alcance antes de recomendar una solución.',
  },
  {
    index: '03',
    title: 'Cotizamos por WhatsApp.',
    desc: 'Sin formularios largos. Continuamos la conversación directamente para agilizar la cotización.',
  },
  {
    index: '04',
    title: 'Entregamos y seguimos contigo.',
    desc: 'Podemos apoyar con instalación, configuración, mantenimiento y soporte después de la compra.',
  },
] as const;

export const FAQ = [
  {
    q: '¿Venden plotters?',
    a: 'Sí. PPC Service Center puede ayudarte a cotizar equipos de gran formato y acompañarte con instalación, configuración, mantenimiento y soporte.',
  },
  {
    q: '¿También manejan tintas, tóner e insumos?',
    a: 'Sí. Manejamos soluciones de impresión e insumos para empresas. Envíanos por WhatsApp el modelo de tu equipo o el consumible que necesitas para revisar la opción adecuada.',
  },
  {
    q: '¿Puedo comprar equipo y contratar soporte con ustedes?',
    a: 'Sí. La idea es que puedas resolver compra, instalación, configuración, mantenimiento y soporte con un mismo proveedor.',
  },
  {
    q: '¿Dan soporte en sitio?',
    a: 'Sí, dependiendo del servicio y la ubicación. También podemos resolver ciertos incidentes de forma remota para agilizar la atención.',
  },
  {
    q: '¿Manejan mantenimiento preventivo y correctivo?',
    a: 'Sí. Podemos atender mantenimiento preventivo y correctivo para distintos tipos de equipo empresarial.',
  },
  {
    q: '¿También instalan redes y videovigilancia?',
    a: 'Sí. PPC también trabaja con redes, infraestructura y soluciones de videovigilancia para empresas.',
  },
  {
    q: '¿Cómo solicito una cotización?',
    a: 'Escríbenos por WhatsApp. Cuéntanos qué equipo, insumo o servicio necesitas y un especialista continúa contigo directamente.',
  },
] as const;

export const FINAL_CTA = {
  eyebrow: 'PPC / COTIZACIONES',
  headline: '¿QUÉ NECESITA TU OPERACIÓN?',
  supporting:
    'Cuéntanos si buscas un plotter, insumos, equipo o soporte. Te ayudamos a encontrar la solución adecuada.',
  ctaLabel: 'Cotizar por WhatsApp',
  note: 'Conversación directa con un especialista.',
} as const;

export const FOOTER = {
  company: 'PPC Service Center',
  statement: 'Equipo, impresión, infraestructura y soporte tecnológico para empresas en México.',
  whatsapp: 'Cotizar por WhatsApp',
  privacy: 'Aviso de privacidad',
  copyright: '© PPC Service Center. Todos los derechos reservados.',
} as const;
