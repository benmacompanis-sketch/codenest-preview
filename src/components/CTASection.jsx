import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MagneticButton from './MagneticButton'
import { useLang } from '../i18n'
const WAIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#080808">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

gsap.registerPlugin(ScrollTrigger)



export default function CTASection() {
  const { t } = useLang()
  const WA = `https://wa.me/541134076364?text=${encodeURIComponent(t.wa.msgLong)}`
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-word', {
        scrollTrigger: { trigger: '.cta-word', start: 'top 96%' },
        y: 100, opacity: 0, duration: 1, stagger: 0.08, ease: 'power4.out',
      })
      gsap.from('.cta-sub', {
        scrollTrigger: { trigger: '.cta-sub', start: 'top 96%' },
        opacity: 0, y: 20, duration: 0.8, ease: 'power3.out',
      })
      gsap.from('.cta-btn', {
        scrollTrigger: { trigger: '.cta-btn', start: 'top 96%' },
        scale: 0.8, opacity: 0, duration: 0.7, ease: 'back.out(1.7)',
      })
      // Breathing glow
      gsap.to('.cta-glow', {
        scale: 1.25, opacity: 0.18, duration: 3.5,
        ease: 'sine.inOut', repeat: -1, yoyo: true,
      })
      // Floating dots
      gsap.utils.toArray('.cta-dot').forEach((dot, i) => {
        gsap.to(dot, {
          y: -18 - i * 6,
          x: i % 2 === 0 ? 10 : -10,
          duration: 2.5 + i * 0.4,
          ease: 'sine.inOut', repeat: -1, yoyo: true,
          delay: i * 0.3,
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      background: '#080808',
      padding: 'clamp(100px,14vw,180px) clamp(24px,5vw,80px)',
      textAlign: 'center',
      position: 'relative', overflow: 'hidden',
      borderTop: '1px solid rgba(240,237,230,0.05)',
    }}>
      {/* Breathing glow */}
      <div className="cta-glow" style={{
        position:'absolute', top:'50%', left:'50%',
        transform:'translate(-50%,-50%)',
        width:700, height:400, borderRadius:'50%',
        background:'radial-gradient(ellipse, rgba(94,210,156,0.1) 0%, transparent 65%)',
        filter:'blur(60px)', pointerEvents:'none',
      }}/>
      {/* Floating accent dots */}
      {[
        { top:'15%', left:'8%', size:6 },
        { top:'70%', left:'5%', size:4 },
        { top:'20%', right:'10%', size:5 },
        { top:'65%', right:'8%', size:3 },
        { top:'45%', left:'15%', size:3 },
      ].map((s, i) => (
        <div key={i} className="cta-dot" style={{
          position:'absolute', borderRadius:'50%',
          width: s.size, height: s.size,
          background:'#5ed29c', opacity:0.3,
          top:s.top, left:s.left, right:s.right,
          pointerEvents:'none',
        }}/>
      ))}

      <div style={{ maxWidth:900, margin:'0 auto', position:'relative', zIndex:1 }}>
        <h2 style={{ margin:'0 0 32px', lineHeight:0.95, letterSpacing:'-0.03em' }}>
          {t.cta.lines.map((line, li) => (
            <div key={li} style={{ overflow:'hidden' }}>
              <span className="cta-word" style={{
                display:'block',
                fontFamily:'Inter,sans-serif', fontWeight:900,
                fontSize:'clamp(40px,7vw,96px)',
                color: li === 2 ? '#5ed29c' : '#f0ede6',
                textShadow: li === 2 ? '0 0 80px rgba(94,210,156,0.4)' : 'none',
              }}>{line}</span>
            </div>
          ))}
        </h2>

        <p className="cta-sub" style={{
          fontFamily:'Inter,sans-serif', fontSize:16,
          color:'rgba(240,237,230,0.35)', lineHeight:1.7,
          margin:'0 auto 52px', maxWidth:420,
        }}>
          {t.cta.sub}
        </p>

        <div className="cta-btn">
          <MagneticButton
            href={WA} target="_blank" rel="noopener noreferrer"
            style={{
              display:'inline-flex', alignItems:'center', gap:10,
              background:'#5ed29c', color:'#080808',
              fontFamily:'Inter,sans-serif', fontWeight:700,
              fontSize:15, padding:'18px 44px', borderRadius:999,
              textDecoration:'none',
              transition:'box-shadow 0.3s',
            }}
          >
            <WAIcon />
            {t.cta.btn}
          </MagneticButton>
        </div>

        <p style={{
          fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:600,
          fontSize:10, color:'rgba(240,237,230,0.15)',
          letterSpacing:'0.2em', textTransform:'uppercase',
          marginTop:24,
        }}>{t.cta.note}</p>
      </div>
    </section>
  )
}
