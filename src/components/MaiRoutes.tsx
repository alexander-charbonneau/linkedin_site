// Dep imports
import React from 'react'
import {
    Route,
    Routes,
    useLocation
  } from "react-router-dom";
import {AnimatePresence} from "framer-motion"
import KeepAlive from 'react-activation'

// Page imports
import Home from "../pages/Home.tsx"
import Contact from "../pages/Contact.tsx"

export default function MaiRoutes() {

    const location = useLocation();

  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<KeepAlive cacheKey="Bash"><Home /></KeepAlive>}/>
        <Route path="/contact" element={<KeepAlive cacheKey="Contact"><Contact /></KeepAlive>} />
    </Routes>
    </AnimatePresence>
  )
}
