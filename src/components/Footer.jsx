import { asset } from '../utils/assetPath'
import { useLang } from '../i18n'


const IG_URL = 'https://instagram.com/ideacode._'
const TK_URL = 'https://tiktok.com/@idea.code'

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path fill="#25D366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
        <stop offset="0%" stopColor="#fdf497"/>
        <stop offset="5%" stopColor="#fdf497"/>
        <stop offset="45%" stopColor="#fd5949"/>
        <stop offset="60%" stopColor="#d6249f"/>
        <stop offset="90%" stopColor="#285AEB"/>
      </radialGradient>
    </defs>
    <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
)

const IconTikTok = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ffffff" d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.31 6.31 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.22 8.22 0 004.84 1.55V7.07a4.85 4.85 0 01-1.07-.38z"/>
    <path fill="#69C9D0" d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25h-1a4.85 4.85 0 003.77 4.25z" opacity=".5"/>
    <path fill="#EE1D52" d="M9.49 9.01v3.5c-.25-.06-.51-.1-.79-.1a2.89 2.89 0 00-2.89 2.89 2.89 2.89 0 002.89 2.89 2.89 2.89 0 002.88-2.5V2h-2a6.27 6.27 0 00.5 3.12 4.83 4.83 0 001.41 3.89z" opacity=".4"/>
  </svg>
)

const IconGmail = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
    <path fill="#4285F4" d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.907 1.528-1.147C21.69 2.28 24 3.434 24 5.457z"/>
    <path fill="#0F9D58" d="M0 5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64v6.09L0 6.82V5.457z"/>
    <path fill="#FFBA00" d="M18.545 4.64l1.528-1.147C21.69 2.28 24 3.434 24 5.457V6.82l-5.455 3.91V4.64z"/>
    <path fill="#FF4131" d="M24 6.82l-5.455 3.91v9.273h3.819A1.636 1.636 0 0024 18.366V6.82z"/>
    <path fill="#F1F1F1" d="M0 6.82l5.455 3.91v9.273H1.636A1.636 1.636 0 010 18.366V6.82z"/>
  </svg>
)

const HREFS = ['#servicios', '#portfolio', '#proceso', '#nosotros']

const scroll = (e, href) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Footer() {
  const { t } = useLang()
  const WA_URL = `https://wa.me/541134076364?text=${encodeURIComponent(t.wa.msgLong)}`
  const LINKS = HREFS.map((href, i) => ({ href, label: t.nav.links[i] }))
  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid rgba(240,237,230,0.06)',
      padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px) 32px',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Top row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(40px,5vw,80px)',
          marginBottom: 60,
        }}>

          {/* Brand */}
          <div>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
              <img src={asset('/logo-icon.png')} alt="" style={{ height:36, width:'auto' }} />
              <div>
                <div style={{ fontFamily:'Inter,sans-serif', fontWeight:900, fontSize:16, color:'#f0ede6', letterSpacing:'-0.02em', lineHeight:1 }}>
                  I.D.E.A <span style={{ color:'#5ed29c' }}>Code</span>
                </div>
                <div style={{ fontFamily:'"Plus Jakarta Sans",sans-serif', fontSize:7, color:'rgba(240,237,230,0.3)', letterSpacing:'0.12em', textTransform:'uppercase', marginTop:2 }}>
                  {t.nav.tagline}
                </div>
              </div>
            </div>
            <p style={{ fontFamily:'Inter,sans-serif', fontSize:13, color:'rgba(240,237,230,0.35)', lineHeight:1.7, margin:'0 0 24px' }}>
              {t.footer.desc}
            </p>
            {/* Social icons */}
            <div style={{ display:'flex', gap:12 }}>
              {[
                { Icon: IconWhatsApp,  href: WA_URL,  label:'WhatsApp' },
                { Icon: IconInstagram, href: IG_URL,  label:'Instagram' },
                { Icon: IconTikTok,    href: TK_URL,  label:'TikTok' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width:40, height:40, borderRadius:10,
                    border:'1px solid rgba(240,237,230,0.1)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    textDecoration:'none', transition:'all 0.2s',
                    background:'rgba(255,255,255,0.04)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(240,237,230,0.3)'; e.currentTarget.style.background='rgba(255,255,255,0.1)'; e.currentTarget.style.transform='scale(1.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(240,237,230,0.1)'; e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.transform='scale(1)' }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:10, color:'rgba(240,237,230,0.3)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:20 }}>{t.footer.navLabel}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {LINKS.map(({ label, href }) => (
                <a key={href} href={href} onClick={e => scroll(e,href)} style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'rgba(240,237,230,0.45)', textDecoration:'none', transition:'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#f0ede6'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(240,237,230,0.45)'}
                >{label}</a>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <p style={{ fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:10, color:'rgba(240,237,230,0.3)', letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:20 }}>{t.footer.contactLabel}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {[
                { icon:<IconWhatsApp/>, href:WA_URL, text:'+54 11 3407-6364' },
                { icon:<IconInstagram/>, href:IG_URL, text:'@ideacode._' },
                { icon:<IconTikTok/>, href:TK_URL, text:'@idea.code' },
              ].map(({ icon, href, text }) => (
                <a key={text} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'rgba(240,237,230,0.45)', textDecoration:'none', display:'flex', alignItems:'center', gap:8, transition:'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='#f0ede6'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(240,237,230,0.45)'}
                >
                  {icon} {text}
                </a>
              ))}
              <span style={{ fontFamily:'Inter,sans-serif', fontSize:14, color:'rgba(240,237,230,0.25)', display:'flex', alignItems:'center', gap:8, fontStyle:'italic', marginTop:4 }}>
                <IconGmail /> {t.footer.mailSoon}
              </span>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div style={{ borderTop:'1px solid rgba(240,237,230,0.06)', paddingTop:28, display:'flex', flexWrap:'wrap', justifyContent:'space-between', alignItems:'center', gap:16 }}>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:12, color:'rgba(240,237,230,0.2)', margin:0 }}>
            © {new Date().getFullYear()} I.D.E.A Code — {t.footer.rights}
          </p>
          <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'rgba(240,237,230,0.15)', display:'flex', alignItems:'center', gap:6 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              {t.footer.https}
            </span>
            <span style={{ fontFamily:'Inter,sans-serif', fontSize:11, color:'rgba(240,237,230,0.15)' }}>
              {t.footer.madeBy}
            </span>
          </div>
        </div>

      </div>
    </footer>
  )
}
