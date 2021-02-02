import './button.scss'

import { motion } from 'framer-motion'
import { FC } from 'react'

interface ButtonProps {
  onClick?: () => void
  children: string | number | readonly string[]
  isSubmit: boolean
}

const Button: FC<ButtonProps> = ({ onClick, children, isSubmit }) => {
  return isSubmit ? (
    <motion.input
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="submit"
      value={children}
    />
  ) : (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      type="button"
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}

export default Button
