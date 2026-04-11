'use client'

import { useEffect, useRef, useCallback } from 'react'

/* ─────────────────────────────────────────────
   AISystemBackground
   - Fine grid with slow fade animation
   - Horizontal scanning bar (radar sweep)
   - Minimal neural nodes + data-pulse lines
   - HUD corner brackets (CSS overlay)
   - Mouse parallax tilt on grid
───────────────────────────────────────────── */

interface NeuralNode {
  x: number; y: number
  vx: number; vy: number
  alpha: number; targetAlpha: number
  alphaSpeed: number
}

interface Pulse {
  x1: number; y1: number; x2: number; y2: number
  progress: number; speed: number; alpha: number
}

const GRID_SIZE = 48          // px between grid lines
const NODE_COUNT = 22         // neural nodes
const MAX_CONNECT_DIST = 220  // max distance for node connections
const SCAN_SPEED = 0.00018    // fraction of height per ms
const BG = '#0b0d12'
const GRID_COLOR = 'rgba(100, 160, 220, 0.07)'
const GRID_HIGHLIGHT = 'rgba(120, 180, 255, 0.22)'
const NODE_COLOR = 'rgba(130, 190, 255, 0.55)'
const LINE_COLOR = 'rgba(100, 160, 240, 0.12)'
const PULSE_COLOR = '#7ab8ff'
const SCAN_COLOR_TOP = 'rgba(100, 180, 255, 0.0)'
const SCAN_COLOR_MID = 'rgba(120, 190, 255, 0.18)'
const SCAN_COLOR_BOT = 'rgba(100, 180, 255, 0.0)'

export default function AISystemBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const stateRef = useRef({
    W: 0, H: 0,
    nodes: [] as NeuralNode[],
    pulses: [] as Pulse[],
    scanY: 0,
    lastPulseTime: 0,
    mouseX: 0, mouseY: 0,
    gridOffsetX: 0, gridOffsetY: 0,
    targetGridOffX: 0, targetGridOffY: 0,
    lastTime: 0,
  })

  const initNodes = useCallback((W: number, H: number) => {
    const nodes: NeuralNode[] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        alpha: Math.random() * 0.4 + 0.2,
        targetAlpha: Math.random() * 0.5 + 0.3,
        alphaSpeed: Math.random() * 0.004 + 0.002,
      })
    }
    return nodes
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const s = stateRef.current

    const resize = () => {
      const dpr = Math.min(devicePixelRatio, 2)
      s.W = canvas.offsetWidth
      s.H = canvas.offsetHeight
      canvas.width = s.W * dpr
      canvas.height = s.H * dpr
      ctx.scale(dpr, dpr)
      s.nodes = initNodes(s.W, s.H)
      s.scanY = 0
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // mouse
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      s.mouseX = e.clientX - r.left
      s.mouseY = e.clientY - r.top
      s.targetGridOffX = ((s.mouseX / s.W) - 0.5) * 14
      s.targetGridOffY = ((s.mouseY / s.H) - 0.5) * 10
    }
    const onLeave = () => { s.targetGridOffX = 0; s.targetGridOffY = 0 }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    const spawnPulse = (now: number) => {
      if (now - s.lastPulseTime < 900) return
      s.lastPulseTime = now
      if (s.nodes.length < 2) return
      const from = Math.floor(Math.random() * s.nodes.length)
      const candidates: number[] = []
      for (let i = 0; i < s.nodes.length; i++) {
        if (i === from) continue
        const dx = s.nodes[i].x - s.nodes[from].x
        const dy = s.nodes[i].y - s.nodes[from].y
        if (Math.sqrt(dx * dx + dy * dy) < MAX_CONNECT_DIST) candidates.push(i)
      }
      if (!candidates.length) return
      const to = candidates[Math.floor(Math.random() * candidates.length)]
      s.pulses.push({
        x1: s.nodes[from].x, y1: s.nodes[from].y,
        x2: s.nodes[to].x,   y2: s.nodes[to].y,
        progress: 0, speed: 0.007 + Math.random() * 0.005,
        alpha: 0.9,
      })
      if (s.pulses.length > 10) s.pulses.shift()
    }

    const drawGrid = (ctx: CanvasRenderingContext2D, scanY: number, offX: number, offY: number) => {
      const { W, H } = s
      const startX = (offX % GRID_SIZE) - GRID_SIZE
      const startY = (offY % GRID_SIZE) - GRID_SIZE

      // vertical lines
      for (let x = startX; x < W + GRID_SIZE; x += GRID_SIZE) {
        const distToScan = Math.abs(x - W / 2)
        const scanInfluence = Math.max(0, 1 - distToScan / (W * 0.6))
        const scanProx = Math.max(0, 1 - Math.abs(scanY - H * 0.5) / (H * 0.4))
        const alpha = 0.07 + scanInfluence * scanProx * 0.15
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.strokeStyle = `rgba(100, 160, 220, ${alpha.toFixed(3)})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }

      // horizontal lines
      for (let y = startY; y < H + GRID_SIZE; y += GRID_SIZE) {
        const scanProx = Math.max(0, 1 - Math.abs(y - scanY) / (GRID_SIZE * 3))
        const alpha = 0.07 + scanProx * 0.18
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(W, y)
        ctx.strokeStyle = `rgba(100, 160, 220, ${alpha.toFixed(3)})`
        ctx.lineWidth = scanProx > 0.1 ? 0.8 : 0.5
        ctx.stroke()
      }
    }

    const drawScanBar = (ctx: CanvasRenderingContext2D, scanY: number) => {
      const { W } = s
      const barH = 80
      const grad = ctx.createLinearGradient(0, scanY - barH, 0, scanY + barH)
      grad.addColorStop(0, SCAN_COLOR_TOP)
      grad.addColorStop(0.5, SCAN_COLOR_MID)
      grad.addColorStop(1, SCAN_COLOR_BOT)
      ctx.fillStyle = grad
      ctx.fillRect(0, scanY - barH, W, barH * 2)

      // bright leading edge
      ctx.beginPath()
      ctx.moveTo(0, scanY)
      ctx.lineTo(W, scanY)
      ctx.strokeStyle = 'rgba(140, 200, 255, 0.35)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    const drawNodes = (ctx: CanvasRenderingContext2D) => {
      const { nodes, scanY, H } = s

      // connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > MAX_CONNECT_DIST) continue
          const fade = 1 - dist / MAX_CONNECT_DIST
          ctx.beginPath()
          ctx.moveTo(nodes[i].x, nodes[i].y)
          ctx.lineTo(nodes[j].x, nodes[j].y)
          ctx.strokeStyle = `rgba(100, 160, 240, ${(fade * 0.13).toFixed(3)})`
          ctx.lineWidth = 0.7
          ctx.stroke()
        }
      }

      // nodes
      for (const n of nodes) {
        const scanProx = Math.max(0, 1 - Math.abs(n.y - scanY) / (H * 0.25))
        const a = n.alpha + scanProx * 0.4
        ctx.beginPath()
        ctx.arc(n.x, n.y, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(130, 190, 255, ${Math.min(a, 0.9).toFixed(3)})`
        ctx.fill()

        // outer ring
        ctx.beginPath()
        ctx.arc(n.x, n.y, 5, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(130, 190, 255, ${(a * 0.25).toFixed(3)})`
        ctx.lineWidth = 0.6
        ctx.stroke()
      }
    }

    const drawPulses = (ctx: CanvasRenderingContext2D) => {
      for (const p of s.pulses) {
        const cx = p.x1 + (p.x2 - p.x1) * p.progress
        const cy = p.y1 + (p.y2 - p.y1) * p.progress
        const trail = Math.max(0, p.progress - 0.15)
        const tx = p.x1 + (p.x2 - p.x1) * trail
        const ty = p.y1 + (p.y2 - p.y1) * trail

        const grad = ctx.createLinearGradient(tx, ty, cx, cy)
        grad.addColorStop(0, 'transparent')
        grad.addColorStop(1, `rgba(122, 184, 255, ${p.alpha.toFixed(2)})`)
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(cx, cy)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(cx, cy, 2.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180, 220, 255, ${p.alpha.toFixed(2)})`
        ctx.fill()
      }
    }

    const frame = (now: number) => {
      rafRef.current = requestAnimationFrame(frame)
      const dt = Math.min(now - (s.lastTime || now), 50)
      s.lastTime = now

      if (!reduced) {
        // scan bar
        s.scanY += s.H * SCAN_SPEED * dt
        if (s.scanY > s.H + 100) s.scanY = -100

        // grid parallax lerp
        s.gridOffsetX += (s.targetGridOffX - s.gridOffsetX) * 0.04
        s.gridOffsetY += (s.targetGridOffY - s.gridOffsetY) * 0.04

        // move nodes
        for (const n of s.nodes) {
          n.x += n.vx; n.y += n.vy
          if (n.x < 0 || n.x > s.W) n.vx *= -1
          if (n.y < 0 || n.y > s.H) n.vy *= -1
          // breathe alpha
          n.alpha += (n.targetAlpha - n.alpha) * n.alphaSpeed
          if (Math.abs(n.alpha - n.targetAlpha) < 0.01) {
            n.targetAlpha = Math.random() * 0.5 + 0.2
          }
        }

        // pulses
        spawnPulse(now)
        for (let i = s.pulses.length - 1; i >= 0; i--) {
          s.pulses[i].progress += s.pulses[i].speed
          if (s.pulses[i].progress >= 1) s.pulses.splice(i, 1)
        }
      }

      ctx.clearRect(0, 0, s.W, s.H)

      // bg
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, s.W, s.H)

      // grid
      drawGrid(ctx, s.scanY, s.gridOffsetX, s.gridOffsetY)

      // scan bar
      drawScanBar(ctx, s.scanY)

      // neural layer
      drawNodes(ctx)
      drawPulses(ctx)

      // center radial fade (keeps content readable)
      const radial = ctx.createRadialGradient(
        s.W / 2, s.H * 0.45, s.H * 0.05,
        s.W / 2, s.H * 0.45, s.W * 0.65
      )
      radial.addColorStop(0, 'rgba(11,13,18,0.55)')
      radial.addColorStop(1, 'rgba(11,13,18,0.0)')
      ctx.fillStyle = radial
      ctx.fillRect(0, 0, s.W, s.H)
    }

    rafRef.current = requestAnimationFrame(frame)

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(rafRef.current)
      else rafRef.current = requestAnimationFrame(frame)
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [initNodes])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
        aria-hidden="true"
      />
      {/* HUD corner brackets */}
      <HUDCorners />
    </>
  )
}

function HUDCorners() {
  const corner = 'absolute w-6 h-6 opacity-20'
  const line = 'border-[#7ab8ff]'
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {/* top-left */}
      <div className={`${corner} top-6 left-6 border-t border-l ${line}`} />
      {/* top-right */}
      <div className={`${corner} top-6 right-6 border-t border-r ${line}`} />
      {/* bottom-left */}
      <div className={`${corner} bottom-6 left-6 border-b border-l ${line}`} />
      {/* bottom-right */}
      <div className={`${corner} bottom-6 right-6 border-b border-r ${line}`} />

      {/* side tick marks */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-15">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`h-px bg-[#7ab8ff] ${i === 2 ? 'w-4' : 'w-2'}`} />
        ))}
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-15">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={`h-px bg-[#7ab8ff] ml-auto ${i === 2 ? 'w-4' : 'w-2'}`} />
        ))}
      </div>

      {/* status text */}
      <div className="absolute bottom-8 left-8 text-[9px] font-mono text-[#7ab8ff]/25 tracking-widest uppercase">
        SYS.ACTIVE
      </div>
      <div className="absolute bottom-8 right-8 text-[9px] font-mono text-[#7ab8ff]/25 tracking-widest uppercase">
        AI.CORE.v2
      </div>
    </div>
  )
}
