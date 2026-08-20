/**
 * WhatsApp link builder — centralizes phone number and message templates.
 */

export const WHATSAPP_PHONE = '5215572318946';

export type WhatsAppContext =
  | 'general'
  | 'plotters'
  | 'consumables'
  | 'support'
  | 'maintenance'
  | 'equipment'
  | 'infrastructure'
  | 'printing'
  | 'security';

const MESSAGES: Record<WhatsAppContext, string> = {
  general:
    'Hola, encontré PPC ServiCenter en su sitio web y me gustaría cotizar una solución para mi empresa.',

  plotters:
    'Hola, me interesa cotizar un plotter y conocer las opciones de instalación, soporte y mantenimiento.',

  consumables:
    'Hola, necesito cotizar insumos, consumibles o papelería para mi empresa.',

  support:
    'Hola, necesito soporte técnico para una impresora o plotter y me gustaría conocer sus opciones de servicio.',

  maintenance:
    'Hola, me gustaría cotizar mantenimiento preventivo o correctivo para una impresora o plotter.',

  equipment:
    'Hola, me gustaría cotizar impresoras, plotters, equipo de cómputo o suministros para mi empresa.',

  infrastructure:
    'Hola, necesito información sobre redes e infraestructura tecnológica para mi empresa.',

  printing:
    'Hola, me gustaría cotizar soluciones de impresión para mi empresa.',

  security:
    'Hola, me gustaría cotizar una solución de videovigilancia o seguridad para mi empresa.',
};

export function buildWhatsAppUrl(
  context: WhatsAppContext = 'general',
): string {
  const message = encodeURIComponent(MESSAGES[context]);

  return `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
}