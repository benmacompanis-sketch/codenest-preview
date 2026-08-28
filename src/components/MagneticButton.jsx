import { useRef } from 'react'

// Kept as a thin wrapper so existing call sites don't change. The magnetic
// cursor-follow effect was removed — it read as a template flourish and got in
// the way of plain clicking.
export default function MagneticButton({ children, style, href, target, rel, onClick }) {
  const btnRef = useRef(null)
  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      ref={btnRef}
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      style={{ display: 'inline-block', transition: 'opacity 0.2s, background 0.2s, color 0.2s', ...style }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.9' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
    >
      {children}
    </Tag>
  )
}
