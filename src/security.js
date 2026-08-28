// Security deterrents — not a hard block, but stops casual inspection

export function initSecurity() {
  // 1. Disable right-click
  document.addEventListener('contextmenu', e => e.preventDefault())

  // 2. Block common DevTools keyboard shortcuts
  document.addEventListener('keydown', e => {
    const blocked =
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I','J','C','K'].includes(e.key.toUpperCase())) ||
      (e.ctrlKey && e.key.toUpperCase() === 'U') ||
      (e.metaKey && e.altKey && ['I','J','C'].includes(e.key.toUpperCase()))
    if (blocked) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  })

  // 3. Console warning
  const style = 'color:#5ed29c;font-size:16px;font-weight:bold;'
  const style2 = 'color:#f0ede6;font-size:12px;'
  console.log('%c⚠ I.D.E.A Code', style)
  console.log('%cEste sitio es propiedad de I.D.E.A Code.\nEl contenido está protegido por derechos de autor.\nAcceso no autorizado está prohibido.', style2)
  console.log('%chttps://instagram.com/ideacode._', 'color:rgba(94,210,156,0.5);font-size:11px;')

  // 4. DevTools open detection via window size diff
  const threshold = 160
  let devtoolsOpen = false

  const check = () => {
    const widthDiff  = window.outerWidth  - window.innerWidth
    const heightDiff = window.outerHeight - window.innerHeight
    const isOpen = widthDiff > threshold || heightDiff > threshold
    if (isOpen && !devtoolsOpen) {
      devtoolsOpen = true
      document.body.innerHTML = ''
      document.body.style.background = '#080808'
    }
    if (!isOpen && devtoolsOpen) {
      devtoolsOpen = false
      window.location.reload()
    }
  }

  setInterval(check, 2000)
}
