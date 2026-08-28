import { useEffect, useRef } from 'react'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    let raf = null

    const update = () => {
      raf = null
      const el = barRef.current
      if (!el) return
      const h = document.documentElement.scrollHeight - window.innerHeight
      const p = h > 0 ? window.scrollY / h : 0
      el.style.transform = `scaleX(${p})`
    }

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf !== null) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={barRef}
      style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9998,
        height: 2, width: '100%',
        background: 'linear-gradient(90deg, #5ed29c, #a8f0cc)',
        transform: 'scaleX(0)',
        transformOrigin: 'left center',
        willChange: 'transform',
        pointerEvents: 'none',
      }}
    />
  )
}
