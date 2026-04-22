'use client'

import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Heart, X, Smartphone } from 'lucide-react'

const UPI_ID = '8178095270@upi'
const UPI_LINK = `upi://pay?pa=${UPI_ID}&pn=RoboGenesis&cu=INR`

export default function DonateButton() {
  const [showQR, setShowQR] = useState(false)

  return (
    <>
      {/* Primary button - always shows QR + UPI link */}
      <button
        onClick={() => setShowQR(true)}
        className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl font-bold text-white transition-all duration-200 hover:scale-[1.02] mb-3"
        style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))', boxShadow: '0 0 20px var(--glow)' }}
      >
        <Heart size={16} />
        Donate Now via UPI
      </button>
      <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
        Scan QR with GPay · PhonePe · Paytm
      </p>

      {/* QR Modal */}
      {showQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setShowQR(false)}
        >
          <div
            className="relative rounded-2xl p-8 max-w-sm w-full text-center"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', boxShadow: '0 24px 64px rgba(0,0,0,0.6)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={() => setShowQR(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full"
              style={{ background: 'var(--bg-muted)', color: 'var(--text-muted)' }}
            >
              <X size={16} />
            </button>

            <h3 className="text-xl font-bold mb-1 font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>
              Scan to Donate
            </h3>
            <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
              Open GPay, PhonePe, or Paytm → Scan QR
            </p>

            {/* QR Code */}
            <div className="flex justify-center mb-5">
              <div className="p-4 rounded-xl bg-white inline-block">
                <QRCodeSVG
                  value={UPI_LINK}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                />
              </div>
            </div>

            <p className="text-sm font-bold font-mono mb-1" style={{ color: 'var(--accent)' }}>{UPI_ID}</p>
            <p className="text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
              🔐 Registered to: <strong>Swarnim Chaudhary</strong> (Club Treasurer)
            </p>

            {/* Mobile direct link */}
            <a
              href={UPI_LINK}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-200"
              style={{ background: 'var(--accent)', boxShadow: '0 0 12px var(--glow)' }}
            >
              <Smartphone size={15} />
              Open UPI App (Mobile)
            </a>
          </div>
        </div>
      )}
    </>
  )
}
