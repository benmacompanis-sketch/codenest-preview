import { useEffect, useState } from 'react'
import Logo from './Logo'
import { asset } from '../utils/assetPath'
import { useLang } from '../i18n'

const HREFS = ['#servicios', '#portfolio', '#proceso', '#nosotros']

function LangSwitch({ compact }) {
  const { lang, setLang } = useLang()
  return (
    <div style={{
      display:'flex', alignItems:'center',
      border:'1px solid rgba(240,237,230,0.12)', borderRadius:8,
      padding:2, gap:2, flexShrink:0,
    }}>
      {['es','en'].map(code => (
        <button key={code} onClick={() => setLang(code)}
          aria-label={code === 'es' ? 'Español' : 'English'}
          aria-pressed={lang === code}
          style={{
            fontFamily:'Inter,sans-serif', fontWeight:700,
            fontSize: compact ? 13 : 11, letterSpacing:'0.08em',
            textTransform:'uppercase', cursor:'pointer',
            padding: compact ? '8px 16px' : '5px 11px', borderRadius:6, border:'none',
            background: lang === code ? 'rgba(94,210,156,0.15)' : 'transparent',
            color: lang === code ? '#5ed29c' : 'rgba(240,237,230,0.4)',
            transition:'background 0.2s, color 0.2s',
          }}>
          {code}
        </button>
      ))}
    </div>
  )
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { t } = useLang()
  const WA = `https://wa.me/541134076364?text=${encodeURIComponent(t.wa.msgLong)}`
  const LINKS = HREFS.map((href, i) => ({ href, label: t.nav.links[i] }))

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scroll = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    if (href === '#inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior:'smooth' })
    }
  }

  return (
    <>
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        padding:'0 clamp(20px,4vw,60px)',
        display:'flex', alignItems:'center', justifyContent:'space-between',
        height:64,
        background: scrolled ? 'rgba(8,8,8,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(240,237,230,0.06)' : '1px solid transparent',
        transition:'background 0.4s, border-color 0.4s, backdrop-filter 0.4s',
      }}>
        <a href="#inicio" onClick={e => scroll(e,'#inicio')} style={{ textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
          <img src={asset('/logo-icon.png')} alt="" style={{ height:40, width:'auto' }} />
          <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
            <span style={{ fontFamily:'Inter,sans-serif', fontWeight:900, fontSize:17, color:'#f0ede6', letterSpacing:'-0.02em', lineHeight:1 }}>I.D.E.A <span style={{ color:'#5ed29c' }}>Code</span></span>
            <span style={{ fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:500, fontSize:8, color:'rgba(240,237,230,0.35)', letterSpacing:'0.13em', textTransform:'uppercase' }}>{t.nav.tagline}</span>
          </div>
        </a>

        <div style={{ display:'flex', alignItems:'center', gap:32 }} className="nav-desktop">
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={e => scroll(e,href)} style={{
              fontFamily:'Inter,sans-serif', fontWeight:500, fontSize:14,
              color:'rgba(240,237,230,0.5)', textDecoration:'none', transition:'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color='#f0ede6'}
            onMouseLeave={e => e.currentTarget.style.color='rgba(240,237,230,0.5)'}>
              {label}
            </a>
          ))}
          <a href={WA} target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily:'Inter,sans-serif', fontWeight:600, fontSize:13,
              background:'transparent', color:'#5ed29c',
              border:'1px solid rgba(94,210,156,0.4)',
              padding:'9px 18px', borderRadius:8, textDecoration:'none',
              transition:'background 0.2s, color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#5ed29c'; e.currentTarget.style.color = '#080808'; e.currentTarget.style.borderColor = '#5ed29c' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#5ed29c'; e.currentTarget.style.borderColor = 'rgba(94,210,156,0.4)' }}>
            {t.nav.contact}
          </a>
          <LangSwitch />
        </div>

        <div className="nav-mobile" style={{ display:'none', alignItems:'center', gap:12 }}>
          <LangSwitch />
          <button onClick={() => setMenuOpen(o => !o)} aria-label="Menu"
            style={{ background:'none', border:'none', cursor:'pointer', padding:8, display:'flex', flexDirection:'column', gap:5 }}>
            {[0,1].map(i => (
              <span key={i} style={{ display:'block', width:22, height:1.5, background:'#f0ede6', borderRadius:2 }} />
            ))}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          position:'fixed', inset:0, zIndex:999, background:'#080808',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:36,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position:'absolute', top:24, right:24,
            background:'none', border:'none', cursor:'pointer',
            fontFamily:'Inter,sans-serif', fontSize:13, color:'rgba(240,237,230,0.4)',
          }}>{t.nav.close}</button>
          {LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={e => scroll(e,href)} style={{
              fontFamily:'Inter,sans-serif', fontWeight:900, fontSize:36,
              color:'#f0ede6', textDecoration:'none',
            }}>{label}</a>
          ))}
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{
            fontFamily:'Inter,sans-serif', fontWeight:700, fontSize:15,
            background:'#5ed29c', color:'#080808',
            padding:'14px 36px', borderRadius:8, textDecoration:'none', marginTop:12,
          }}>{t.nav.contact}</a>
          <LangSwitch compact />
        </div>
      )}

      <style>{`
        @media (max-width:768px) {
          .nav-desktop { display:none !important; }
          .nav-mobile { display:flex !important; }
        }
      `}</style>
    </>
  )
}
