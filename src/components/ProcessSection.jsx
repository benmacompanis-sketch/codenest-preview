import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useLang } from '../i18n'

gsap.registerPlugin(ScrollTrigger)


function StepCard({ num, title, desc }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="proc-step"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 24px',
        borderRadius: 16,
        border: `1px solid ${hovered ? 'rgba(94,210,156,0.3)' : 'rgba(240,237,230,0.06)'}`,
        background: hovered ? 'rgba(94,210,156,0.04)' : 'transparent',
        transition: 'border-color 0.35s, background 0.35s, transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        cursor: 'default',
        position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <span style={{
          fontFamily:'Inter,sans-serif', fontWeight:900, fontSize:11,
          color: hovered ? '#5ed29c' : 'rgba(94,210,156,0.5)',
          letterSpacing:'0.15em', transition: 'color 0.3s',
        }}>{num}</span>
        <div style={{
          flex:1, height:1,
          background: hovered
            ? 'linear-gradient(to right, rgba(94,210,156,0.7), transparent)'
            : 'rgba(94,210,156,0.15)',
          transition: 'background 0.4s',
        }} />
      </div>
      <h3 style={{
        fontFamily:'Inter,sans-serif', fontWeight:700,
        fontSize:20, color: hovered ? '#ffffff' : '#f0ede6',
        margin:'0 0 12px', letterSpacing:'-0.01em', transition: 'color 0.3s',
      }}>{title}</h3>
      <p style={{
        fontFamily:'Inter,sans-serif', fontSize:14,
        color: hovered ? 'rgba(240,237,230,0.65)' : 'rgba(240,237,230,0.4)',
        lineHeight:1.7, margin:0, transition: 'color 0.3s',
      }}>{desc}</p>
      <div style={{
        height: 2, borderRadius: 2,
        background: 'linear-gradient(to right, #5ed29c, transparent)',
        marginTop: 24,
        transform: hovered ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform 0.45s cubic-bezier(0.25,0.46,0.45,0.94)',
      }} />
    </div>
  )
}

export default function ProcessSection() {
  const sectionRef = useRef(null)
  const { t } = useLang()
  const STEPS = t.process.steps.map((st, i) => ({ num: String(i + 1).padStart(2, '0'), ...st }))

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proc-label', {
        scrollTrigger: { trigger: '.proc-label', start: 'top 96%' },
        x: -30, opacity: 0, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.proc-title', {
        scrollTrigger: { trigger: '.proc-title', start: 'top 96%' },
        y: 70, opacity: 0, duration: 1, ease: 'power4.out',
      })
      gsap.utils.toArray('.proc-step').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 96%' },
          y: 60, opacity: 0, duration: 0.8, delay: i * 0.06, ease: 'power3.out',
        })
      })
      gsap.to('.proc-bg-num', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        y: -80,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="proceso" style={{
      background: '#0d0d0d',
      padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
      borderTop: '1px solid rgba(240,237,230,0.05)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div className="proc-bg-num" style={{
        position:'absolute', bottom: -40, right: -20,
        fontFamily:'Inter,sans-serif', fontWeight:900,
        fontSize:'clamp(160px,22vw,320px)',
        color:'#f0ede6', opacity:0.025,
        lineHeight:1, pointerEvents:'none', userSelect:'none', letterSpacing:'-0.05em',
      }}>04</div>

      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <p className="proc-label" style={{
          fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:11,
          color:'#5ed29c', letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:16,
        }}>{t.process.label}</p>
        <h2 className="proc-title" style={{
          fontFamily:'Inter,sans-serif', fontWeight:900,
          fontSize:'clamp(36px,5vw,64px)', color:'#f0ede6',
          lineHeight:1.05, margin:'0 0 72px', letterSpacing:'-0.02em', maxWidth:560,
        }}>
          {t.process.title}<br />{t.process.title2} <span style={{ color:'#5ed29c' }}>{t.process.titleAccent}</span>
        </h2>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(220px,1fr))',
          gap:'clamp(16px,2vw,20px)',
        }}>
          {STEPS.map(({ num, title, desc }) => (
            <StepCard key={num} num={num} title={title} desc={desc} />
          ))}
        </div>
      </div>
    </section>
  )
}
