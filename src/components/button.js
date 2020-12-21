import './button.scss'

import { motion } from 'framer-motion'
import React from 'react'

const Header = ({ onClick, children, isSubmit, small }) => {
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

export default Header
