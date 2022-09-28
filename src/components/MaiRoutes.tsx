// Dep imports
import React from 'react'
import {
    Route,
    Routes,
    useLocation
  } from "react-router-dom";
import {AnimatePresence} from "framer-motion"

// Page imports
import Home from "../pages/Home.tsx"
import Contact from "../pages/Contact.tsx"

export default function MaiRoutes() {

    const location = useLocation();

  return (
    <AnimatePresence>
    <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
    </Routes>
    </AnimatePresence>
  )
}
