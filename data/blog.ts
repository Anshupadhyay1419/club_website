import type { BlogPost } from '@/types'

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    slug: 'getting-started-with-ros2',
    title: 'Getting Started with ROS 2: A Beginner\'s Guide',
    excerpt: 'ROS 2 is the backbone of modern robotics development. In this guide, we walk through setting up your first ROS 2 workspace and writing your first publisher/subscriber node.',
    content: `# Getting Started with ROS 2
    author?: string;

ROS 2 (Robot Operating System 2) is the industry-standard framework for building robot software. Unlike its predecessor, ROS 2 is built on DDS middleware, offering real-time capabilities and improved security.

## Installationgit status

First, install ROS 2 Humble on Ubuntu 22.04:

\`\`\`bash
sudo apt install ros-humble-desktop
\`\`\`

## Your First Node

Create a simple publisher node in Python:

\`\`\`python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5
        self.timer = self.create_timer(timer_period, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello, ROS 2!'
        self.publisher_.publish(msg)
\`\`\`

This is just the beginning — ROS 2 has a rich ecosystem of packages for navigation, perception, and manipulation.`,
    category: 'Robotics',
    publishedAt: '2026-03-15T10:00:00.000Z',
    coverImage: '/images/blog/ros2-guide.jpg',
  },

]
