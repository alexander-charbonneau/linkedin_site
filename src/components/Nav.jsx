import React from 'react'
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
        <ul className="nav-1">
        <li><NavLink to="/" end>Terminal</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
  )
}
