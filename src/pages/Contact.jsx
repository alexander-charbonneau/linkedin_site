import React from 'react'
import {motion} from "framer-motion"

export default function Contact() {
  return (
    <motion.div
    className="body-wrapper"
    initial={{opacity:0}}
    animate={{opacity:1}}
    exit={{opacity:0}}
    >
    <h1 className="header-1">Contact</h1>
    </motion.div>
  )
}
