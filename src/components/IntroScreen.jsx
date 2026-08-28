import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useLang } from '../i18n'

export default function IntroScreen({ onComplete }) {
  const containerRef     = useRef(null)
  const glowRef          = useRef(null)
  const switchWrapperRef = useRef(null)
  const buttonRef        = useRef(null)
  const buttonInnerRef   = useRef(null)
  const cursorRef        = useRef(null)
  const logoRef          = useRef(null)
  const flashRef         = useRef(null)
  const bulbRef          = useRef(null)
  const bulbGlowRef      = useRef(null)
  const bulbFillRef      = useRef(null)
  const raysRef          = useRef(null)
  const [gone, setGone]  = useState(false)
  const { t } = useLang()

  const finish = () => {
    document.body.style.overflow = ''
    setGone(true)
    onComplete?.()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const fallback = setTimeout(finish, 10000)
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // 1. Bulb + switch appear
      tl.fromTo(bulbRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.3 }
      )
      .fromTo(switchWrapperRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4'
      )

      // 2. Cursor enters and moves to button
      .fromTo(cursorRef.current,
        { x: isTouch ? 50 : 80, y: isTouch ? 80 : 100, opacity: 0 },
        { x: -8, y: -2, opacity: 1, duration: 1.0, ease: 'power3.out', delay: 0.2 }
      )

      // 3. Press button
      .to(cursorRef.current,   { scale: 0.85, y: 4, duration: 0.1 })
      .to(buttonRef.current,   { y: 4, duration: 0.1 }, '<')
      .to(buttonInnerRef.current, { attr: { fill: '#222' }, duration: 0.1 }, '<')

      // 4. Bulb flickers (fluorescent)
      .to(bulbFillRef.current,  { attr: { fill: '#5ed29c' }, opacity: 0.3, duration: 0.05, delay: 0.05 })
      .to(bulbFillRef.current,  { opacity: 0, duration: 0.05 })
      .to(bulbFillRef.current,  { opacity: 0.7, duration: 0.04 })
      .to(bulbFillRef.current,  { opacity: 0, duration: 0.06 })
      .to(bulbFillRef.current,  { opacity: 0.5, duration: 0.04 })
      .to(bulbFillRef.current,  { opacity: 0, duration: 0.08 })

      // 5. Bulb fully ON
      .to(bulbFillRef.current,  { opacity: 1, duration: 0.2, ease: 'power2.out' })
      .to(bulbGlowRef.current,  { opacity: 1, scale: 1.4, duration: 0.3, ease: 'power2.out' }, '<')
      .to(raysRef.current,      { opacity: 1, scale: 1.1, duration: 0.3, ease: 'back.out(2)' }, '<')

      // 6. Light explosion from bulb
      .to(glowRef.current,      { opacity: 1, scale: isTouch ? 3 : 5, duration: isTouch ? 0.5 : 0.7, ease: 'power3.in' }, '-=0.1')
      .to(switchWrapperRef.current, { opacity: 0, duration: 0.15 }, '-=0.4')
      .to(bulbRef.current,          { opacity: 0, duration: 0.15 }, '-=0.4')
      .to(cursorRef.current,        { opacity: 0, duration: 0.15 }, '-=0.4')

      // 7. Logo appears
      .to(logoRef.current, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.1')

      // 8. Flash → reveal
      .to(flashRef.current, { opacity: 1, duration: 0.3, delay: isTouch ? 0.4 : 0.6 })
      .to(containerRef.current, {
        opacity: 0, duration: 0.4, ease: 'power2.inOut',
        onComplete: () => { clearTimeout(fallback); finish() },
      })
    }, containerRef)

    return () => { ctx.revert(); clearTimeout(fallback); document.body.style.overflow = '' }
  }, [])

  if (gone) return null

  return (
    <div ref={containerRef} style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#080808',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center',
      gap: 32, overflow: 'hidden', willChange: 'opacity',
    }}>
      {/* Green radial glow — expands from bulb position */}
      <div ref={glowRef} style={{
        position: 'absolute',
        width: '80vw', height: '80vw',
        background: 'radial-gradient(circle, rgba(94,210,156,0.6) 0%, rgba(94,210,156,0) 65%)',
        borderRadius: '50%',
        opacity: 0, transform: 'scale(0)',
        top: '30%', left: '50%', marginLeft: '-40vw', marginTop: '-40vw',
        pointerEvents: 'none',
      }} />

      {/* Foquito / Lamparita */}
      <div ref={bulbRef} style={{ opacity: 0, position: 'relative', zIndex: 2 }}>
        {/* Halo de luz detrás del foco */}
        <div ref={bulbGlowRef} style={{
          position: 'absolute', top: '38%', left: '50%',
          transform: 'translate(-50%,-50%) scale(1)',
          width: 160, height: 160, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(94,210,156,0.7) 0%, rgba(94,210,156,0.2) 40%, transparent 70%)',
          opacity: 0, pointerEvents: 'none',
        }} />

        <svg width="100" height="140" viewBox="0 0 100 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rayos de luz */}
          <g ref={raysRef} style={{ opacity: 0, transformOrigin: '50px 46px' }}>
            {/* Arriba */}
            <line x1="50" y1="2"  x2="50" y2="16" stroke="#5ed29c" strokeWidth="3" strokeLinecap="round"/>
            {/* Arriba derecha */}
            <line x1="79" y1="11" x2="70" y2="20" stroke="#5ed29c" strokeWidth="3" strokeLinecap="round"/>
            {/* Derecha */}
            <line x1="90" y1="42" x2="76" y2="42" stroke="#5ed29c" strokeWidth="3" strokeLinecap="round"/>
            {/* Arriba izquierda */}
            <line x1="21" y1="11" x2="30" y2="20" stroke="#5ed29c" strokeWidth="3" strokeLinecap="round"/>
            {/* Izquierda */}
            <line x1="10" y1="42" x2="24" y2="42" stroke="#5ed29c" strokeWidth="3" strokeLinecap="round"/>
            {/* Abajo derecha diagonal */}
            <line x1="78" y1="70" x2="69" y2="63" stroke="#5ed29c" strokeWidth="2.5" strokeLinecap="round"/>
            {/* Abajo izquierda diagonal */}
            <line x1="22" y1="70" x2="31" y2="63" stroke="#5ed29c" strokeWidth="2.5" strokeLinecap="round"/>
          </g>

          {/* Vidrio del foco — fondo oscuro */}
          <path d="M50 10 C28 10 14 24 14 42 C14 56 21 67 33 73 L33 88 L67 88 L67 73 C79 67 86 56 86 42 C86 24 72 10 50 10 Z"
            fill="#141414" stroke="#2a2a2a" strokeWidth="1.5"/>

          {/* Brillo interno del vidrio (reflejo) */}
          <path d="M34 20 Q38 15 46 14" stroke="rgba(255,255,255,0.08)" strokeWidth="3" strokeLinecap="round" fill="none"/>

          {/* Relleno de luz (se prende) */}
          <path ref={bulbFillRef}
            d="M50 10 C28 10 14 24 14 42 C14 56 21 67 33 73 L33 88 L67 88 L67 73 C79 67 86 56 86 42 C86 24 72 10 50 10 Z"
            fill="#5ed29c" opacity="0"/>

          {/* Filamento — en forma de W */}
          <path d="M38 68 L41 56 L45 65 L50 54 L55 65 L59 56 L62 68"
            stroke="#666" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>

          {/* Soporte del filamento */}
          <line x1="44" y1="68" x2="44" y2="74" stroke="#555" strokeWidth="1.5"/>
          <line x1="56" y1="68" x2="56" y2="74" stroke="#555" strokeWidth="1.5"/>

          {/* Base — estrías metálicas */}
          <rect x="33" y="88" width="34" height="9" rx="3" fill="#252525" stroke="#3a3a3a" strokeWidth="1"/>
          <line x1="33" y1="93" x2="67" y2="93" stroke="#1a1a1a" strokeWidth="1"/>
          <rect x="35" y="97" width="30" height="8" rx="2.5" fill="#1e1e1e" stroke="#333" strokeWidth="1"/>
          <line x1="35" y1="101" x2="65" y2="101" stroke="#161616" strokeWidth="1"/>
          <rect x="37" y="105" width="26" height="8" rx="2" fill="#181818" stroke="#2e2e2e" strokeWidth="1"/>

          {/* Contacto inferior (culote) */}
          <rect x="44" y="113" width="12" height="6" rx="2" fill="#111" stroke="#333" strokeWidth="1"/>
          <rect x="46" y="119" width="8" height="4" rx="1.5" fill="#0a0a0a" stroke="#2a2a2a" strokeWidth="1"/>
        </svg>
      </div>

      {/* Switch + cursor */}
      <div ref={switchWrapperRef} style={{ position: 'relative', zIndex: 2, opacity: 0 }}>
        <svg width="100" height="150" viewBox="0 0 120 180"
          style={{ filter: 'drop-shadow(0px 8px 16px rgba(0,0,0,0.6))' }}>
          <defs>
            <filter id="inset-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feOffset dx="0" dy="4"/>
              <feGaussianBlur stdDeviation="4" result="offset-blur"/>
              <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse"/>
              <feFlood floodColor="black" floodOpacity="0.7" result="color"/>
              <feComposite operator="in" in="color" in2="inverse" result="shadow"/>
              <feComposite operator="over" in="shadow" in2="SourceGraphic"/>
            </filter>
            <linearGradient id="plate-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2a2a2a"/>
              <stop offset="100%" stopColor="#151515"/>
            </linearGradient>
          </defs>
          <rect x="10" y="10" width="100" height="160" rx="16" fill="url(#plate-grad)" stroke="#333" strokeWidth="1"/>
          <circle cx="60" cy="90" r="32" fill="#050505" filter="url(#inset-shadow)"/>
          <g ref={buttonRef}>
            <circle ref={buttonInnerRef} cx="60" cy="90" r="28" fill="#e0e0e0"/>
            <circle cx="60" cy="90" r="28" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2"/>
          </g>
        </svg>

        {/* Cursor */}
        <div ref={cursorRef} style={{
          position: 'absolute', top: '75px', left: '50px',
          zIndex: 10, opacity: 0,
        }}>
          <svg width="46" height="46" viewBox="0 0 24 24" fill="#ffffff"
            stroke="#000" strokeWidth="0.5"
            style={{ filter: 'drop-shadow(0px 3px 5px rgba(0,0,0,0.6))' }}>
            <path d="M10.5 2.5C10.5 1.67 11.17 1 12 1C12.83 1 13.5 1.67 13.5 2.5V10H14.5C14.78 10 15.06 10.05 15.31 10.15L19.46 11.81C20.37 12.17 21 13.06 21 14.04V18C21 20.21 19.21 22 17 22H11.5C9.91 22 8.44 21.05 7.68 19.64L5.18 15.06C4.85 14.45 4.96 13.68 5.46 13.18L6.82 11.82C7.2 11.45 7.78 11.39 8.22 11.69L10.5 13.25V2.5Z"/>
          </svg>
        </div>
      </div>

      {/* Logo */}
      <div ref={logoRef} style={{
        position: 'absolute', zIndex: 3,
        opacity: 0, transform: 'scale(0.8)', textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
      }}>
        {/* Ícono + nombre en una fila */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 0, justifyContent: 'center', marginBottom: 14 }}>
          <img
            src="/logo-brand.png"
            alt=""
            style={{ height: 'clamp(100px,16vw,160px)', width: 'auto' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, textAlign: 'left' }}>
            <span style={{
              fontFamily: 'Inter,sans-serif', fontWeight: 900,
              fontSize: 'clamp(36px,7vw,72px)', color: '#f0ede6',
              letterSpacing: '-0.03em', lineHeight: 1,
              textShadow: '0 0 40px rgba(94,210,156,0.35)',
            }}>I.D.E.A <span style={{ color: '#5ed29c' }}>Code</span></span>
            <span style={{
              fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 600,
              fontSize: 'clamp(8px,1.1vw,12px)', color: 'rgba(240,237,230,0.45)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
            }}>{t.nav.tagline}</span>
          </div>
        </div>
        {/* Línea divisora */}
        <div style={{ width: 'clamp(200px,40vw,400px)', height: 1, background: 'rgba(94,210,156,0.25)', marginBottom: 14 }} />
        {/* Tagline */}
        <p style={{
          fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 700,
          fontSize: 'clamp(9px,1.1vw,12px)', color: 'rgba(240,237,230,0.4)',
          letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0,
        }}>{t.intro.tagline}</p>
      </div>

      {/* Flash */}
      <div ref={flashRef} style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, #ffffff 0%, #5ed29c 50%, #080808 100%)',
        opacity: 0, zIndex: 10, pointerEvents: 'none',
      }} />
    </div>
  )
}
