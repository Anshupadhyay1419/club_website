import { Heart, Cpu, Package, Mail, Shield, CheckCircle } from 'lucide-react'
import GlassCard from '@/components/ui/GlassCard'
import SectionHeading from '@/components/ui/SectionHeading'
import ScrollReveal from '@/components/ui/ScrollReveal'

const hardwareWishlist = [
  { name: 'Raspberry Pi 5', category: 'Computing', priority: 'High', use: 'AI edge computing & vision projects' },
  { name: 'Arduino Mega 2560', category: 'Microcontroller', priority: 'High', use: 'Robotics control systems' },
  { name: 'LiDAR Sensor (RPLiDAR A1)', category: 'Sensor', priority: 'High', use: 'Autonomous navigation & mapping' },
  { name: 'Servo Motors (MG996R)', category: 'Actuator', priority: 'Medium', use: 'Robotic arm & joint control' },
  { name: 'Ultrasonic Sensors (HC-SR04)', category: 'Sensor', priority: 'Medium', use: 'Obstacle detection systems' },
  { name: 'L298N Motor Driver', category: 'Electronics', priority: 'Medium', use: 'DC motor control for robots' },
  { name: 'ESP32 Dev Board', category: 'IoT', priority: 'Medium', use: 'WiFi/Bluetooth IoT projects' },
  { name: 'Lithium Battery Pack (7.4V)', category: 'Power', priority: 'Low', use: 'Portable robot power supply' },
]

const impactStats = [
  { value: '2+', label: 'Projects Built', icon: '🤖' },
  { value: '50+', label: 'Students Impacted', icon: '🎓' },
  { value: '1', label: 'Hackathon Hosted', icon: '🏆' },
  { value: '∞', label: 'Ideas in Pipeline', icon: '💡' },
]

const priorityColor: Record<string, string> = {
  High: '#ef4444',
  Medium: '#f59e0b',
  Low: '#22c55e',
}

export default function ContributePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {/* Hero */}
      <ScrollReveal>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
            style={{ background: 'var(--accent-soft)', color: 'var(--accent)', border: '1px solid var(--border-accent)' }}>
            <Heart size={14} />
            Support Student Innovation
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 font-[var(--font-space-grotesk)]"
            style={{ color: 'var(--text-primary)' }}>
            Fuel the Future of
            <span className="gradient-text"> Robotics & AI</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            RoboGenesis is a student-run club at Bennett University. Every contribution — big or small — directly powers our projects, workshops, and the next generation of engineers.
          </p>
        </div>
      </ScrollReveal>

      {/* Impact Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {impactStats.map((stat, i) => (
            <GlassCard key={i} className="text-center py-6">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-black mb-1" style={{ color: 'var(--accent)' }}>{stat.value}</div>
              <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            </GlassCard>
          ))}
        </div>
      </ScrollReveal>

      {/* Two contribution options */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">

        {/* Monetary Donation */}
        <ScrollReveal>
          <GlassCard hoverGlow className="h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'var(--accent-soft)' }}>💰</div>
              <div>
                <h2 className="text-xl font-bold font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>
                  Monetary Donation
                </h2>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Fund our hardware & events</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Your donation helps us purchase components, sensors, and tools needed to build real-world robotics and AI projects. Every rupee goes directly into student innovation.
            </p>

            {/* UPI Section */}
            <div className="rounded-xl p-5 mb-6" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>UPI Payment</p>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-lg font-bold font-mono" style={{ color: 'var(--accent)' }}>8178095270@upi</p>
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Scan or copy UPI ID</p>
                </div>
                <div className="text-3xl">📱</div>
              </div>
            </div>

            <div className="space-y-2 mb-6">
              {[
                { amount: '₹500', label: 'Buys 2 ultrasonic sensors' },
                { amount: '₹1,000', label: 'Funds a motor driver kit' },
                { amount: '₹2,500', label: 'Sponsors an Arduino board' },
                { amount: '₹5,000+', label: 'Funds a full project build' },
              ].map((tier) => (
                <div key={tier.amount} className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
                  <span className="font-bold text-sm" style={{ color: 'var(--accent)' }}>{tier.amount}</span>
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{tier.label}</span>
                </div>
              ))}
            </div>

            <a href="mailto:robogenesis@bennett.edu.in?subject=Monetary%20Donation%20to%20RoboGenesis&body=Hi%20RoboGenesis%20Team%2C%0A%0AI%20would%20like%20to%20make%20a%20monetary%20donation%20to%20support%20your%20club.%0A%0AAmount%3A%0AUPI%20Transaction%20ID%3A%0AName%3A%0A%0AThank%20you!"
              className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl font-bold text-white transition-all duration-200 hover:scale-[1.02]"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))', boxShadow: '0 0 20px var(--glow)' }}>
              <Heart size={16} />
              Donate Now
            </a>
          </GlassCard>
        </ScrollReveal>

        {/* Hardware Donation */}
        <ScrollReveal delay={0.1}>
          <GlassCard hoverGlow className="h-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'var(--accent-soft)' }}>🔧</div>
              <div>
                <h2 className="text-xl font-bold font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>
                  Hardware Donation
                </h2>
                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Donate components & equipment</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Have spare electronics, sensors, or robotics components? Donate them to RoboGenesis and watch students build something amazing with them.
            </p>

            <div className="rounded-xl p-4 mb-6" style={{ background: 'var(--bg-muted)', border: '1px solid var(--border)' }}>
              <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>Drop-off / Courier Address</p>
              <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>RoboGenesis Club</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Bennett University, Plot No 8-11</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Tech Zone II, Greater Noida</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Uttar Pradesh – 201310</p>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl mb-6"
              style={{ background: 'var(--accent-soft)', border: '1px solid var(--border-accent)' }}>
              <Shield size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Please email us before sending hardware so we can confirm receipt and provide acknowledgement.
              </p>
            </div>

            <a href="mailto:robogenesis@bennett.edu.in?subject=Hardware%20Donation%20to%20RoboGenesis&body=Hi%20RoboGenesis%20Team%2C%0A%0AI%20would%20like%20to%20donate%20the%20following%20hardware%3A%0A%0AItem(s)%3A%0ACondition%3A%0AQuantity%3A%0APreferred%20delivery%20method%3A%0A%0AThank%20you!"
              className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-200 hover:scale-[1.02]"
              style={{ border: '1px solid var(--accent)', color: 'var(--accent)', background: 'var(--accent-soft)' }}>
              <Package size={16} />
              Donate Hardware
            </a>
          </GlassCard>
        </ScrollReveal>
      </div>

      {/* Hardware Wishlist */}
      <ScrollReveal>
        <SectionHeading title="Hardware Wishlist" subtitle="Components we need most for upcoming projects" />
      </ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
        {hardwareWishlist.map((item, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <GlassCard className="flex items-start gap-4 py-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--accent-soft)' }}>
                <Cpu size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{item.name}</h4>
                  <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: `${priorityColor[item.priority]}20`, color: priorityColor[item.priority] }}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{item.category}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item.use}</p>
              </div>
            </GlassCard>
          </ScrollReveal>
        ))}
      </div>

      {/* Why Contribute */}
      <ScrollReveal>
        <GlassCard className="text-center max-w-3xl mx-auto">
          <div className="text-4xl mb-4">🙏</div>
          <h2 className="text-2xl font-bold mb-3 font-[var(--font-space-grotesk)]" style={{ color: 'var(--text-primary)' }}>
            Why Your Contribution Matters
          </h2>
          <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
            RoboGenesis operates entirely on student passion and community support. We have no corporate funding — every component we use is either self-funded or donated. Your contribution directly enables students to build, learn, and compete at a national level.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              { icon: <CheckCircle size={16} />, text: '100% goes to student projects' },
              { icon: <CheckCircle size={16} />, text: 'Acknowledgement on our website' },
              { icon: <CheckCircle size={16} />, text: 'Tax receipt available on request' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2" style={{ color: 'var(--accent)' }}>
                {item.icon}
                <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{item.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a href="mailto:robogenesis@bennett.edu.in?subject=Contribution%20Inquiry&body=Hi%20RoboGenesis%20Team%2C%0A%0AI%20am%20interested%20in%20contributing%20to%20your%20club."
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent2))', boxShadow: '0 0 20px var(--glow)' }}>
              <Mail size={16} />
              Get in Touch
            </a>
          </div>
        </GlassCard>
      </ScrollReveal>

    </div>
  )
}
