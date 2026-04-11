import React from 'react'

const motion = new Proxy({} as Record<string, React.FC<Record<string, unknown>>>, {
  get: (_target, prop: string) => {
    const Component = ({ children, ...props }: Record<string, unknown>) => {
      // Remove framer-motion specific props
      const {
        initial: _i, animate: _a, exit: _e, variants: _v, transition: _t,
        whileHover: _wh, whileTap: _wt, whileFocus: _wf, whileInView: _wiv,
        layout: _l, layoutId: _lid, onAnimationComplete: _oac,
        ...domProps
      } = props
      return React.createElement(prop, domProps, children as React.ReactNode)
    }
    Component.displayName = `motion.${prop}`
    return Component
  },
})

const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>
AnimatePresence.displayName = 'AnimatePresence'

const useInView = () => true
const useScroll = () => ({ scrollY: { get: () => 0 } })
const useMotionValue = (initial: number) => ({ get: () => initial, set: () => {} })

export { motion, AnimatePresence, useInView, useScroll, useMotionValue }
export default { motion, AnimatePresence, useInView, useScroll, useMotionValue }
