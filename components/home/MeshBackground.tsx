'use client'

import { useEffect, useRef } from 'react'

const VERT = `attribute vec2 pos; void main(){gl_Position=vec4(pos,0.,1.);}`

const FRAG = `
precision mediump float;
uniform float uT;
uniform vec2  uR;
uniform vec2  uM;

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }

float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}

float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.+vec2(.3,.7);a*=.5;}
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / uR;
  vec2 asp = vec2(uR.x/uR.y, 1.);
  float t = uT * .08;

  /* soft animated noise field */
  float n = fbm(uv * asp * 2.5 + vec2(t*.4, t*.3));
  n = n * .5 + .5;

  /* mouse soft glow */
  vec2 m = uM / uR; m.y = 1. - m.y;
  float md = length((uv - m) * asp);
  float mg = smoothstep(.5, .0, md) * .06;

  /* base: very dark charcoal */
  vec3 base = vec3(.047, .047, .059); /* #0c0c0f */

  /* single indigo accent blob — subtle */
  float blob = smoothstep(.62, .38, n);
  vec3 accent = vec3(.24, .25, .55); /* indigo */
  vec3 col = mix(base, base + accent * .18, blob * .7);

  /* mouse warmth */
  col += vec3(.15, .16, .35) * mg;

  /* vignette */
  float vig = 1. - smoothstep(.45, 1.2, length((uv - .5) * 1.4));
  col = mix(vec3(.03,.03,.04), col, vig * .9 + .1);

  /* grain */
  float g = fract(sin(dot(gl_FragCoord.xy, vec2(12.98,78.23)) + uT*91.) * 43758.5);
  col += (g - .5) * .022;

  gl_FragColor = vec4(clamp(col,0.,1.), 1.);
}
`

export default function MeshBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  const raf = useRef(0)
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    if (!gl) return

    const sh = (t: number, src: string) => {
      const s = gl.createShader(t)!
      gl.shaderSource(s, src); gl.compileShader(s); return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog); gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const p = gl.getAttribLocation(prog, 'pos')
    gl.enableVertexAttribArray(p); gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0)

    const uT = gl.getUniformLocation(prog, 'uT')
    const uR = gl.getUniformLocation(prog, 'uR')
    const uM = gl.getUniformLocation(prog, 'uM')

    let W = 0, H = 0
    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      const dpr = Math.min(devicePixelRatio, 1.5)
      canvas.width = W * dpr | 0; canvas.height = H * dpr | 0
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)

    const onMove = (e: MouseEvent) => { mouse.current.tx = e.clientX; mouse.current.ty = e.clientY }
    window.addEventListener('mousemove', onMove)

    const t0 = performance.now()
    const frame = (now: number) => {
      raf.current = requestAnimationFrame(frame)
      const m = mouse.current
      m.x += (m.tx - m.x) * .04; m.y += (m.ty - m.y) * .04
      const t = reduced ? 0 : (now - t0) / 1000
      gl.uniform1f(uT, t)
      gl.uniform2f(uR, canvas.width, canvas.height)
      gl.uniform2f(uM, m.x * (canvas.width / W), m.y * (canvas.height / H))
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    raf.current = requestAnimationFrame(frame)

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf.current)
      else raf.current = requestAnimationFrame(frame)
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf.current)
      ro.disconnect()
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}
