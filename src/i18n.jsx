import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'idea-lang'

export const TRANSLATIONS = {
  es: {
    nav: {
      tagline: 'Innovación Digital para Empresas y Agencias',
      links: ['Servicios', 'Portfolio', 'Proceso', 'Nosotros'],
      contact: 'Contacto',
      close: 'cerrar ✕',
    },
    hero: {
      label: 'Agencia de IA y Marketing Digital',
      lines: ['Presencia digital.', 'Soluciones.', 'Resultados.'],
      sub: 'Webs, automatizaciones, tiendas online y más — todo lo que tu negocio necesita para crecer en internet.',
      cta1: 'Solicitar presupuesto →',
      cta2: 'Ver trabajos',
      scroll: 'scroll',
      ticker: ['Sitios Web', 'E-commerce', 'Aplicaciones', 'Software a Medida', 'Automatizaciones', 'Inteligencia Artificial', 'Branding'],
    },
    services: {
      label: 'Servicios',
      title: 'Todo lo que necesitás',
      titleAccent: 'online.',
      hint: 'Seleccioná un servicio para ver el detalle.',
      items: [
        { title: 'Sitios Web y Landing Pages', desc: 'Tu presencia profesional en internet: diseño a medida, carga rápida, optimizado para Google y perfecto en celular. La base de todo negocio digital.' },
        { title: 'Tiendas Online', desc: 'E-commerce completo con carrito, filtros, pasarela de pago y panel de administración. Vendé tus productos las 24 horas, sin intermediarios.' },
        { title: 'Sistemas de Reservas y Turnos', desc: 'Calendario online, confirmación automática y panel de gestión. Ideal para barberías, consultorios, veterinarias, salones y estudios.' },
        { title: 'Portales y Catálogos', desc: 'Listados con filtros avanzados, galería y formulario de consulta. Para inmobiliarias, productos, propiedades, cursos o cualquier catálogo.' },
        { title: 'Paneles de Gestión', desc: 'Fichas de clientes con historial, próximas citas, notas y métricas de tu negocio. Toda tu operación ordenada en un solo lugar.' },
        { title: 'Aplicaciones Web y Móviles', desc: 'Aplicaciones que tus clientes instalan en el celular y quedan con ícono propio, funcionan sin conexión y envían notificaciones. Toda la potencia de una app nativa, sin depender de las tiendas.' },
        { title: 'Desarrollo de Software a Medida', desc: '¿Tu negocio necesita algo que no existe? Lo construimos desde cero: aplicaciones web, sistemas internos, calculadoras, integraciones con APIs y herramientas hechas exactamente para tu operación.' },
        { title: 'Automatizaciones e IA', desc: 'Recordatorios por WhatsApp, respuestas automáticas, emails, chatbots con inteligencia artificial y conexión entre tus herramientas. Ahorrás tiempo y no perdés ningún cliente.' },
        { title: 'Branding e Identidad Visual', desc: 'Logo, paleta de colores, tipografías y guía de estilo. Una identidad coherente en tu web, tus redes y todo tu material digital.' },
        { title: 'Mantenimiento y Soporte', desc: 'Plan mensual con cambios, actualizaciones, corrección de errores y mejoras continuas. Acompañamiento sostenido después del lanzamiento.' },
      ],
      customTitle: '¿Necesitás algo que no está en la lista?',
      customDesc: 'Contanos tu idea y la evaluamos sin cargo. Los presupuestos se acuerdan de forma privada.',
      customBtn: 'Hablemos →',
      customWa: 'Hola! Tengo una idea que no está en el listado, ¿podemos hablar?',
    },
    portfolio: {
      label: 'Portfolio',
      title: 'Proyectos que',
      title2: 'hablan por sí',
      titleAccent: 'solos.',
      sub: 'Diseño a medida para cada rubro y objetivo.',
      cats: ['Limpieza Láser y Restauración', 'Inmobiliaria', 'Veterinaria', 'Gastronomía'],
      tags: ['Restauración de superficies', 'Inmuebles · CABA', 'Clínica · Caballito', 'Bar & Cocina · Buenos Aires'],
    },
    process: {
      label: 'Cómo trabajamos',
      title: 'Simple, claro',
      title2: 'y',
      titleAccent: 'sin vueltas.',
      steps: [
        { title: 'Consulta', desc: 'Analizamos tu proyecto, definimos objetivos y te entregamos un presupuesto detallado.' },
        { title: 'Diseño', desc: 'Desarrollamos la propuesta visual completa para tu aprobación antes de escribir una línea de código.' },
        { title: 'Desarrollo', desc: 'Construimos la solución con tecnología moderna, optimizada en rendimiento y posicionamiento en buscadores.' },
        { title: 'Lanzamiento', desc: 'Publicamos el proyecto y te entregamos todos los accesos. Ofrecemos un plan de mantenimiento mensual para cambios, actualizaciones y soporte.' },
      ],
    },
    about: {
      label: 'Nosotros',
      title: 'Somos',
      titleAccent: 'I.D.E.A Code.',
      p1: 'Somos una agencia digital orientada a resultados. Creemos que toda empresa merece una presencia profesional y efectiva, sin importar su tamaño.',
      p2: 'Trabajamos de forma ágil y transparente: seguís el avance real del proyecto en cada etapa, con plazos definidos y sin costos ocultos.',
      p3a: 'Incorporamos ',
      p3b: 'inteligencia artificial',
      p3c: ' en nuestro flujo de trabajo para acelerar tiempos y elevar el nivel de detalle, sin resignar el criterio humano detrás de cada decisión.',
      stats: ['Proyectos entregados', 'Clientes satisfechos', 'Tipos de soluciones', 'Tiempo de respuesta'],
      faqLabel: 'Preguntas frecuentes',
      qa: [
        { q: '¿Quiénes son?', a: 'Benicio Nasello Bruno y Andrés Mayo, CEO y fundadores de I.D.E.A Code. Combinamos desarrollo, diseño y automatización para entregar soluciones digitales completas, con el mismo estándar de calidad sin importar la escala del proyecto.' },
        { q: '¿Qué significa I.D.E.A?', a: 'Innovación Digital para Empresas y Agencias. Una buena idea, bien ejecutada, transforma un negocio — y eso es exactamente a lo que nos dedicamos.' },
        { q: '¿Cómo trabajan?', a: 'Comenzamos por entender tu negocio y sus objetivos. Presentamos una propuesta de diseño para tu aprobación antes de iniciar el desarrollo, e incorporamos inteligencia artificial para acelerar los tiempos sin resignar calidad. Seguís avances reales en cada etapa.' },
        { q: '¿Dónde están?', a: 'Operamos de forma 100% remota desde Argentina para clientes de todo el mundo. Coordinamos por WhatsApp, videollamada o el canal que te resulte más cómodo.' },
        { q: '¿Cuánto cuesta?', a: 'Cada proyecto tiene un alcance distinto, por eso trabajamos con presupuestos personalizados. Escribinos por WhatsApp y recibí una propuesta sin compromiso en menos de 24 horas.' },
      ],
    },
    cta: {
      lines: ['¿Listo para', 'llevar tu negocio', 'online?'],
      sub: 'Escribinos y recibí una respuesta en menos de 24 horas. Sin compromiso.',
      btn: 'Escribinos por WhatsApp',
      note: 'Respondemos en menos de 24hs',
    },
    footer: {
      desc: 'Soluciones digitales que hacen crecer tu negocio. Comprometidos con cada proyecto, de principio a fin.',
      navLabel: 'Navegación',
      contactLabel: 'Contacto',
      mailSoon: 'Email corporativo próximamente',
      rights: 'Todos los derechos reservados.',
      https: 'Sitio protegido con HTTPS',
      madeBy: 'Diseñado y desarrollado por I.D.E.A Code',
    },
    wa: {
      title: '¡Hablemos de tu proyecto!',
      sub: 'Respuesta en menos de 24h',
      msg: 'Hola! Me interesa saber más sobre I.D.E.A Code. ¿Podemos hablar?',
      msgLong: 'Hola! Me interesa llevar mi negocio a internet con I.D.E.A Code. ¿Podemos hablar?',
    },
    intro: { tagline: 'Agencia de IA y Marketing Digital' },
    meta: {
      title: 'I.D.E.A Code — Agencia de IA y Marketing Digital',
      desc: 'I.D.E.A Code: sitios web profesionales, tiendas online, aplicaciones, desarrollo de software a medida, automatizaciones con inteligencia artificial y branding.',
    },
  },

  en: {
    nav: {
      tagline: 'Digital Innovation for Businesses and Agencies',
      links: ['Services', 'Portfolio', 'Process', 'About'],
      contact: 'Contact',
      close: 'close ✕',
    },
    hero: {
      label: 'AI & Digital Marketing Agency',
      lines: ['Digital presence.', 'Solutions.', 'Results.'],
      sub: 'Websites, automations, online stores and more — everything your business needs to grow online.',
      cta1: 'Request a quote →',
      cta2: 'View work',
      scroll: 'scroll',
      ticker: ['Websites', 'E-commerce', 'Apps', 'Custom Software', 'Automations', 'Artificial Intelligence', 'Branding'],
    },
    services: {
      label: 'Services',
      title: 'Everything you need',
      titleAccent: 'online.',
      hint: 'Select a service to see the details.',
      items: [
        { title: 'Websites & Landing Pages', desc: 'Your professional presence online: custom design, fast loading, optimized for Google and flawless on mobile. The foundation of every digital business.' },
        { title: 'Online Stores', desc: 'Full e-commerce with cart, filters, payment gateway and admin panel. Sell your products 24/7, with no middlemen.' },
        { title: 'Booking & Appointment Systems', desc: 'Online calendar, automatic confirmations and management panel. Ideal for barbershops, clinics, vets, salons and studios.' },
        { title: 'Portals & Catalogs', desc: 'Listings with advanced filters, gallery and inquiry form. For real estate, products, properties, courses or any catalog.' },
        { title: 'Management Dashboards', desc: 'Client records with history, upcoming appointments, notes and business metrics. Your whole operation organized in one place.' },
        { title: 'Web & Mobile Apps', desc: 'Apps your clients install on their phone with their own icon, working offline and sending push notifications. The power of a native app, without depending on the stores.' },
        { title: 'Custom Software Development', desc: 'Does your business need something that doesn\'t exist yet? We build it from scratch: web apps, internal systems, calculators, API integrations and tools made exactly for your operation.' },
        { title: 'Automations & AI', desc: 'WhatsApp reminders, automatic replies, emails, AI-powered chatbots and connections between your tools. Save time and never lose a client.' },
        { title: 'Branding & Visual Identity', desc: 'Logo, color palette, typography and style guide. A consistent identity across your website, social media and all your digital material.' },
        { title: 'Maintenance & Support', desc: 'Monthly plan covering changes, updates, bug fixes and continuous improvements. Sustained support after launch.' },
      ],
      customTitle: 'Need something that isn\'t listed?',
      customDesc: 'Tell us your idea and we will assess it at no cost. Quotes are agreed privately.',
      customBtn: 'Let\'s talk →',
      customWa: 'Hi! I have an idea that isn\'t on the list, can we talk?',
    },
    portfolio: {
      label: 'Portfolio',
      title: 'Projects that',
      title2: 'speak for',
      titleAccent: 'themselves.',
      sub: 'Custom design for every industry and goal.',
      cats: ['Laser Cleaning & Restoration', 'Real Estate', 'Veterinary', 'Restaurant'],
      tags: ['Surface restoration', 'Properties · Buenos Aires', 'Clinic · Caballito', 'Bar & Kitchen · Buenos Aires'],
    },
    process: {
      label: 'How we work',
      title: 'Simple, clear',
      title2: 'and',
      titleAccent: 'straightforward.',
      steps: [
        { title: 'Consultation', desc: 'We analyse your project, define objectives and provide a detailed quote.' },
        { title: 'Design', desc: 'We develop the full visual proposal for your approval before writing a single line of code.' },
        { title: 'Development', desc: 'We build the solution with modern technology, optimised for performance and search visibility.' },
        { title: 'Launch', desc: 'We publish the project and hand over every access credential. We offer a monthly maintenance plan for changes, updates and support.' },
      ],
    },
    about: {
      label: 'About us',
      title: 'We are',
      titleAccent: 'I.D.E.A Code.',
      p1: 'We are a results-driven digital agency. We believe every company deserves a professional and effective online presence, regardless of its size.',
      p2: 'We work efficiently and transparently: you follow real progress at every stage, with defined timelines and no hidden costs.',
      p3a: 'We bring ',
      p3b: 'artificial intelligence',
      p3c: ' into our workflow to accelerate delivery and raise the level of detail, without giving up the human judgement behind every decision.',
      stats: ['Projects delivered', 'Happy clients', 'Types of solutions', 'Response time'],
      faqLabel: 'Frequently asked questions',
      qa: [
        { q: 'Who are you?', a: 'Benicio Nasello Bruno and Andrés Mayo, CEOs and founders of I.D.E.A Code. We combine development, design and automation to deliver complete digital solutions, holding the same quality standard regardless of project scale.' },
        { q: 'What does I.D.E.A mean?', a: 'Digital Innovation for Businesses and Agencies (Innovación Digital para Empresas y Agencias). A good idea, well executed, transforms a business — and that is precisely what we do.' },
        { q: 'How do you work?', a: 'We begin by understanding your business and its objectives. We present a design proposal for your approval before development starts, and apply artificial intelligence to accelerate delivery without compromising quality. You follow real progress at every stage.' },
        { q: 'Where are you based?', a: 'We operate fully remotely from Argentina for clients worldwide. We coordinate via WhatsApp, video call or whichever channel suits you best.' },
        { q: 'How much does it cost?', a: 'Every project has a different scope, so we work with tailored quotes. Message us on WhatsApp and receive a no-commitment proposal within 24 hours.' },
      ],
    },
    cta: {
      lines: ['Ready to take', 'your business', 'online?'],
      sub: 'Message us and receive a reply within 24 hours. No commitment.',
      btn: 'Message us on WhatsApp',
      note: 'We reply in under 24h',
    },
    footer: {
      desc: 'Digital solutions that grow your business. Committed to every project, start to finish.',
      navLabel: 'Navigation',
      contactLabel: 'Contact',
      mailSoon: 'Corporate email coming soon',
      rights: 'All rights reserved.',
      https: 'Site secured with HTTPS',
      madeBy: 'Designed and developed by I.D.E.A Code',
    },
    wa: {
      title: 'Let\'s talk about your project!',
      sub: 'Reply in under 24h',
      msg: 'Hi! I\'d like to know more about I.D.E.A Code. Can we talk?',
      msgLong: 'Hi! I\'d like to bring my business online with I.D.E.A Code. Can we talk?',
    },
    intro: { tagline: 'AI & Digital Marketing Agency' },
    meta: {
      title: 'I.D.E.A Code — AI & Digital Marketing Agency',
      desc: 'I.D.E.A Code: professional websites, online stores, apps, custom software development, AI-powered automations and branding.',
    },
  },
}

const LangContext = createContext(null)

function detectInitial() {
  if (typeof window === 'undefined') return 'es'
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved === 'es' || saved === 'en') return saved
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'es'
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitial)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    const t = TRANSLATIONS[lang].meta
    document.title = t.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.desc)
  }, [lang])

  const toggle = () => setLang(l => (l === 'es' ? 'en' : 'es'))

  return (
    <LangContext.Provider value={{ lang, setLang, toggle, t: TRANSLATIONS[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LanguageProvider')
  return ctx
}
