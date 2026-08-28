import { useRef } from 'react'
import { gsap } from 'gsap'

export default function MagneticButton({ children, style, href, target, rel, onClick, strength = 0.4 }) {
  const btnRef = useRef(null)

  const onMove = (e) => {
    const btn = btnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width  / 2) * strength
    const y = (e.clientY - rect.top  - rect.height / 2) * strength
    gsap.to(btn, { x, y, duration: 0.3, ease: 'power2.out' })
  }

  const onLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }

  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={btnRef}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-cursor
      style={{ display: 'inline-block', ...style }}
    >
      {children}
    </Tag>
  )
}
