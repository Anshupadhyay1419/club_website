export interface ResponseRule {
  keywords: string[]
  response: string
}

export const rules: ResponseRule[] = [
  // ── JOINING ──
  {
    keywords: ['join', 'membership', 'sign up', 'register', 'enroll', 'become member', 'how to join'],
    response: 'To join RoboGenesis, fill out the contact form on our Contact page or email us at robogenesis@bennett.edu.in. We welcome all Bennett University students passionate about AI, Robotics, and Innovation!',
  },

  // ── ABOUT ──
  {
    keywords: ['about', 'mission', 'vision', 'what is robogenesis', 'who are you', 'tell me about'],
    response: 'RoboGenesis is a student-led tech club at Bennett University focused on AI, Robotics, IoT, and Embedded Systems. Our mission is to bridge academic theory with real-world engineering. We build projects, host events, and compete nationally.',
  },

  // ── PRESIDENT / LEADERSHIP ──
  {
    keywords: ['vice president', 'ansh', 'ansh upadhyay'],
    response: 'The Vice President is Ansh Upadhyay. He assists the President in managing club operations.',
  },
  {
    keywords: ['president', 'vansh', 'vansh joshi', 'leader', 'head of club'],
    response: 'The President of RoboGenesis is Vansh Joshi. He leads the club and oversees all activities.',
  },
  {
    keywords: ['secretary', 'akash', 'akash maurya'],
    response: 'The Secretary is Akash Maurya. He handles documentation and administrative tasks.',
  },
  {
    keywords: ['treasurer', 'swarnim', 'swarnim chaudhary', 'finance'],
    response: 'The Treasurer is Swarnim Chaudhary. He manages the club\'s finances and budget.',
  },
  {
    keywords: ['media head', 'priyanshi', 'priyanshi goyal', 'media'],
    response: 'The Media Head is Priyanshi Goyal. She manages social media, content, and club communications.',
  },
  {
    keywords: ['deputy treasurer', 'krishna', 'krishna gaur'],
    response: 'The Deputy Treasurer is Krishna Gaur. He assists in financial management.',
  },
  {
    keywords: ['tech head', 'shiva', 'shiva saroj', 'technical head'],
    response: 'The Tech Head is Shiva Saroj. He leads all technical projects and development activities.',
  },
  {
    keywords: ['media sub head', 'jiwak', 'jiwak kumar'],
    response: 'The Media Sub Head is Jiwak Kumar. He supports media and content creation.',
  },
  {
    keywords: ['management head', 'kshitij', 'kshitij dubey'],
    response: 'The Management Head is Kshitij Dubey. He oversees event management and logistics.',
  },
  {
    keywords: ['tech sub head', 'utkrisht', 'utkrisht suman'],
    response: 'The Tech Sub Head is Utkrisht Suman. He supports technical projects and development.',
  },

  // ── ALL MEMBERS ──
  {
    keywords: ['team', 'members', 'who are the members', 'core team', 'all members', 'club members'],
    response: 'Our core team:\n• Vansh Joshi – President\n• Ansh Upadhyay – Vice President\n• Akash Maurya – Secretary\n• Swarnim Chaudhary – Treasurer\n• Priyanshi Goyal – Media Head\n• Krishna Gaur – Deputy Treasurer\n• Shiva Saroj – Tech Head\n• Jiwak Kumar – Media Sub Head\n• Kshitij Dubey – Management Head\n• Utkrisht Suman – Tech Sub Head',
  },

  // ── FACULTY ──
  {
    keywords: ['who are the coordinators', 'club coordinators', 'both coordinators', 'coordinators name', 'coordinators are'],
    response: 'Our Club Coordinators are:\n• Dr. Prateek Yadav – Associate Professor in Electronics & Communication (Computer Vision & SLAM)\n• Dr. Navneet Pratap Singh – Assistant Professor (ML & AI Systems)',
  },
  {
    keywords: ['who are the patrons', 'club patrons', 'both patrons', 'patrons name', 'patrons are'],
    response: 'Our Patrons are:\n• Dr. Pratyush Pranav – Associate Professor (Robotics & Mechatronics)\n• Dr. Manoj Sharma – Senior Lecturer (Electronics & IoT)',
  },
  {
    keywords: ['faculty', 'advisor', 'professor', 'mentor', 'teacher', 'guide'],
    response: 'Our Faculty:\n\n🎓 Dean: Dr. Rajeev Tiwari (Computer Science – Deep Learning & AI)\n\n👨‍🏫 Patrons:\n• Dr. Pratyush Pranav (Robotics & Mechatronics)\n• Dr. Manoj Sharma (Electronics & IoT)\n\n🧑‍💼 Club Coordinators:\n• Dr. Prateek Yadav (Computer Vision & SLAM)\n• Dr. Navneet Pratap Singh (ML & AI Systems)',
  },
  {
    keywords: ['rajeev', 'rajeev tiwari', 'dean'],
    response: 'Dr. Rajeev Tiwari is our Dean and Faculty Advisor. He is a Professor of Computer Science with extensive research in deep learning, neural networks, and autonomous intelligent systems.',
  },
  {
    keywords: ['pratyush', 'pratyush pranav', 'patron'],
    response: 'Dr. Pratyush Pranav is a Patron of RoboGenesis. He is an Associate Professor specializing in robot kinematics, control theory, and mechatronics.',
  },
  {
    keywords: ['manoj', 'manoj sharma'],
    response: 'Dr. Manoj Sharma is a Patron of RoboGenesis. He is a Senior Lecturer in Electronics Engineering with expertise in wireless sensor networks and embedded hardware.',
  },
  {
    keywords: ['prateek', 'prateek yadav', 'coordinator'],
    response: 'Dr. Prateek Yadav is a Club Coordinator. He is an Associate Professor in Electronics & Communication with research in computer vision and visual SLAM systems.',
  },
  {
    keywords: ['navneet', 'navneet pratap', 'navneet singh'],
    response: 'Dr. Navneet Pratap Singh is a Club Coordinator. He is an Assistant Professor specializing in machine learning pipelines and AI-driven decision systems.',
  },

  // ── PROJECTS ──
  {
    keywords: ['how many projects', 'number of projects', 'total projects', 'projects done', 'projects completed', 'projects till now', 'how many project'],
    response: 'RoboGenesis has completed 2 projects so far:\n1. Line Tracing Car\n2. Obstacle Detection Car\n\nMore projects are in the pipeline! Visit our Projects page for full details.',
  },
  {
    keywords: ['projects', 'what have you built', 'portfolio', 'work', 'built'],
    response: 'Our projects:\n\n🤖 Line Tracing Car – Autonomous robot using IR sensors & PID control (Arduino, C++)\n\n🚗 Obstacle Detection Car – Smart robot with ultrasonic sensors for real-time obstacle avoidance (Arduino, C++)\n\nVisit our Projects page to see full details!',
  },
  {
    keywords: ['line tracing', 'line following', 'line car'],
    response: 'The Line Tracing Car is an autonomous robot that follows a predefined line path using IR sensors and PID control. It features high-speed navigation with smooth cornering and real-time error correction. Built with Arduino and C++.',
  },
  {
    keywords: ['obstacle', 'obstacle detection', 'obstacle car'],
    response: 'The Obstacle Detection Car is a smart robot equipped with ultrasonic and IR sensors to detect and autonomously avoid obstacles in real time. It features dynamic path replanning and collision-free navigation. Built with Arduino, C++, and Servo Motor.',
  },

  // ── EVENTS ──
  {
    keywords: ['events', 'upcoming events', 'what events', 'next event', 'upcoming', 'which event', 'any event', 'event coming', 'coming event', 'future event', 'schedule', 'when is', 'what is coming'],
    response: 'Upcoming Event:\n\n🔥 Deep Sight – April 24, 2026\nAn 18-hour hackathon focused on computer vision and AI. Teams build intelligent vision systems. Open to all Bennett University students!\n\nPast events include: Robotics Expo 2025, ML Study Group, Embedded Systems Workshop, and Industry Talk on AI in Robotics.',
  },
  {
    keywords: ['deep sight', 'deepsight', 'hackathon', 'vision hackathon'],
    response: 'Deep Sight is our upcoming 18-hour hackathon on April 24, 2026! Teams will build intelligent vision systems — from object detection to real-time scene understanding. Open to all university students. Register via our Contact page!',
  },
  {
    keywords: ['robotics expo', 'expo 2025'],
    response: 'Robotics Expo 2025 was our annual showcase with 200+ attendees, 15 project demos, and 3 industry partnerships. The Best Project award went to the Hexapod Walker team!',
  },
  {
    keywords: ['ml study', 'machine learning study', 'study group'],
    response: 'The ML Study Group Kickoff had 40 students enrolled, covering topics from linear regression to transformers over 12 weeks.',
  },
  {
    keywords: ['embedded workshop', 'embedded systems workshop'],
    response: 'The Embedded Systems Workshop had participants build a working temperature-controlled fan system using STM32 and FreeRTOS.',
  },

  // ── CONTACT ──
  {
    keywords: ['contact', 'email', 'reach', 'message', 'talk', 'connect'],
    response: 'You can reach us at:\n📧 robogenesis@bennett.edu.in\n\nOr fill out the Contact form on our website. We typically respond within 24 hours!',
  },

  // ── SOCIAL ──
  {
    keywords: ['instagram', 'linkedin', 'github', 'social media', 'follow'],
    response: 'Follow us on:\n📸 Instagram: @robogenesis\n💼 LinkedIn: RoboGenesis\n💻 GitHub: github.com/robogenesis',
  },

  // ── UNIVERSITY ──
  {
    keywords: ['bennett', 'university', 'college', 'where'],
    response: 'RoboGenesis is a tech club at Bennett University, Greater Noida. Visit the university website at https://www.bennett.edu.in/',
  },

  // ── BLOG ──
  {
    keywords: ['blog', 'tutorial', 'learn', 'resources', 'article', 'read'],
    response: 'Check out our Blog & Resources page for tutorials on ROS 2, PyTorch, IoT, and more — written by our own members!',
  },

  // ── GALLERY ──
  {
    keywords: ['gallery', 'photos', 'pictures', 'images', 'see'],
    response: 'Visit our Gallery page to see photos from our events, workshops, and project demos!',
  },

  // ── GREETINGS ──
  {
    keywords: ['hi', 'hello', 'hey', 'hii', 'helo', 'namaste'],
    response: 'Hello! 👋 Welcome to RoboGenesis! I can help you with info about our team, projects, events, faculty, and more. What would you like to know?',
  },
  {
    keywords: ['thanks', 'thank you', 'thankyou', 'great', 'awesome'],
    response: 'You\'re welcome! 😊 Feel free to ask anything else about RoboGenesis!',
  },

  // ── FALLBACK ──
  {
    keywords: [],
    response: 'I\'m not sure about that. You can ask me about our team members, projects, events, faculty, or how to join. Or email us at robogenesis@bennett.edu.in!',
  },
]

export function getResponse(input: string): string {
  const lower = input.toLowerCase()
  // Sort by keyword length descending so more specific matches win
  const sorted = [...rules].sort((a, b) => {
    const aMax = Math.max(...a.keywords.map(k => k.length), 0)
    const bMax = Math.max(...b.keywords.map(k => k.length), 0)
    return bMax - aMax
  })
  const match = sorted.find((r) => r.keywords.length > 0 && r.keywords.some((k) => lower.includes(k)))
  return match?.response ?? rules[rules.length - 1].response
}
