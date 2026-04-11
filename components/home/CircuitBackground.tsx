'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  pulsePhase: number
  pulseSpeed: number
}

interface Pulse {
  fromNode: number
  toNode: number
  progress: number
  speed: number
  color: string
}

const COLORS = {
  bg: '#080a0e',
  nodeDim: 'rgba(100, 160, 255, 0.18)',
  nodeActive: 'rgba(120, 180, 255, 0.55)',
  nodePulse: 'rgba(160, 210, 255, 0.9)',
  line: 'rgba(80, 130, 220, 0.10)',
  lineActive: 'rgba(100, 160, 255, 0.28)',
  pulse: '#7eb8ff',
  pulseAlt: '#a78bfa',
}

const MAX_DIST = 180
const NODE_COUNT_BASE = 55

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches

    let W = 0, H = 0
    let nodes: Node[] = []
    let pulses: Pulse[] = []

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2)
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
      initNodes()
    }

    const initNodes = () => {
      const count = Math.floor(NODE_COUNT_BASE * (W / 1440) * 1.2)
      const n = Math.max(30, Math.min(count, 90))
      nodes = Array.from({ length: n }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 1.8 + 1.2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.012 + 0.006,
      }))
      pulses = []
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 } }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    // spawn pulses periodically
    let lastPulse = 0
    const spawnPulse = (now: number) => {
      if (now - lastPulse < 600) return
      lastPulse = now
      if (nodes.length < 2) return
      const from = Math.floor(Math.random() * nodes.length)
      // find a connected neighbour
      const candidates: number[] = []
      for (let i = 0; i < nodes.length; i++) {
        if (i === from) continue
        const dx = nodes[i].x - nodes[from].x
        const dy = nodes[i].y - nodes[from].y
        if (Math.sqrt(dx * dx + dy * dy) < MAX_DIST) candidates.push(i)
      }
      if (candidates.length === 0) return
      const to = candidates[Math.floor(Math.random() * candidates.length)]
      pulses.push({
        fromNode: from,
        toNode: to,
        progress: 0,
        speed: Math.random() * 0.008 + 0.006,
        color: Math.random() > 0.5 ? COLORS.pulse : COLORS.pulseAlt,
      })
      if (pulses.length > 18) pulses.shift()
    }

    const draw = (now: number) => {
      rafRef.current = requestAnimationFrame(draw)
      ctx.clearRect(0, 0, W, H)

      // background
      ctx.fillStyle = COLORS.bg
      ctx.fillRect(0, 0, W, H)

      if (!reduced) {
        // move nodes
        for (const n of nodes) {
          n.x += n.vx; n.y += n.vy
          n.pulsePhase += n.pulseSpeed
          if (n.x < 0 || n.x > W) n.vx *= -1
          if (n.y < 0 || n.y > H) n.vy *= -1
        }
        spawnPulse(now)
      }

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      // draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > MAX_DIST) continue

          const alpha = 1 - dist / MAX_DIST
          // mouse proximity boost
          const mdx = (nodes[i].x + nodes[j].x) / 2 - mx
          const mdy = (nodes[i].y + nodes[j].y) / 2 - my
          const md = Math.sqrt(mdx * mdx + mdy * mdy)
          const boost = Math.max(0, 1 - md / 160) * 0.35

          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(80, 140, 230, ${(alpha * 0.12 + boost).toFixed(3)})`
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }

      // draw pulses along edges
      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k]
        if (!reduced) p.progress += p.speed
        if (p.progress >= 1) { pulses.splice(k, 1); continue }

        const fn = nodes[p.fromNode]
        const tn = nodes[p.toNode]
        const px = fn.x + (tn.x - fn.x) * p.progress
        const py = fn.y + (tn.y - fn.y) * p.progress

        // trail
        const trailLen = 0.12
        const t0 = Math.max(0, p.progress - trailLen)
        const tx0 = fn.x + (tn.x - fn.x) * t0
        const ty0 = fn.y + (tn.y - fn.y) * t0
        const grad = ctx.createLinearGradient(tx0, ty0, px, py)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(1, p.color)
        ctx.beginPath()
        ctx.moveTo(tx0, ty0)
        ctx.lineTo(px, py)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        // dot
        ctx.beginPath()
        ctx.arc(px, py, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
      }

      // draw nodes
      for (const n of nodes) {
        const pulse = Math.sin(n.pulsePhase) * 0.5 + 0.5
        const mdx = n.x - mx, mdy = n.y - my
        const md = Math.sqrt(mdx * mdx + mdy * mdy)
        const hover = Math.max(0, 1 - md / 100)

        const r = n.radius + pulse * 0.6 + hover * 2
        const alpha = 0.18 + pulse * 0.22 + hover * 0.45

        // outer ring on hover
        if (hover > 0.1) {
          ctx.beginPath()
          ctx.arc(n.x, n.y, r + 4, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(120, 180, 255, ${(hover * 0.2).toFixed(3)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(120, 175, 255, ${alpha.toFixed(3)})`
        ctx.fill()
      }
    }

    rafRef.current = requestAnimationFrame(draw)

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current)
      else rafRef.current = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}
