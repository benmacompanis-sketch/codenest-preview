import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton'
import { useTextScramble } from '../hooks/useTextScramble'
import Logo from './Logo'
import { useLang } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

const HLS   = 'https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8'


function VideoBackground({ videoRef }) {
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    let hls
    let cancelled = false

    // Safari plays HLS natively — no need to ship the 500KB library there.
    if (v.canPlayType('application/vnd.apple.mpegurl')) {
      v.src = HLS
    } else {
      // Load hls.js only once the page is interactive, so it never blocks first paint.
      import('hls.js').then(({ default: Hls }) => {
        if (cancelled || !Hls.isSupported()) return
        hls = new Hls({ enableWorker: false })
        hls.loadSource(HLS)
        hls.attachMedia(v)
      })
    }

    return () => { cancelled = true; hls?.destroy() }
  }, [])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <video ref={videoRef}
        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }}
        autoPlay muted loop playsInline crossOrigin="anonymous" />
      {/* Vignette */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, transparent 30%, #080808 100%)' }} />
      {/* Bottom gradient */}
      <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, #080808 0%, transparent 50%)' }} />
    </div>
  )
}

export default function HeroSection() {
  const sectionRef  = useRef(null)
  const videoRef    = useRef(null)
  const [ready, setReady] = useState(false)
  const { t } = useLang()
  const WA = `https://wa.me/541134076364?text=${encodeURIComponent(t.wa.msgLong)}`
  const TICKER = [...t.hero.ticker, ...t.hero.ticker]

  const { display: line1 } = useTextScramble(t.hero.lines[0], ready, 1100)
  const { display: line2 } = useTextScramble(t.hero.lines[1], ready, 1300)
  const { display: line3 } = useTextScramble(t.hero.lines[2], ready, 1500)

  // Trigger scramble after mount
  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 400)
    return () => clearTimeout(timer)
  }, [])

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-label', { opacity: 0, y: 20, duration: 0.7, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line',  { opacity: 0, y: 60, duration: 0.9, stagger: 0.08, delay: 0.5, ease: 'power4.out' })
      gsap.from('.hero-sub',   { opacity: 0, y: 20, duration: 0.7, delay: 1.1, ease: 'power3.out' })
      gsap.from('.hero-cta',   { opacity: 0, y: 20, duration: 0.7, delay: 1.3, ease: 'power3.out' })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Scroll pin + fade out
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=70%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        }
      })
      .to('.hero-content', { y: -80, opacity: 0, duration: 1 })
      .to(videoRef.current, { opacity: 0.1, duration: 1 }, '<')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="inicio" style={{
      height: '100vh', position: 'relative', overflow: 'hidden', background: '#080808',
    }}>
      <VideoBackground videoRef={videoRef} />

      {/* Main content */}
      <div className="hero-content" style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: 'clamp(20px, 5vw, 80px)',
        paddingTop: 'clamp(100px, 14vw, 160px)',
        maxWidth: 900,
        willChange: 'transform, opacity',
      }}>
        {/* Label */}
        <div className="hero-label" style={{ marginBottom: 36 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <span style={{ width:32, height:1, background:'#5ed29c', opacity:0.7 }} />
            <span style={{
              fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:11,
              color:'#5ed29c', letterSpacing:'0.22em', textTransform:'uppercase',
            }}>{t.hero.label}</span>
          </div>
        </div>

        {/* Headline */}
        <h1 style={{ margin:0, lineHeight:0.98 }}>
          {[line1, line2].map((line, i) => (
            <div key={i} className="hero-line" style={{ overflow:'hidden', fontSize:'clamp(44px, 7.5vw, 96px)', paddingBottom:'0.2em', marginBottom:'-0.2em' }}>
              <span style={{
                display:'block',
                fontFamily:'Inter,sans-serif', fontWeight:900,
                fontSize:'clamp(44px, 7.5vw, 96px)',
                color:'#f0ede6',
                letterSpacing:'-0.03em',
                fontVariantNumeric:'tabular-nums',
              }}>{line}</span>
            </div>
          ))}
          <div className="hero-line" style={{ overflow:'hidden', fontSize:'clamp(44px, 7.5vw, 96px)', paddingBottom:'0.2em', marginBottom:'-0.2em' }}>
            <span style={{
              display:'block',
              fontFamily:'Inter,sans-serif', fontWeight:900,
              fontSize:'clamp(44px, 7.5vw, 96px)',
              letterSpacing:'-0.03em',
            }}>
              <span style={{
                color:'#5ed29c',
                textShadow:'0 0 80px rgba(94,210,156,0.4)',
              }}>{line3}</span>
            </span>
          </div>
        </h1>

        <p className="hero-sub" style={{
          fontFamily:'Inter,sans-serif', fontSize:'clamp(14px,1.4vw,17px)',
          color:'rgba(240,237,230,0.45)', maxWidth:440, lineHeight:1.75,
          margin:'32px 0 40px',
        }}>
          {t.hero.sub}
        </p>

        {/* CTAs */}
        <div className="hero-cta" style={{ display:'flex', alignItems:'center', gap:20, flexWrap:'wrap' }}>
          <MagneticButton
            href={WA} target="_blank" rel="noopener noreferrer"
            style={{
              background:'#5ed29c', color:'#080808',
              fontFamily:'Inter,sans-serif', fontWeight:700,
              fontSize:13, letterSpacing:'0.06em', textTransform:'uppercase',
              padding:'15px 32px', borderRadius:999,
              textDecoration:'none',
              boxShadow:'0 0 0 0 rgba(94,210,156,0)',
              transition:'box-shadow 0.3s',
            }}
          >
            {t.hero.cta1}
          </MagneticButton>
          <MagneticButton
            href="#portfolio"
            style={{
              fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:14,
              color:'rgba(240,237,230,0.45)',
              textDecoration:'none',
              padding:'15px 0',
              transition:'color 0.2s',
            }}
          >
            {t.hero.cta2}
          </MagneticButton>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)',
        zIndex:4, display:'flex', flexDirection:'column', alignItems:'center', gap:6,
      }}>
        <p style={{
          fontFamily:'"Plus Jakarta Sans",sans-serif', fontSize:9,
          color:'rgba(240,237,230,0.2)', letterSpacing:'0.25em', textTransform:'uppercase',
        }}>{t.hero.scroll}</p>
        <div style={{ width:1, height:36, background:'rgba(240,237,230,0.2)' }} />
      </div>

      {/* Ticker */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, zIndex:4,
        borderTop:'1px solid rgba(240,237,230,0.05)',
        padding:'10px 0', overflow:'hidden',
        background:'rgba(8,8,8,0.6)', backdropFilter:'blur(10px)',
      }}>
        <div style={{ display:'flex', animation:'ticker 20s linear infinite', whiteSpace:'nowrap' }}>
          {TICKER.map((item, i) => (
            <span key={i} style={{
              display:'inline-flex', alignItems:'center', gap:14, marginRight:14,
              fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:600,
              fontSize:11, color:'rgba(240,237,230,0.3)',
              letterSpacing:'0.1em', flexShrink:0,
            }}>
              {item}<span style={{ color:'rgba(240,237,230,0.15)' }}>/</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (max-width: 768px) {
          .hero-content { max-width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
