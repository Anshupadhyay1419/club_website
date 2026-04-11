'use client'

import React, { useEffect, useRef, useCallback, CSSProperties, ReactNode } from 'react'

interface ElectricBorderProps {
  children?: ReactNode
  color?: string
  speed?: number
  chaos?: number
  borderRadius?: number
  className?: string
  style?: CSSProperties
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = '#6366f1',
  speed = 0.8,
  chaos = 0.10,
  borderRadius = 20,
  className,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const timeRef = useRef(0)
  const lastFrameTimeRef = useRef(0)

  const random = useCallback((x: number): number => {
    return (Math.sin(x * 12.9898) * 43758.5453) % 1
  }, [])

  const noise2D = useCallback((x: number, y: number): number => {
    const i = Math.floor(x); const j = Math.floor(y)
    const fx = x - i; const fy = y - j
    const a = random(i + j * 57); const b = random(i + 1 + j * 57)
    const c = random(i + (j + 1) * 57); const d = random(i + 1 + (j + 1) * 57)
    const ux = fx * fx * (3.0 - 2.0 * fx); const uy = fy * fy * (3.0 - 2.0 * fy)
    return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy
  }, [random])

  const octavedNoise = useCallback((x: number, octaves: number, lacunarity: number, gain: number,
    baseAmplitude: number, baseFrequency: number, time: number, seed: number, baseFlatness: number): number => {
    let y = 0; let amplitude = baseAmplitude; let frequency = baseFrequency
    for (let i = 0; i < octaves; i++) {
      let octaveAmplitude = amplitude
      if (i === 0) octaveAmplitude *= baseFlatness
      y += octaveAmplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3)
      frequency *= lacunarity; amplitude *= gain
    }
    return y
  }, [noise2D])

  const getCornerPoint = useCallback((cx: number, cy: number, r: number, startAngle: number, arcLength: number, progress: number) => {
    const angle = startAngle + progress * arcLength
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }, [])

  const getRoundedRectPoint = useCallback((t: number, left: number, top: number, width: number, height: number, radius: number) => {
    const sw = width - 2 * radius; const sh = height - 2 * radius
    const ca = (Math.PI * radius) / 2
    const total = 2 * sw + 2 * sh + 4 * ca
    const dist = t * total; let acc = 0
    if (dist <= acc + sw) { const p = (dist - acc) / sw; return { x: left + radius + p * sw, y: top } }
    acc += sw
    if (dist <= acc + ca) { const p = (dist - acc) / ca; return getCornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, p) }
    acc += ca
    if (dist <= acc + sh) { const p = (dist - acc) / sh; return { x: left + width, y: top + radius + p * sh } }
    acc += sh
    if (dist <= acc + ca) { const p = (dist - acc) / ca; return getCornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, p) }
    acc += ca
    if (dist <= acc + sw) { const p = (dist - acc) / sw; return { x: left + width - radius - p * sw, y: top + height } }
    acc += sw
    if (dist <= acc + ca) { const p = (dist - acc) / ca; return getCornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, p) }
    acc += ca
    if (dist <= acc + sh) { const p = (dist - acc) / sh; return { x: left, y: top + height - radius - p * sh } }
    acc += sh
    const p = (dist - acc) / ca
    return getCornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, p)
  }, [getCornerPoint])

  useEffect(() => {
    const canvas = canvasRef.current; const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const octaves = 10; const lacunarity = 1.6; const gain = 0.7
    const amplitude = chaos; const frequency = 10; const baseFlatness = 0
    const displacement = 50; const borderOffset = 55

    const updateSize = () => {
      const rect = container.getBoundingClientRect()
      const w = rect.width + borderOffset * 2; const h = rect.height + borderOffset * 2
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr; canvas.height = h * dpr
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`
      ctx.scale(dpr, dpr)
      return { width: w, height: h }
    }

    let { width, height } = updateSize()

    const draw = (now: number) => {
      if (!canvas || !ctx) return
      const dt = (now - lastFrameTimeRef.current) / 1000
      timeRef.current += dt * speed
      lastFrameTimeRef.current = now
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.scale(dpr, dpr)
      ctx.strokeStyle = color; ctx.lineWidth = 1.5
      ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      const left = borderOffset; const top = borderOffset
      const bw = width - 2 * borderOffset; const bh = height - 2 * borderOffset
      const maxR = Math.min(bw, bh) / 2
      const r = Math.min(borderRadius, maxR)
      const perim = 2 * (bw + bh) + 2 * Math.PI * r
      const samples = Math.floor(perim / 2)
      ctx.beginPath()
      for (let i = 0; i <= samples; i++) {
        const prog = i / samples
        const pt = getRoundedRectPoint(prog, left, top, bw, bh, r)
        const xn = octavedNoise(prog * 8, octaves, lacunarity, gain, amplitude, frequency, timeRef.current, 0, baseFlatness)
        const yn = octavedNoise(prog * 8, octaves, lacunarity, gain, amplitude, frequency, timeRef.current, 1, baseFlatness)
        const dx = pt.x + xn * displacement; const dy = pt.y + yn * displacement
        if (i === 0) ctx.moveTo(dx, dy); else ctx.lineTo(dx, dy)
      }
      ctx.closePath(); ctx.stroke()
      animationRef.current = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(() => { const s = updateSize(); width = s.width; height = s.height })
    ro.observe(container)
    animationRef.current = requestAnimationFrame(draw)
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); ro.disconnect() }
  }, [color, speed, chaos, borderRadius, octavedNoise, getRoundedRectPoint])

  const vars = { '--electric-border-color': color, borderRadius } as CSSProperties

  return (
    <div ref={containerRef} className={`electric-border ${className ?? ''}`} style={{ ...vars, ...style }}>
      <div className="eb-canvas-container">
        <canvas ref={canvasRef} className="eb-canvas" />
      </div>
      <div className="eb-layers">
        <div className="eb-glow-1" />
        <div className="eb-glow-2" />
        <div className="eb-background-glow" />
      </div>
      <div className="eb-content">{children}</div>
    </div>
  )
}

export default ElectricBorder
