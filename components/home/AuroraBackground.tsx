'use client'

import { useEffect, useRef } from 'react'

/* ─── Vertex ─────────────────────────────────────────────────────────────── */
const VERT = `
attribute vec2 position;
void main(){gl_Position=vec4(position,0.,1.);}
`

/* ─── Fragment ───────────────────────────────────────────────────────────── */
const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2  uRes;
uniform vec2  uMouse;

/* ── hash / noise ── */
vec3 hash3(vec2 p){
  vec3 q=vec3(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)),dot(p,vec2(419.2,371.9)));
  return fract(sin(q)*43758.5453);
}
float vnoise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  vec2 u=f*f*(3.-2.*f);
  float a=dot(hash3(i         ).xy,f-vec2(0,0));
  float b=dot(hash3(i+vec2(1,0)).xy,f-vec2(1,0));
  float c=dot(hash3(i+vec2(0,1)).xy,f-vec2(0,1));
  float d=dot(hash3(i+vec2(1,1)).xy,f-vec2(1,1));
  return .5+.5*mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p){
  float v=0.,a=.5;
  for(int i=0;i<6;i++){v+=a*vnoise(p);p=p*2.1+vec2(1.7,9.2);a*=.5;}
  return v;
}

/* ── palette ── */
vec3 palette(float t){
  /* deep navy → electric cyan → violet → magenta */
  vec3 a=vec3(.02,.04,.12);
  vec3 b=vec3(.04,.06,.18);
  vec3 c=vec3(.0,.6,1.0);
  vec3 d=vec3(.5,.0,1.0);
  if(t<.33) return mix(a,c,t*3.);
  if(t<.66) return mix(c,d,(t-.33)*3.);
  return mix(d,b,(t-.66)*3.);
}

void main(){
  vec2 uv=gl_FragCoord.xy/uRes;
  vec2 asp=vec2(uRes.x/uRes.y,1.);
  float t=uTime*.18;

  /* mouse influence */
  vec2 m=uMouse/uRes; m.y=1.-m.y;
  float md=length((uv-m)*asp);
  float pull=smoothstep(.55,.0,md)*.18;
  vec2 wuv=uv+normalize(uv-m+.001)*(-pull);

  /* layered fbm plasma */
  float n1=fbm(wuv*asp*2.2+vec2(t*.4, t*.3));
  float n2=fbm(wuv*asp*3.8+vec2(-t*.3,t*.5)+n1*.6);
  float n3=fbm(wuv*asp*1.4+vec2(t*.2,-t*.25)+n2*.4);
  float plasma=n1*.4+n2*.35+n3*.25;

  /* aurora bands */
  float band=sin(uv.y*3.14159+plasma*6.+t*1.2)*.5+.5;
  band=pow(band,2.2);

  /* color */
  vec3 col=palette(plasma);
  col=mix(col,palette(plasma+.3),band*.5);

  /* edge glow streaks */
  float streak=fbm(vec2(uv.x*4.+t*.6, uv.y*1.2+t*.3));
  col+=vec3(.0,.4,.9)*pow(streak,4.)*1.2;
  col+=vec3(.5,.0,.9)*pow(1.-streak,5.)*.8;

  /* mouse halo */
  float halo=smoothstep(.28,.0,md);
  col+=vec3(.1,.6,1.)*halo*.35;
  col+=vec3(.6,.1,1.)*halo*.2;

  /* vignette */
  float vig=1.-smoothstep(.4,1.3,length((uv-.5)*1.5));
  col*=vig*.85+.15;

  /* subtle grain */
  float g=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233))+uTime*137.)*43758.5453);
  col+=g*.018-.009;

  /* depth darkening at edges */
  col=mix(vec3(.01,.02,.06),col,vig);

  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}
`

export default function AuroraBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  const raf = useRef(0)
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 })

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'high-performance' })
    if (!gl) return

    const mk = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src); gl.compileShader(s); return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog); gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
    const pos = gl.getAttribLocation(prog, 'position')
    gl.enableVertexAttribArray(pos)
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0)

    const uTime  = gl.getUniformLocation(prog, 'uTime')
    const uRes   = gl.getUniformLocation(prog, 'uRes')
    const uMouse = gl.getUniformLocation(prog, 'uMouse')

    let W = 0, H = 0
    const resize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight
      const dpr = Math.min(devicePixelRatio, 2)
      canvas.width = W * dpr | 0; canvas.height = H * dpr | 0
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize); ro.observe(canvas)

    const onMove = (e: MouseEvent) => { mouse.current.tx = e.clientX; mouse.current.ty = e.clientY }
    const onTouch = (e: TouchEvent) => {
      mouse.current.tx = e.touches[0].clientX; mouse.current.ty = e.touches[0].clientY
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('touchmove', onTouch, { passive: true })

    const start = performance.now()
    const frame = (now: number) => {
      raf.current = requestAnimationFrame(frame)
      const m = mouse.current
      m.x += (m.tx - m.x) * .05; m.y += (m.ty - m.y) * .05
      const t = reduced ? 0 : (now - start) / 1000
      gl.uniform1f(uTime, t)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, m.x * (canvas.width / W), m.y * (canvas.height / H))
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
      window.removeEventListener('touchmove', onTouch)
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
