'use client'
import { useEffect, useRef } from 'react'

const VERT = `attribute vec3 aPos;attribute vec2 aUV;attribute vec3 aNorm;uniform mat4 uMVP;uniform mat3 uNorm;varying vec2 vUV;varying vec3 vNorm;varying vec3 vPos;void main(){vUV=aUV;vNorm=normalize(uNorm*aNorm);vPos=aPos;gl_Position=uMVP*vec4(aPos,1.0);}`

const FRAG = `precision highp float;
varying vec2 vUV;varying vec3 vNorm;varying vec3 vPos;
uniform float uTime;uniform vec3 uLight;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.1+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  float n=fbm(vUV*vec2(6.,3.)+vec2(1.3,.7));
  float land=smoothstep(.47,.53,n);
  vec3 ocean=mix(vec3(.02,.08,.28),vec3(.04,.18,.48),fbm(vUV*4.+.5));
  vec3 landC=mix(vec3(.04,.20,.10),vec3(.10,.32,.07),fbm(vUV*8.+2.1));
  float lat=abs(vUV.y-.5)*2.;
  landC=mix(landC,vec3(.75,.88,.96),smoothstep(.76,.92,lat));
  vec3 surf=mix(ocean,landC,land);
  float diff=max(dot(vNorm,normalize(uLight)),0.);
  vec3 viewDir=normalize(-vPos);
  vec3 halfV=normalize(normalize(uLight)+viewDir);
  float spec=pow(max(dot(vNorm,halfV),0.),60.)*(1.-land)*.55;
  float dark=1.-smoothstep(0.,.25,diff);
  float city=fbm(vUV*vec2(12.,6.)+vec2(3.1,1.4));
  city=smoothstep(.63,.73,city)*land*dark*.85;
  float cloud=fbm(vUV*vec2(5.,2.5)+vec2(uTime*.008,0.));
  cloud=smoothstep(.53,.63,cloud)*.5;
  surf=mix(surf,vec3(.78,.88,.96),cloud);
  vec3 col=surf*(diff+.09)+vec3(spec)+vec3(1.,.85,.4)*city;
  float rim=pow(1.-max(dot(vNorm,viewDir),0.),3.5);
  col+=vec3(.08,.38,1.)*rim*.85;
  gl_FragColor=vec4(clamp(col,0.,1.),1.);
}`

const ATM_VERT = `attribute vec3 aPos;attribute vec3 aNorm;uniform mat4 uMVP;uniform mat3 uNorm;varying vec3 vNorm;varying vec3 vPos;void main(){vNorm=normalize(uNorm*aNorm);vPos=aPos;gl_Position=uMVP*vec4(aPos*1.055,1.0);}`
const ATM_FRAG = `precision highp float;varying vec3 vNorm;varying vec3 vPos;uniform vec3 uLight;void main(){vec3 v=normalize(-vPos);float rim=pow(1.-max(dot(vNorm,v),0.),2.8);float d=max(dot(vNorm,normalize(uLight)),0.)*.5+.5;gl_FragColor=vec4(vec3(.12,.45,1.)*rim*d,rim*.65);}`
const STAR_VERT = `attribute vec2 aPos;attribute float aSize;attribute float aBright;varying float vB;void main(){vB=aBright;gl_Position=vec4(aPos,.999,1.);gl_PointSize=aSize;}`
const STAR_FRAG = `precision mediump float;varying float vB;void main(){float d=length(gl_PointCoord-.5)*2.;float a=smoothstep(1.,0.,d)*vB;gl_FragColor=vec4(.82,.92,1.,a);}`

function m4mul(a: Float32Array, b: Float32Array) {
  const r = new Float32Array(16)
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) for (let k = 0; k < 4; k++) r[i*4+j] += a[i*4+k]*b[k*4+j]
  return r
}
function persp(fov: number, asp: number, n: number, f: number) {
  const t = 1/Math.tan(fov/2), m = new Float32Array(16)
  m[0]=t/asp; m[5]=t; m[10]=(f+n)/(n-f); m[11]=-1; m[14]=2*f*n/(n-f); return m
}
function rotY(a: number) { const m=new Float32Array(16); m[0]=Math.cos(a); m[2]=Math.sin(a); m[5]=1; m[8]=-Math.sin(a); m[10]=Math.cos(a); m[15]=1; return m }
function rotX(a: number) { const m=new Float32Array(16); m[0]=1; m[5]=Math.cos(a); m[6]=-Math.sin(a); m[9]=Math.sin(a); m[10]=Math.cos(a); m[15]=1; return m }
function trans(x: number, y: number, z: number) { const m=new Float32Array(16); m[0]=m[5]=m[10]=m[15]=1; m[12]=x; m[13]=y; m[14]=z; return m }

function sphere(stacks: number, slices: number) {
  const pos: number[]=[], uv: number[]=[], norm: number[]=[], idx: number[]=[]
  for (let i=0;i<=stacks;i++) { const phi=(i/stacks)*Math.PI; for (let j=0;j<=slices;j++) { const th=(j/slices)*2*Math.PI; const x=Math.sin(phi)*Math.cos(th),y=Math.cos(phi),z=Math.sin(phi)*Math.sin(th); pos.push(x,y,z); norm.push(x,y,z); uv.push(j/slices,i/stacks) } }
  for (let i=0;i<stacks;i++) for (let j=0;j<slices;j++) { const a=i*(slices+1)+j,b=a+slices+1; idx.push(a,b,a+1,b,b+1,a+1) }
  return { pos:new Float32Array(pos), uv:new Float32Array(uv), norm:new Float32Array(norm), idx:new Uint16Array(idx) }
}

function stars(n: number) {
  const p: number[]=[], s: number[]=[], b: number[]=[]
  for (let i=0;i<n;i++) { p.push(Math.random()*2-1,Math.random()*2-1); s.push(Math.random()*2+.5); b.push(Math.random()*.7+.3) }
  return { p:new Float32Array(p), s:new Float32Array(s), b:new Float32Array(b) }
}

function prog(gl: WebGLRenderingContext, vs: string, fs: string) {
  const mk=(t: number,src: string)=>{ const s=gl.createShader(t)!; gl.shaderSource(s,src); gl.compileShader(s); return s }
  const p=gl.createProgram()!; gl.attachShader(p,mk(gl.VERTEX_SHADER,vs)); gl.attachShader(p,mk(gl.FRAGMENT_SHADER,fs)); gl.linkProgram(p); return p
}

function buf(gl: WebGLRenderingContext, data: BufferSource, target: number = gl.ARRAY_BUFFER) {
  const b=gl.createBuffer()!; gl.bindBuffer(target,b); gl.bufferData(target,data,gl.STATIC_DRAW); return b
}

function attr(gl: WebGLRenderingContext, p: WebGLProgram, name: string, b: WebGLBuffer, size: number) {
  const l=gl.getAttribLocation(p,name); if(l<0) return; gl.bindBuffer(gl.ARRAY_BUFFER,b); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l,size,gl.FLOAT,false,0,0)
}

export default function AICoreBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  const raf = useRef(0)
  const mouse = useRef({ rx:0, ry:0, trx:0, try:0 })

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return
    const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    const gl = canvas.getContext('webgl',{antialias:true,alpha:false,powerPreference:'high-performance'}); if (!gl) return

    gl.enable(gl.DEPTH_TEST); gl.enable(gl.BLEND)

    const gProg = prog(gl,VERT,FRAG)
    const aProg = prog(gl,ATM_VERT,ATM_FRAG)
    const sProg = prog(gl,STAR_VERT,STAR_FRAG)

    const sp = sphere(64,64)
    const pBuf = buf(gl,sp.pos); const uvBuf = buf(gl,sp.uv); const nBuf = buf(gl,sp.norm)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const iBuf = buf(gl, sp.idx as any, gl.ELEMENT_ARRAY_BUFFER as any)
    const st = stars(900)
    const spBuf = buf(gl,st.p); const ssBuf = buf(gl,st.s); const sbBuf = buf(gl,st.b)

    let W=0,H=0
    const resize=()=>{ const dpr=Math.min(devicePixelRatio,2); W=canvas.offsetWidth; H=canvas.offsetHeight; canvas.width=W*dpr|0; canvas.height=H*dpr|0; gl.viewport(0,0,canvas.width,canvas.height) }
    resize(); const ro=new ResizeObserver(resize); ro.observe(canvas)

    const onMove=(e: MouseEvent)=>{ mouse.current.trx=((e.clientY/H)-.5)*.35; mouse.current.try=((e.clientX/W)-.5)*.55 }
    window.addEventListener('mousemove',onMove)

    const t0=performance.now()
    const frame=(now: number)=>{
      raf.current=requestAnimationFrame(frame)
      const t=reduced?0:(now-t0)/1000
      const m=mouse.current; m.rx+=(m.trx-m.rx)*.04; m.ry+=(m.try-m.ry)*.04

      gl.clearColor(.01,.01,.055,1); gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT)

      const asp=canvas.width/canvas.height
      const proj=persp(.7,asp,.1,100)
      const mv=m4mul(trans(0,0,-2.65),m4mul(rotX(m.rx-.12),rotY(t*.11+m.ry)))
      const mvp=m4mul(proj,mv)
      const nm=new Float32Array([mv[0],mv[1],mv[2],mv[4],mv[5],mv[6],mv[8],mv[9],mv[10]])
      const lx=Math.cos(t*.04)*1.6,ly=.9,lz=Math.sin(t*.04)*1.6

      /* stars */
      gl.disable(gl.DEPTH_TEST); gl.blendFunc(gl.SRC_ALPHA,gl.ONE)
      gl.useProgram(sProg)
      attr(gl,sProg,'aPos',spBuf,2); attr(gl,sProg,'aSize',ssBuf,1); attr(gl,sProg,'aBright',sbBuf,1)
      gl.drawArrays(gl.POINTS,0,900)

      /* globe */
      gl.enable(gl.DEPTH_TEST); gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA)
      gl.useProgram(gProg)
      gl.uniformMatrix4fv(gl.getUniformLocation(gProg,'uMVP'),false,mvp)
      gl.uniformMatrix3fv(gl.getUniformLocation(gProg,'uNorm'),false,nm)
      gl.uniform1f(gl.getUniformLocation(gProg,'uTime'),t)
      gl.uniform3f(gl.getUniformLocation(gProg,'uLight'),lx,ly,lz)
      attr(gl,gProg,'aPos',pBuf,3); attr(gl,gProg,'aUV',uvBuf,2); attr(gl,gProg,'aNorm',nBuf,3)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iBuf)
      gl.drawElements(gl.TRIANGLES,sp.idx.length,gl.UNSIGNED_SHORT,0)

      /* atmosphere */
      gl.disable(gl.DEPTH_TEST); gl.blendFunc(gl.SRC_ALPHA,gl.ONE)
      gl.useProgram(aProg)
      gl.uniformMatrix4fv(gl.getUniformLocation(aProg,'uMVP'),false,mvp)
      gl.uniformMatrix3fv(gl.getUniformLocation(aProg,'uNorm'),false,nm)
      gl.uniform3f(gl.getUniformLocation(aProg,'uLight'),lx,ly,lz)
      attr(gl,aProg,'aPos',pBuf,3); attr(gl,aProg,'aNorm',nBuf,3)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,iBuf)
      gl.drawElements(gl.TRIANGLES,sp.idx.length,gl.UNSIGNED_SHORT,0)
    }
    raf.current=requestAnimationFrame(frame)

    const onVis=()=>{ if(document.hidden) cancelAnimationFrame(raf.current); else raf.current=requestAnimationFrame(frame) }
    document.addEventListener('visibilitychange',onVis)

    return ()=>{ cancelAnimationFrame(raf.current); ro.disconnect(); window.removeEventListener('mousemove',onMove); document.removeEventListener('visibilitychange',onVis) }
  },[])

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{display:'block'}} aria-hidden="true" />
}
