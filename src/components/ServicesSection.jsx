import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe, ShoppingBag, Calendar, LayoutGrid, Gauge, Smartphone, Code2, Sparkles, Palette, LifeBuoy } from 'lucide-react'
import { useLang } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

const ICONS = [Globe, ShoppingBag, Calendar, LayoutGrid, Gauge, Smartphone, Code2, Sparkles, Palette, LifeBuoy]

function ServiceRow({ num, icon: Icon, title, desc, index }) {
  const [open, setOpen] = useState(false)
  const descRef = useRef(null)

  useEffect(() => {
    const el = descRef.current
    if (!el) return
    gsap.killTweensOf(el)
    if (open) {
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: el.scrollHeight, opacity: 1, duration: 0.4, ease: 'power3.out',
          onComplete: () => { el.style.height = 'auto' } }
      )
    } else {
      gsap.fromTo(el,
        { height: el.scrollHeight },
        { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' }
      )
    }
  }, [open])

  return (
    <div
      className="srv-row"
      onClick={() => setOpen(o => !o)}
      style={{
        borderTop: '1px solid rgba(240,237,230,0.06)',
        padding: '0',
        cursor: 'pointer',
        background: open ? 'rgba(94,210,156,0.03)' : 'transparent',
        transition: 'background 0.3s',
      }}
    >
      <div style={{ display:'flex', alignItems:'center', gap:24, padding:'24px 16px 24px 0' }}
        onMouseEnter={e => { if(!open) e.currentTarget.parentElement.style.background='rgba(94,210,156,0.02)' }}
        onMouseLeave={e => { if(!open) e.currentTarget.parentElement.style.background='transparent' }}
      >
        <span className="srv-num" style={{
          fontFamily:'Inter,sans-serif', fontWeight:900, fontSize:12,
          color: open ? '#5ed29c' : 'rgba(240,237,230,0.15)',
          letterSpacing:'0.1em', minWidth:32,
          transition:'color 0.2s',
        }}>{num}</span>

        <div style={{
          width:38, height:38, borderRadius:10, flexShrink:0,
          background: open ? 'rgba(94,210,156,0.15)' : 'rgba(94,210,156,0.08)',
          display:'flex', alignItems:'center', justifyContent:'center',
          transition:'background 0.3s',
        }}>
          <Icon size={17} color="#5ed29c" />
        </div>

        <span style={{
          fontFamily:'Inter,sans-serif', fontWeight:700,
          fontSize:'clamp(15px,2vw,21px)',
          color: open ? '#f0ede6' : '#c8c4bd',
          flex:1, letterSpacing:'-0.01em',
          transition:'color 0.2s',
        }}>{title}</span>

        <span style={{
          fontFamily:'Inter,sans-serif', fontSize:18,
          color:'rgba(94,210,156,0.5)', marginLeft:'auto', flexShrink:0,
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition:'transform 0.3s',
          display:'inline-block', lineHeight:1,
        }}>+</span>
      </div>

      {/* Expandable description */}
      <div ref={descRef} style={{ height:0, overflow:'hidden', opacity:0 }}>
        <p style={{
          fontFamily:'Inter,sans-serif', fontSize:14,
          color:'rgba(240,237,230,0.5)', lineHeight:1.75,
          margin:'0 0 20px', paddingLeft:86,
        }}>{desc}</p>
      </div>
    </div>
  )
}

export default function ServicesSection() {
  const { t } = useLang()
  const SERVICES = t.services.items.map((it, i) => ({
    num: String(i + 1).padStart(2, '0'),
    icon: ICONS[i],
    title: it.title,
    desc: it.desc,
  }))
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.srv-title', {
        scrollTrigger: { trigger: '.srv-title', start: 'top 96%' },
        y: 80, opacity: 0, duration: 1, ease: 'power4.out',
      })
      gsap.utils.toArray('.srv-row').forEach((row) => {
        gsap.from(row, {
          scrollTrigger: { trigger: row, start: 'top 96%' },
          x: -40, opacity: 0, duration: 0.6, ease: 'power3.out',
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="servicios" style={{
      background: '#080808',
      padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
      borderTop: '1px solid rgba(240,237,230,0.05)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:72, flexWrap:'wrap', gap:20 }}>
          <div>
            <p style={{
              fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:11,
              color:'#5ed29c', letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:16,
            }}>{t.services.label}</p>
            <h2 className="srv-title" style={{
              fontFamily:'Inter,sans-serif', fontWeight:900,
              fontSize:'clamp(36px,5vw,64px)', color:'#f0ede6',
              lineHeight:1.05, margin:0, letterSpacing:'-0.02em',
            }}>
              {t.services.title}<br /><span style={{ color:'#5ed29c' }}>{t.services.titleAccent}</span>
            </h2>
          </div>
          <p style={{
            fontFamily:'Inter,sans-serif', fontSize:14,
            color:'rgba(240,237,230,0.35)', maxWidth:280, lineHeight:1.7, margin:0,
          }}>
            {t.services.hint}
          </p>
        </div>

        <div>
          {SERVICES.map((s, i) => <ServiceRow key={i} {...s} index={i} />)}
          <div style={{ borderTop:'1px solid rgba(240,237,230,0.06)' }} />
        </div>

        {/* Custom service note */}
        <div style={{
          marginTop: 48,
          padding: '28px 32px',
          borderRadius: 16,
          border: '1px solid rgba(94,210,156,0.15)',
          background: 'rgba(94,210,156,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}>
          <div>
            <p style={{ fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:16, color:'#f0ede6', margin:'0 0 6px' }}>
              {t.services.customTitle}
            </p>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'rgba(240,237,230,0.4)', margin:0 }}>
              {t.services.customDesc}
            </p>
          </div>
          <a
            href={`https://wa.me/541134076364?text=${encodeURIComponent(t.services.customWa)}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:13,
              background:'#5ed29c', color:'#080808',
              padding:'12px 24px', borderRadius:999, textDecoration:'none',
              letterSpacing:'0.04em', flexShrink:0, whiteSpace:'nowrap',
            }}
          >
            {t.services.customBtn}
          </a>
        </div>

      </div>
    </section>
  )
}
