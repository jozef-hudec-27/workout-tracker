import React, { useRef } from 'react'
import { Link } from 'react-router-dom'

export default function Dropdown({ button, links }) {
  const btnRef = useRef(null)
  const contentRef = useRef(null)

  return (
    <div className="dropdown">
      <button
        className={`dropdown-btn ${button.className}`}
        ref={btnRef}
        onClick={() => {
          contentRef.current?.classList.toggle('hidden')
        }}
      >
        {button.text}
      </button>

      <div className="dropdown-content hidden" ref={contentRef}>
        {links.map((link, i) => {
          return (
            <Link
              key={i}
              to={link.url}
              onClick={() => {
                btnRef.current?.click() // close dropdown after clicking on link
              }}
            >
              {link.text}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
