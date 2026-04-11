import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Line Tracing Car',
    description: 'An autonomous robot car that follows a predefined line path using IR sensors and PID control. Capable of high-speed navigation with smooth cornering and real-time error correction.',
    image: '/images/projects/line.webp',
    techStack: ['Arduino', 'C++', 'IR Sensors', 'PID Control', 'Motor Drivers'],
    category: 'Robotics',
    githubUrl: 'https://github.com/robogenesis/line-tracing-car',
    pdfUrl: '/docs/line-tracing-car.pdf',
    fullDescription: `The Line Tracing Car is an autonomous robot built by RoboGenesis that follows a predefined black line on a white surface using IR sensors and PID control algorithm.\n\nKey Features:\n• 5-channel IR sensor array for precise line detection\n• PID control for smooth and accurate navigation\n• High-speed DC motors with L298N motor driver\n• Real-time error correction and cornering\n• Arduino Uno microcontroller\n\nTechnical Specifications:\n• Microcontroller: Arduino Uno (ATmega328P)\n• Sensors: 5x IR proximity sensors\n• Motors: 2x DC gear motors (200 RPM)\n• Driver: L298N dual H-bridge\n• Power: 7.4V LiPo battery\n• Speed: Up to 0.5 m/s\n\nThe PID algorithm continuously reads sensor values and adjusts motor speeds to keep the robot centered on the line, enabling smooth navigation through curves and intersections.`,
  },
  {
    id: 'p2',
    title: 'Obstacle Detection Car',
    description: 'A smart robot car equipped with ultrasonic and IR sensors to detect and autonomously avoid obstacles in real time. Features dynamic path replanning and collision-free navigation.',
    image: '/images/projects/obstacle.webp',
    techStack: ['Arduino', 'C++', 'Ultrasonic Sensor', 'IR Sensors', 'Servo Motor'],
    category: 'Robotics',
    githubUrl: 'https://github.com/robogenesis/obstacle-detection-car',
    pdfUrl: '/docs/obstacle-detection-car.pdf',
    fullDescription: `The Obstacle Detection Car is an autonomous robot that uses ultrasonic and IR sensors to detect obstacles and navigate around them in real time.\n\nKey Features:\n• HC-SR04 ultrasonic sensor for distance measurement\n• Servo motor for 180° scanning\n• Dynamic path replanning algorithm\n• Collision-free navigation in unknown environments\n• Real-time obstacle avoidance\n\nTechnical Specifications:\n• Microcontroller: Arduino Uno\n• Primary Sensor: HC-SR04 Ultrasonic (2cm - 400cm range)\n• Side Sensors: 2x IR proximity sensors\n• Servo: SG90 (180° rotation for scanning)\n• Motors: 2x DC gear motors with L298N driver\n• Detection Range: 2cm to 200cm\n• Response Time: <50ms\n\nThe robot continuously scans its environment, detects obstacles within range, and autonomously decides the best path to avoid them using a decision tree algorithm.`,
  },

]
