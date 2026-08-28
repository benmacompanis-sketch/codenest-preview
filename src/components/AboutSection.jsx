import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useLang } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { display: '12+' },
  { display: '100%' },
  { display: '9' },
  { display: '48hs' },
]


function Stat({ display, label }) {
  return (
    <div style={{ borderTop: '1px solid rgba(240,237,230,0.1)', paddingTop: 24 }}>
      <div style={{
        fontFamily: 'Inter,sans-serif', fontWeight: 900,
        fontSize: 'clamp(40px,4.5vw,58px)', color: '#f0ede6',
        lineHeight: 1, letterSpacing: '-0.03em',
      }}>
        {display}
      </div>
      <p style={{
        fontFamily: '"Plus Jakarta Sans",sans-serif', fontWeight: 600,
        fontSize: 11, color: 'rgba(240,237,230,0.4)',
        letterSpacing: '0.1em', textTransform: 'uppercase',
        margin: '10px 0 0',
      }}>{label}</p>
    </div>
  )
}

function QACard({ q, a }) {
  const [open, setOpen] = useState(false)
  const bodyRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    gsap.killTweensOf(el)
    if (open) {
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: el.scrollHeight, opacity: 1, duration: 0.35, ease: 'power3.out',
          onComplete: () => { el.style.height = 'auto' } }
      )
    } else {
      gsap.fromTo(el,
        { height: el.scrollHeight },
        { height: 0, opacity: 0, duration: 0.25, ease: 'power3.in' }
      )
    }
  }, [open])

  return (
    <div style={{ borderTop: '1px solid rgba(240,237,230,0.08)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%', textAlign: 'left', background: 'transparent',
          border: 'none', padding: '20px 0', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
        }}
      >
        <span style={{
          fontFamily: 'Inter,sans-serif', fontWeight: 700,
          fontSize: 'clamp(15px,1.4vw,17px)',
          color: open ? '#ffffff' : '#f0ede6', transition: 'color 0.2s',
        }}>{q}</span>
        <span aria-hidden="true" style={{
          color: '#5ed29c', fontSize: 20, lineHeight: 1, flexShrink: 0,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.25s ease',
          display: 'inline-block',
        }}>+</span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: 'hidden', opacity: 0 }}>
        <p style={{
          fontFamily: 'Inter,sans-serif', fontSize: 14,
          color: 'rgba(240,237,230,0.6)', lineHeight: 1.7,
          margin: '0 0 20px', maxWidth: 620,
        }}>{a}</p>
      </div>
    </div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef(null)
  const { t } = useLang()
  const stats = STATS.map((s, i) => ({ ...s, label: t.about.stats[i] }))

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      gsap.from('.about-left', {
        scrollTrigger: { trigger: '.about-left', start: 'top 94%' },
        y: 28, opacity: 0, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.about-right', {
        scrollTrigger: { trigger: '.about-right', start: 'top 94%' },
        y: 28, opacity: 0, duration: 0.7, delay: 0.1, ease: 'power3.out',
      })
      gsap.utils.toArray('.about-qa-item').forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: 'top 96%' },
          y: 16, opacity: 0, duration: 0.5, delay: i * 0.04, ease: 'power3.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="nosotros" style={{
      background: '#080808',
      padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
      borderTop: '1px solid rgba(240,237,230,0.06)',
      position: 'relative',
    }}>
      <div style={{ maxWidth:1100, margin:'0 auto', position:'relative', zIndex:1 }}>

        {/* Top: texto + stats */}
        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap:'clamp(40px,8vw,100px)',
          alignItems:'start',
          marginBottom: 'clamp(60px,8vw,100px)',
        }}>
          <div className="about-left">
            <p style={{
              fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:11,
              color:'rgba(240,237,230,0.4)', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:20,
            }}>{t.about.label}</p>
            <h2 style={{
              fontFamily:'Inter,sans-serif', fontWeight:900,
              fontSize:'clamp(32px,4vw,52px)', color:'#f0ede6',
              lineHeight:1.1, margin:'0 0 28px', letterSpacing:'-0.02em',
            }}>
              {t.about.title}<br /><span style={{ color:'#5ed29c' }}>{t.about.titleAccent}</span>
            </h2>
            <p style={{
              fontFamily:'Inter,sans-serif', fontSize:15,
              color:'rgba(240,237,230,0.6)', lineHeight:1.7, margin:'0 0 20px',
            }}>
              {t.about.p1}
            </p>
            <p style={{
              fontFamily:'Inter,sans-serif', fontSize:15,
              color:'rgba(240,237,230,0.6)', lineHeight:1.7, margin:'0 0 20px',
            }}>
              {t.about.p2}
            </p>
            <p style={{
              fontFamily:'Inter,sans-serif', fontSize:15,
              color:'rgba(240,237,230,0.6)', lineHeight:1.7, margin:'0 0 32px',
            }}>
              {t.about.p3a}<span style={{ color:'#5ed29c', fontWeight:600 }}>{t.about.p3b}</span>{t.about.p3c}
            </p>

            {/* Redes sociales */}
            <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              {[
                { label:'@ideacode._', href:'https://instagram.com/ideacode._', platform:'Instagram' },
                { label:'@idea.code',  href:'https://tiktok.com/@idea.code',    platform:'TikTok' },
              ].map(({ label, href, platform }) => (
                <a key={platform} href={href} target="_blank" rel="noopener noreferrer" style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:12,
                  color:'rgba(240,237,230,0.6)', textDecoration:'none',
                  border:'1px solid rgba(240,237,230,0.14)',
                  borderRadius:8, padding:'8px 14px',
                  transition:'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color='#f0ede6'; e.currentTarget.style.borderColor='rgba(240,237,230,0.35)' }}
                onMouseLeave={e => { e.currentTarget.style.color='rgba(240,237,230,0.6)'; e.currentTarget.style.borderColor='rgba(240,237,230,0.14)' }}
                >
                  <span style={{ fontSize:10, letterSpacing:'0.08em', textTransform:'uppercase', opacity:0.6 }}>{platform}</span>
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="about-right" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:28 }}>
            {stats.map((s, i) => <Stat key={i} {...s} />)}
          </div>
        </div>

        {/* Q&A */}
        <div>
          <p style={{
            fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:11,
            color:'rgba(240,237,230,0.4)', letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:24,
          }}>{t.about.faqLabel}</p>
          {t.about.qa.map((item, i) => (
            <div key={i} className="about-qa-item">
              <QACard {...item} />
            </div>
          ))}
          <div style={{ borderTop:'1px solid rgba(240,237,230,0.08)' }} />
        </div>

      </div>
    </section>
  )
}
