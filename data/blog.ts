import type { BlogPost } from '@/types'

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    slug: 'getting-started-with-ros2',
    title: 'Getting Started with ROS 2: A Beginner\'s Guide',
    excerpt: 'ROS 2 is the backbone of modern robotics development. In this guide, we walk through setting up your first ROS 2 workspace and writing your first publisher/subscriber node.',
    content: `# Getting Started with ROS 2

ROS 2 (Robot Operating System 2) is the industry-standard framework for building robot software. Unlike its predecessor, ROS 2 is built on DDS middleware, offering real-time capabilities and improved security.

## Installation

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
  {
    id: 'b2',
    slug: 'building-cnn-from-scratch',
    title: 'Building a CNN from Scratch with PyTorch',
    excerpt: 'Convolutional Neural Networks are the foundation of modern computer vision. This tutorial walks you through building and training a CNN on the CIFAR-10 dataset using PyTorch.',
    content: `# Building a CNN from Scratch with PyTorch

Convolutional Neural Networks (CNNs) have revolutionized computer vision. Let's build one from scratch.

## Architecture

\`\`\`python
import torch
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(64 * 8 * 8, 512)
        self.fc2 = nn.Linear(512, 10)
        self.relu = nn.ReLU()

    def forward(self, x):
        x = self.pool(self.relu(self.conv1(x)))
        x = self.pool(self.relu(self.conv2(x)))
        x = x.view(-1, 64 * 8 * 8)
        x = self.relu(self.fc1(x))
        return self.fc2(x)
\`\`\`

Train this model on CIFAR-10 and you'll achieve ~75% accuracy in just a few epochs.`,
    category: 'AI',
    publishedAt: '2026-02-28T09:00:00.000Z',
    coverImage: '/images/blog/cnn-pytorch.jpg',
  },
  {
    id: 'b3',
    slug: 'esp32-mqtt-iot-dashboard',
    title: 'Building an IoT Dashboard with ESP32 and MQTT',
    excerpt: 'Learn how to connect an ESP32 to an MQTT broker, publish sensor data, and visualize it on a real-time web dashboard using Node.js and Chart.js.',
    content: `# Building an IoT Dashboard with ESP32 and MQTT

MQTT is the lightweight messaging protocol of choice for IoT. Here's how to build a complete pipeline.

## ESP32 Publisher

\`\`\`cpp
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "YOUR_WIFI";
const char* password = "YOUR_PASSWORD";
const char* mqtt_server = "broker.hivemq.com";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  WiFi.begin(ssid, password);
  client.setServer(mqtt_server, 1883);
}

void loop() {
  float temp = readTemperature();
  char msg[50];
  snprintf(msg, 50, "%.2f", temp);
  client.publish("robogenesis/temperature", msg);
  delay(2000);
}
\`\`\`

Subscribe to this topic from your Node.js backend and push updates to the frontend via WebSockets.`,
    category: 'IoT',
    publishedAt: '2026-01-20T11:00:00.000Z',
    coverImage: '/images/blog/esp32-mqtt.jpg',
  },
  {
    id: 'b4',
    slug: 'pid-control-line-follower',
    title: 'PID Control for Line-Following Robots',
    excerpt: 'PID controllers are essential for smooth, precise robot motion. This post explains the theory behind PID control and shows how to implement it on a line-following robot.',
    content: `# PID Control for Line-Following Robots

A PID (Proportional-Integral-Derivative) controller is the workhorse of control systems. Here's how to apply it to a line follower.

## The PID Formula

\`\`\`
output = Kp * error + Ki * integral + Kd * derivative
\`\`\`

## Implementation in C

\`\`\`c
float Kp = 1.5, Ki = 0.01, Kd = 0.8;
float prev_error = 0, integral = 0;

float pid_compute(float error, float dt) {
    integral += error * dt;
    float derivative = (error - prev_error) / dt;
    prev_error = error;
    return Kp * error + Ki * integral + Kd * derivative;
}
\`\`\`

Tune Kp, Ki, and Kd iteratively — start with Kp only, then add Kd to reduce oscillation, and finally Ki to eliminate steady-state error.`,
    category: 'Robotics',
    publishedAt: '2025-12-10T14:00:00.000Z',
    coverImage: '/images/blog/pid-control.jpg',
  },
  {
    id: 'b5',
    slug: 'intro-to-reinforcement-learning',
    title: 'Introduction to Reinforcement Learning with OpenAI Gym',
    excerpt: 'Reinforcement learning enables agents to learn through interaction. This beginner-friendly guide covers Q-learning and trains an agent to solve the CartPole environment.',
    content: `# Introduction to Reinforcement Learning

Reinforcement Learning (RL) is how we teach agents to make decisions through trial and error.

## Q-Learning on CartPole

\`\`\`python
import gymnasium as gym
import numpy as np

env = gym.make('CartPole-v1')
q_table = np.zeros([20, 20, 20, 20, env.action_space.n])

alpha = 0.1  # learning rate
gamma = 0.99  # discount factor
epsilon = 1.0  # exploration rate

for episode in range(10000):
    state, _ = env.reset()
    done = False
    while not done:
        if np.random.random() < epsilon:
            action = env.action_space.sample()
        else:
            action = np.argmax(q_table[discretize(state)])
        next_state, reward, done, _, _ = env.step(action)
        # Q-table update
        q_table[discretize(state)][action] += alpha * (
            reward + gamma * np.max(q_table[discretize(next_state)]) - q_table[discretize(state)][action]
        )
        state = next_state
    epsilon = max(0.01, epsilon * 0.995)
\`\`\`

After training, your agent will balance the pole for 500+ steps consistently.`,
    category: 'AI',
    publishedAt: '2025-11-05T09:00:00.000Z',
    coverImage: '/images/blog/reinforcement-learning.jpg',
  },
]
