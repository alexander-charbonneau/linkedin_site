import React from 'react'
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (

    <div className="nav-container">
        <ul className="nav-1">
        <li><NavLink to="/" end>About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
    </div>
  )
}
