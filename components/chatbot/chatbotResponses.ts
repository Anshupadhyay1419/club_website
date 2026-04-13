// ── Full club knowledge base for the chatbot ──

export interface ResponseRule {
  keywords: string[]
  response: string
}

export const rules: ResponseRule[] = [
  // ── GREETINGS ──
  {
    keywords: ['hi', 'hello', 'hey', 'hii', 'helo', 'namaste', 'good morning', 'good evening'],
    response: 'Hello! 👋 Welcome to RoboGenesis! I\'m your club assistant. Ask me anything about our team, projects, events, faculty, or how to join!',
  },
  {
    keywords: ['thanks', 'thank you', 'thankyou', 'great', 'awesome', 'nice', 'good'],
    response: 'You\'re welcome! 😊 Feel free to ask anything else about RoboGenesis!',
  },

  // ── ABOUT ──
  {
    keywords: ['about', 'mission', 'vision', 'what is robogenesis', 'who are you', 'tell me about', 'what do you do', 'purpose', 'goal'],
    response: `🤖 About RoboGenesis:

RoboGenesis is a student-led tech club at Bennett University, Greater Noida focused on AI, Robotics, IoT, and Embedded Systems.

🎯 Mission: Bridge the gap between academic theory and real-world engineering through hands-on projects, workshops, and competitions.

🌟 Vision: To be the premier university tech club producing graduates ready to lead the next wave of technological innovation.

🔬 Focus Areas:
• Artificial Intelligence – ML, Deep Learning, Computer Vision
• Robotics – Autonomous systems, control theory, mechatronics
• Internet of Things – Smart sensors, edge computing, cloud platforms
• Embedded Systems – Microcontrollers, hardware design

📍 Location: Bennett University, Greater Noida, Uttar Pradesh, India
📧 Email: robogenesis@bennett.edu.in`,
  },

  // ── JOINING ──
  {
    keywords: ['join', 'membership', 'sign up', 'register', 'enroll', 'become member', 'how to join', 'apply'],
    response: `✅ How to Join RoboGenesis:

1. Email us at robogenesis@bennett.edu.in
2. Or fill out the Contact form on our website
3. We welcome ALL Bennett University students passionate about AI, Robotics, and Innovation!

No prior experience needed — just curiosity and enthusiasm! 🚀`,
  },

  // ── FULL TEAM ──
  {
    keywords: ['team', 'members', 'who are the members', 'core team', 'all members', 'club members', 'show team', 'list members'],
    response: `👥 RoboGenesis Core Team:

🏆 Leadership:
• Vansh Joshi – President
• Ansh Upadhyay – Vice President
• Akash Maurya – Secretary
• Swarnim Chaudhary – Treasurer
• Krishna Gaur – Deputy Treasurer

🛠️ Technical:
• Shiva Saroj – Tech Head

📣 Media & Communications:
• Priyanshi Goyal – Media Head
• Jiwak Kumar – Media Sub Head

📋 Operations:
• Kshitij Dubey – Management Head`,
  },

  // ── INDIVIDUAL MEMBERS ──
  {
    keywords: ['president', 'vansh', 'vansh joshi'],
    response: '🏆 President: Vansh Joshi\nVansh leads RoboGenesis and oversees all club activities, strategy, and direction.',
  },
  {
    keywords: ['vice president', 'ansh', 'ansh upadhyay'],
    response: '🏆 Vice President: Ansh Upadhyay\nAnsh assists the President in managing club operations and represents the club in his absence.',
  },
  {
    keywords: ['secretary', 'akash', 'akash maurya'],
    response: '📋 Secretary: Akash Maurya\nAkash handles all documentation, meeting minutes, and administrative tasks for the club.',
  },
  {
    keywords: ['treasurer', 'swarnim', 'swarnim chaudhary', 'finance', 'budget'],
    response: '💰 Treasurer: Swarnim Chaudhary\nSwarnim manages the club\'s finances, budget allocation, and expense tracking.',
  },
  {
    keywords: ['media head', 'priyanshi', 'priyanshi goyal'],
    response: '📸 Media Head: Priyanshi Goyal\nPriyanshi manages social media, content creation, photography, and club communications.',
  },
  {
    keywords: ['deputy treasurer', 'krishna', 'krishna gaur'],
    response: '💰 Deputy Treasurer: Krishna Gaur\nKrishna assists in financial management and budget planning.',
  },
  {
    keywords: ['tech head', 'shiva', 'shiva saroj', 'technical head'],
    response: '⚙️ Tech Head: Shiva Saroj\nShiva leads all technical projects, development activities, and technical workshops.',
  },
  {
    keywords: ['media sub head', 'jiwak', 'jiwak kumar'],
    response: '📸 Media Sub Head: Jiwak Kumar\nJiwak supports media production, video editing, and content creation.',
  },
  {
    keywords: ['management head', 'kshitij', 'kshitij dubey'],
    response: '📋 Management Head: Kshitij Dubey\nKshitij oversees event management, logistics, and club operations.',
  },

  // ── FACULTY ──
  {
    keywords: ['faculty', 'advisor', 'professor', 'mentor', 'teacher', 'guide', 'all faculty', 'faculty members'],
    response: `🎓 RoboGenesis Faculty:

👑 Dean:
• Dr. Rajeev Tiwari – Professor & Dean, School of Artificial Intelligence, Bennett University

🤝 Patrons:
• Dr. Pratyush Pranav – Associate Professor (Robot Kinematics, Control Theory, Mechatronics)
• Dr. Manoj Sharma – Senior Lecturer (Wireless Sensor Networks, Edge Computing, Embedded Hardware)

🧑‍💼 Club Coordinators:
• Dr. Prateek Yadav – Associate Professor (Real-time Image Processing, Object Detection, Visual SLAM)
• Dr. Navneet Pratap Singh – Assistant Professor (ML Pipelines, Predictive Analytics, AI Decision Systems)`,
  },
  {
    keywords: ['rajeev', 'rajeev tiwari', 'dean'],
    response: '👑 Dr. Rajeev Tiwari\nRole: Professor & Dean, School of Artificial Intelligence at Bennett University\nHe provides visionary leadership and academic guidance to RoboGenesis.',
  },
  {
    keywords: ['pratyush', 'pratyush pranav'],
    response: '🤝 Dr. Pratyush Pranav (Patron)\nAssociate Professor specializing in robot kinematics, control theory, and mechatronics with numerous published research papers.',
  },
  {
    keywords: ['manoj', 'manoj sharma'],
    response: '🤝 Dr. Manoj Sharma (Patron)\nSenior Lecturer in Electronics Engineering with expertise in wireless sensor networks, edge computing, and embedded hardware design.',
  },
  {
    keywords: ['prateek', 'prateek yadav', 'coordinator'],
    response: '🧑‍💼 Dr. Prateek Yadav (Club Coordinator)\nAssociate Professor in Electronics & Communication. Research focus on real-time image processing, object detection, and visual SLAM systems.',
  },
  {
    keywords: ['navneet', 'navneet pratap', 'navneet singh'],
    response: '🧑‍💼 Dr. Navneet Pratap Singh (Club Coordinator)\nAssistant Professor specializing in machine learning pipelines, predictive analytics, and AI-driven decision systems.',
  },

  // ── PROJECTS ──
  {
    keywords: ['how many projects', 'number of projects', 'total projects', 'projects done', 'projects completed', 'projects till now'],
    response: 'RoboGenesis has completed 2 projects so far:\n1. 🚗 Line Tracing Car\n2. 🤖 Obstacle Detection Car\n\nMore projects are currently in development!',
  },
  {
    keywords: ['projects', 'what have you built', 'portfolio', 'work', 'built', 'all projects', 'show projects'],
    response: `🛠️ RoboGenesis Projects:

1. 🚗 Line Tracing Car (Robotics)
   Autonomous robot following a line using IR sensors & PID control.
   Tech: Arduino, C++, IR Sensors, PID Control, Motor Drivers
   Features: 5-channel IR array, smooth cornering, real-time error correction

2. 🤖 Obstacle Detection Car (Robotics)
   Smart robot detecting & avoiding obstacles using ultrasonic sensors.
   Tech: Arduino, C++, Ultrasonic Sensor, IR Sensors, Servo Motor
   Features: 180° scanning, dynamic path replanning, <50ms response time`,
  },
  {
    keywords: ['line tracing', 'line following', 'line car'],
    response: `🚗 Line Tracing Car:

An autonomous robot that follows a predefined line path.

📋 Key Features:
• 5-channel IR sensor array for precise line detection
• PID control for smooth and accurate navigation
• High-speed DC motors with L298N motor driver
• Real-time error correction through curves

⚙️ Specs:
• Microcontroller: Arduino Uno (ATmega328P)
• Sensors: 5x IR proximity sensors
• Motors: 2x DC gear motors (200 RPM)
• Power: 7.4V LiPo battery
• Speed: Up to 0.5 m/s`,
  },
  {
    keywords: ['obstacle', 'obstacle detection', 'obstacle car'],
    response: `🤖 Obstacle Detection Car:

A smart robot that detects and avoids obstacles autonomously.

📋 Key Features:
• HC-SR04 ultrasonic sensor for distance measurement
• Servo motor for 180° environment scanning
• Dynamic path replanning algorithm
• Collision-free navigation in unknown environments

⚙️ Specs:
• Microcontroller: Arduino Uno
• Primary Sensor: HC-SR04 Ultrasonic (2cm–400cm range)
• Side Sensors: 2x IR proximity sensors
• Servo: SG90 (180° rotation)
• Detection Range: 2cm to 200cm
• Response Time: <50ms`,
  },

  // ── EVENTS ──
  {
    keywords: ['events', 'upcoming events', 'what events', 'next event', 'upcoming', 'which event', 'any event', 'event coming', 'future event', 'schedule', 'all events'],
    response: `📅 RoboGenesis Events:

🔥 Upcoming:
• Deep Sight – April 24, 2026
  18-hour hackathon on Computer Vision & AI
  Open to all Bennett University students
  Register: unstop.com (link on Events page)

✅ Past Events:
• Workshop on Line Maze Solver (Jan 2026)`,
  },
  {
    keywords: ['deep sight', 'deepsight', 'hackathon', 'vision hackathon'],
    response: `🔥 Deep Sight Hackathon:

📅 Date: April 24, 2026
⏱️ Duration: 18 hours
🎯 Theme: Computer Vision & AI

Teams will build intelligent vision systems — from object detection to real-time scene understanding.

✅ Open to all Bennett University students
🔗 Register on Unstop (link available on our Events page)`,
  },

  // ── CONTACT ──
  {
    keywords: ['contact', 'email', 'reach', 'message', 'talk', 'connect', 'get in touch'],
    response: `📬 Contact RoboGenesis:

📧 Email: robogenesis@bennett.edu.in
📍 Location: Bennett University, Greater Noida, UP, India

💬 You can also fill out the Contact form on our website.
We typically respond within 24 hours!`,
  },

  // ── SOCIAL MEDIA ──
  {
    keywords: ['instagram', 'linkedin', 'github', 'social media', 'follow', 'social'],
    response: `📱 Follow RoboGenesis:

📸 Instagram: @robogenesis_bu
💼 LinkedIn: RoboGenesis Club
💻 GitHub: github.com/robogenesis`,
  },

  // ── UNIVERSITY ──
  {
    keywords: ['bennett', 'university', 'college', 'where', 'location', 'campus'],
    response: '🏫 RoboGenesis is based at Bennett University, Greater Noida, Uttar Pradesh, India.\nWebsite: https://www.bennett.edu.in/',
  },

  // ── BLOG ──
  {
    keywords: ['blog', 'tutorial', 'learn', 'resources', 'article', 'read', 'ros', 'ros2'],
    response: `📚 RoboGenesis Blog:

We publish tutorials and articles written by our members:

📖 Getting Started with ROS 2 – A beginner's guide to setting up ROS 2 workspace and writing publisher/subscriber nodes.

More articles on PyTorch, IoT, Embedded Systems, and Computer Vision coming soon!`,
  },

  // ── GALLERY ──
  {
    keywords: ['gallery', 'photos', 'pictures', 'images'],
    response: '🖼️ Our Gallery has photos from events, workshops, and project demos including team photos, certificate ceremonies, and robotics workshops at Bennett University.',
  },

  // ── FALLBACK ──
  {
    keywords: [],
    response: 'I\'m not sure about that. You can ask me about:\n• 👥 Team members & roles\n• 🛠️ Projects\n• 📅 Events\n• 🎓 Faculty\n• 📬 Contact info\n• ℹ️ About the club\n\nOr email us at robogenesis@bennett.edu.in!',
  },
]

export function getResponse(input: string): string {
  const lower = input.toLowerCase().trim()

  // Sort rules by longest keyword match first (more specific wins)
  const sorted = [...rules].filter(r => r.keywords.length > 0)
    .sort((a, b) => {
      const aMax = Math.max(...a.keywords.map(k => k.length))
      const bMax = Math.max(...b.keywords.map(k => k.length))
      return bMax - aMax
    })

  const match = sorted.find(r => r.keywords.some(k => lower.includes(k)))
  return match?.response ?? rules[rules.length - 1].response
}
