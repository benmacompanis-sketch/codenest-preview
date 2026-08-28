import { useEffect, useRef } from 'react'

const COUNT = 1400
const RADIUS = 0.38

export default function ParticleGlobe() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let mouse = { x: 0, y: 0 }
    let rotX = 0, rotY = 0
    let targetX = 0, targetY = 0

    // Build sphere points (fibonacci lattice)
    const pts = []
    for (let i = 0; i < COUNT; i++) {
      const phi   = Math.acos(-1 + (2 * i) / COUNT)
      const theta = Math.sqrt(COUNT * Math.PI) * phi
      pts.push({
        ox: Math.sin(phi) * Math.cos(theta),
        oy: Math.sin(phi) * Math.sin(theta),
        oz: Math.cos(phi),
      })
    }

    // Ring points
    const RING1 = [], RING2 = []
    for (let i = 0; i < 300; i++) {
      const a = (i / 300) * Math.PI * 2
      const r1 = 1.22
      RING1.push({ ox: Math.cos(a) * r1, oy: Math.sin(a) * r1, oz: 0 })
      const r2 = 1.34
      RING2.push({ ox: Math.cos(a) * r2, oy: 0, oz: Math.sin(a) * r2 })
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
      mouse.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)

    const resize = () => {
      const size = Math.min(canvas.parentElement.offsetWidth, canvas.parentElement.offsetHeight)
      canvas.width  = size * devicePixelRatio
      canvas.height = size * devicePixelRatio
      canvas.style.width  = size + 'px'
      canvas.style.height = size + 'px'
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)

    let t = 0

    const project = (x, y, z, cx, cy, r) => {
      // Rotate around Y (mouse X)
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      let x1 =  x * cosY + z * sinY
      let z1 = -x * sinY + z * cosY

      // Rotate around X (mouse Y)
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
      let y1 =  y * cosX - z1 * sinX
      let z2 =  y * sinX + z1 * cosX

      const fov = 4
      const scale = fov / (fov + z2)
      return {
        sx: cx + x1 * r * scale,
        sy: cy + y1 * r * scale,
        z: z2,
        scale,
      }
    }

    let frame = 0
    let lastTime = 0
    const draw = (now = 0) => {
      if (now - lastTime < 24) { raf = requestAnimationFrame(draw); return } // ~40fps cap
      lastTime = now
      t += 0.008
      frame++

      // Lerp rotation toward mouse
      targetY = t * 0.5 + mouse.x * 0.6
      targetX = mouse.y * 0.3
      rotY += (targetY - rotY) * 0.04
      rotX += (targetX - rotX) * 0.04

      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const cx = W / 2, cy = H / 2
      const r  = Math.min(W, H) * RADIUS

      // Collect all points for depth sorting
      const draw_pts = []

      for (const p of pts) {
        const wave = Math.sin(p.ox * 4 + t * 1.5) * 0.04
                   + Math.cos(p.oy * 4 + t * 1.1) * 0.04
        const nx = p.ox * (1 + wave)
        const ny = p.oy * (1 + wave)
        const nz = p.oz * (1 + wave)
        const { sx, sy, z, scale } = project(nx, ny, nz, cx, cy, r)
        draw_pts.push({ sx, sy, z, scale, type: 'dot' })
      }

      for (const p of RING1) {
        const { sx, sy, z, scale } = project(p.ox, p.oy, p.oz, cx, cy, r)
        draw_pts.push({ sx, sy, z, scale, type: 'ring1' })
      }
      for (const p of RING2) {
        const { sx, sy, z, scale } = project(p.ox, p.oy, p.oz, cx, cy, r)
        draw_pts.push({ sx, sy, z, scale, type: 'ring2' })
      }

      if (frame % 3 === 0) draw_pts.sort((a, b) => a.z - b.z)

      ctx.fillStyle = 'rgb(94,210,156)'
      for (const p of draw_pts) {
        const depth = (p.z + 1.5) / 3
        if (p.type === 'dot') {
          const alpha = Math.max(0.05, depth * 0.9)
          const size  = Math.max(0.5, p.scale * 2.2)
          ctx.globalAlpha = alpha
          ctx.beginPath()
          ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.globalAlpha = p.type === 'ring1' ? Math.max(0.04, depth * 0.22) : Math.max(0.03, depth * 0.14)
          ctx.beginPath()
          ctx.arc(p.sx, p.sy, 1.2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%', willChange: 'contents' }}
    />
  )
}
