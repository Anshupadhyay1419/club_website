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
  },
  {
    id: 'p2',
    title: 'Obstacle Detection Car',
    description: 'A smart robot car equipped with ultrasonic and IR sensors to detect and autonomously avoid obstacles in real time. Features dynamic path replanning and collision-free navigation.',
    image: '/images/projects/obstacle.webp',
    techStack: ['Arduino', 'C++', 'Ultrasonic Sensor', 'IR Sensors', 'Servo Motor'],
    category: 'Robotics',
    githubUrl: 'https://github.com/robogenesis/obstacle-detection-car',
  },

]
