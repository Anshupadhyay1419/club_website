'use client'

export default function MeshBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base */}
      <div className="absolute inset-0" style={{ background: 'var(--bg)' }} />

      {/* Blob 1 — top left, indigo */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full opacity-[0.18]"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
          animation: 'blob1 18s ease-in-out infinite',
          filter: 'blur(60px)',
        }} />

      {/* Blob 2 — top right, violet */}
      <div className="absolute -top-20 right-0 w-[600px] h-[600px] rounded-full opacity-[0.14]"
        style={{
          background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
          animation: 'blob2 22s ease-in-out infinite',
          filter: 'blur(70px)',
        }} />

      {/* Blob 3 — center, cyan */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.10]"
        style={{
          background: 'radial-gradient(ellipse, #06b6d4 0%, transparent 70%)',
          animation: 'blob3 26s ease-in-out infinite',
          filter: 'blur(80px)',
        }} />

      {/* Blob 4 — bottom right, indigo */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
          animation: 'blob4 20s ease-in-out infinite',
          filter: 'blur(60px)',
        }} />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

      <style>{`
        @keyframes blob1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 60px) scale(0.95); }
        }
        @keyframes blob2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-80px, 40px) scale(1.05); }
          66% { transform: translate(40px, -60px) scale(1.1); }
        }
        @keyframes blob3 {
          0%, 100% { transform: translateX(-50%) scale(1); }
          50% { transform: translateX(-50%) scale(1.15) translateY(-30px); }
        }
        @keyframes blob4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, -40px) scale(1.08); }
        }
      `}</style>
    </div>
  )
}
