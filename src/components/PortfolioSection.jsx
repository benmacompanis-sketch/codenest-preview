import { useEffect, useRef, useState } from 'react'
import { asset } from '../utils/assetPath'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { useLang } from '../i18n'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    name: 'Impacto Laser',
    cat: 'Limpieza Láser y Restauración',
    year: '2026',
    bg: 'linear-gradient(160deg, #000814 0%, #001a33 100%)',
    accent: '#5ed29c',
    url: 'https://impactolaser.vercel.app/',
    img: '/portfolio/impactolaser.jpg',
    imgPos: 'center center',
    tag: 'Restauración de superficies',
  },
  {
    name: 'Ovelar Propiedades',
    cat: 'Inmobiliaria',
    year: '2026',
    bg: 'linear-gradient(160deg, #0c1628 0%, #1a3258 100%)',
    accent: '#5ed29c',
    url: 'https://benmacompanis-sketch.github.io/ovelar-propiedades/',
    img: '/portfolio/ovelar.jpg',
    imgPos: '6% 30%',
    tag: 'Inmuebles · CABA',
  },
  {
    name: 'La Quinta Pata',
    cat: 'Veterinaria',
    year: '2026',
    bg: 'linear-gradient(160deg, #030d12 0%, #062534 100%)',
    accent: '#5ed29c',
    url: 'https://benmacompanis-sketch.github.io/Veterinaria/',
    img: '/portfolio/veterinaria.jpg',
    imgPos: 'center center',
    tag: 'Clínica · Caballito',
  },
  {
    name: 'Cucha del Parí',
    cat: 'Gastronomía',
    year: '2026',
    bg: 'linear-gradient(160deg, #100500 0%, #2a1200 100%)',
    accent: '#5ed29c',
    url: 'https://benmacompanis-sketch.github.io/Cuchadelpari/',
    img: '/portfolio/cuchadelpari.jpg',
    imgPos: '0% 35%',
    tag: 'Bar & Cocina · Buenos Aires',
  },
]

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    gsap.from(cardRef.current, {
      scrollTrigger: { trigger: cardRef.current, start: 'top 96%' },
      y: 60, opacity: 0, duration: 0.8,
      delay: index * 0.05,
      ease: 'power3.out',
    })
  }, [index])

  return (
    <a
      ref={cardRef}
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block', textDecoration: 'none',
        background: project.bg,
        borderRadius: 20, overflow: 'hidden',
        aspectRatio: '4/3', position: 'relative',
        transform: hovered ? 'scale(1.02)' : 'scale(1)',
        transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s, outline-color 0.3s',
        boxShadow: hovered ? `0 30px 80px rgba(94,210,156,0.2)` : '0 0 0 rgba(0,0,0,0)',
        outline: `1px solid ${hovered ? 'rgba(94,210,156,0.6)' : 'rgba(240,237,230,0.12)'}`,
      }}
    >
      {/* Screenshot */}
      <img
        src={asset(project.img)}
        alt={project.name}
        decoding="async"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: project.imgPos || 'center center',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      />
      {/* Dark overlay that lifts on hover */}
      <div style={{
        position: 'absolute', inset: 0,
        background: hovered ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.45)',
        transition: 'background 0.4s',
      }} />
      {/* Accent glow */}
      <div style={{
        position:'absolute', top:-40, right:-40,
        width:200, height:200, borderRadius:'50%',
        background: project.accent,
        opacity: hovered ? 0.18 : 0.06,
        filter:'blur(60px)',
        transition:'opacity 0.4s',
        pointerEvents: 'none',
      }}/>

      {/* Bottom info */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0,
        padding:'60px 24px 24px',
        background:'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end' }}>
          <div>
            <span style={{
              fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700,
              fontSize:10, color: project.accent,
              letterSpacing:'0.2em', textTransform:'uppercase',
              display:'block', marginBottom:6,
            }}>{project.cat} · {project.year}</span>
            <p style={{
              fontFamily:'Inter,sans-serif', fontWeight:800,
              fontSize:'clamp(18px,2.2vw,26px)', color:'#ffffff',
              margin:0, letterSpacing:'-0.01em',
            }}>{project.name}</p>
          </div>
          <div style={{
            width:44, height:44, borderRadius:'50%',
            background: hovered ? project.accent : 'rgba(255,255,255,0.1)',
            backdropFilter:'blur(8px)',
            display:'flex', alignItems:'center', justifyContent:'center',
            transition:'background 0.3s, transform 0.3s',
            transform: hovered ? 'rotate(0deg)' : 'rotate(-45deg)',
            flexShrink:0,
          }}>
            <ArrowUpRight size={18} color={hovered ? '#080808' : '#ffffff'} />
          </div>
        </div>
      </div>
    </a>
  )
}

export default function PortfolioSection() {
  const sectionRef = useRef(null)
  const { t } = useLang()
  const projects = PROJECTS.map((p, i) => ({ ...p, cat: t.portfolio.cats[i], tag: t.portfolio.tags[i] }))

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.port-label', {
        scrollTrigger: { trigger: '.port-label', start: 'top 96%' },
        x: -30, opacity: 0, duration: 0.7, ease: 'power3.out',
      })
      gsap.from('.port-title', {
        scrollTrigger: { trigger: '.port-title', start: 'top 96%' },
        y: 70, opacity: 0, duration: 1, ease: 'power4.out',
      })
      gsap.from('.port-sub', {
        scrollTrigger: { trigger: '.port-sub', start: 'top 96%' },
        opacity: 0, x: 30, duration: 0.8, delay: 0.2, ease: 'power3.out',
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="portfolio" style={{
      background: '#080808',
      padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)',
      borderTop: '1px solid rgba(240,237,230,0.05)',
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:60, flexWrap:'wrap', gap:16 }}>
          <div>
            <p className="port-label" style={{
              fontFamily:'"Plus Jakarta Sans",sans-serif', fontWeight:700, fontSize:11,
              color:'#5ed29c', letterSpacing:'0.22em', textTransform:'uppercase', marginBottom:16,
            }}>{t.portfolio.label}</p>
            <h2 className="port-title" style={{
              fontFamily:'Inter,sans-serif', fontWeight:900,
              fontSize:'clamp(36px,5vw,64px)', color:'#f0ede6',
              lineHeight:1.05, margin:0, letterSpacing:'-0.02em',
            }}>
              {t.portfolio.title}<br />{t.portfolio.title2} <span style={{ color:'#5ed29c' }}>{t.portfolio.titleAccent}</span>
            </h2>
          </div>
          <p className="port-sub" style={{
            fontFamily:'Inter,sans-serif', fontSize:14,
            color:'rgba(240,237,230,0.35)', maxWidth:260, lineHeight:1.7, margin:0,
          }}>
            {t.portfolio.sub}
          </p>
        </div>

        <div style={{
          display:'grid',
          gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 480px), 1fr))',
          gap:16,
        }}>
          {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
        </div>

      </div>
    </section>
  )
}
