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
        borderRadius: 10,
        border: `1px solid ${hovered ? 'rgba(240,237,230,0.2)' : 'rgba(240,237,230,0.08)'}`,
        background: hovered ? 'rgba(240,237,230,0.03)' : 'transparent',
        transition: 'border-color 0.3s, background 0.3s',
        cursor: 'default',
        position: 'relative',
      }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
        <span style={{
          fontFamily:'Inter,sans-serif', fontWeight:900, fontSize:12,
          color:'#5ed29c',
          letterSpacing:'0.1em',
        }}>{num}</span>
        <div style={{ flex:1, height:1, background:'rgba(240,237,230,0.1)' }} />
      </div>
      <h3 style={{
        fontFamily:'Inter,sans-serif', fontWeight:700,
        fontSize:19, color:'#f0ede6',
        margin:'0 0 12px', letterSpacing:'-0.01em',
      }}>{title}</h3>
      <p style={{
        fontFamily:'Inter,sans-serif', fontSize:14,
        color:'rgba(240,237,230,0.5)',
        lineHeight:1.65, margin:0,
      }}>{desc}</p>
    </div>
  )
}

export default function ProcessSection() {
  const sectionRef = useRef(null)
  const { t } = useLang()
  const STEPS = t.process.steps.map((st, i) => ({ num: String(i + 1).padStart(2, '0'), ...st }))

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.proc-label', {
        scrollTrigger: { trigger: '.proc-label', start: 'top 94%' },
        y: 16, opacity: 0, duration: 0.6, ease: 'power3.out',
      })
      gsap.from('.proc-title', {
        scrollTrigger: { trigger: '.proc-title', start: 'top 94%' },
        y: 32, opacity: 0, duration: 0.7, ease: 'power3.out',
      })
      gsap.utils.toArray('.proc-step').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 94%' },
          y: 28, opacity: 0, duration: 0.6, delay: i * 0.06, ease: 'power3.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="proceso" style={{
      background: '#0d0d0d',
      padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
      borderTop: '1px solid rgba(240,237,230,0.06)',
      position: 'relative',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>
        <p className="proc-label" style={{
          fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:11,
          color:'rgba(240,237,230,0.4)', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:16,
        }}>{t.process.label}</p>
        <h2 className="proc-title" style={{
          fontFamily:'Inter,sans-serif', fontWeight:900,
          fontSize:'clamp(36px,5vw,60px)', color:'#f0ede6',
          lineHeight:1.05, margin:'0 0 64px', letterSpacing:'-0.02em', maxWidth:560,
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
