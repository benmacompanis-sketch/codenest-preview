import { useState, useEffect, useRef, useCallback } from 'react'

const CHARS = 'アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&<>/\\'

export function useTextScramble(text, trigger = true, duration = 1000) {
  const [display, setDisplay] = useState('')
  const frame = useRef(null)
  const hasScrambled = useRef(false)
  const textRef = useRef(text)
  textRef.current = text

  const scramble = useCallback(() => {
    cancelAnimationFrame(frame.current)
    const target = textRef.current
    let start = null

    const tick = (timestamp) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const revealed = Math.floor(progress * target.length)

      setDisplay(
        target.split('').map((char, i) => {
          if (char === ' ') return ' '
          if (i < revealed) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )

      if (progress < 1) {
        frame.current = requestAnimationFrame(tick)
      } else {
        setDisplay(target)
      }
    }
    frame.current = requestAnimationFrame(tick)
  }, [duration])

  useEffect(() => {
    if (!trigger) return

    // Only scramble on the first reveal. Later text changes (e.g. switching
    // language) swap straight to the new copy — scrambling there reads as a bug.
    if (hasScrambled.current) {
      cancelAnimationFrame(frame.current)
      setDisplay(text)
      return
    }

    hasScrambled.current = true
    scramble()
    return () => cancelAnimationFrame(frame.current)
  }, [trigger, text, scramble])

  return { display, scramble }
}
