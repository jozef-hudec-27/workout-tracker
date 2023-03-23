import React from 'react'

export default function Tooltip({ children }) {
  const toggleTooltipContent = (tooltipBtn) => {
    tooltipBtn.nextElementSibling.classList.toggle('hidden')
  }

  return (
    <div style={{ position: 'relative', width: 'fit-content' }}>
      <button className="tooltip" onClick={(e) => toggleTooltipContent(e.target)}>
        ?
      </button>
      <div className="tooltip-content hidden" onClick={(e) => e.preventDefault()}>
        <div>{children}</div>
      </div>
    </div>
  )
}
