import React from 'react'

export default function ButtonGroup({ className, btnObjs }) {
  return (
    <div className={`${className} btn-group flexbox flex-center`}>
      {btnObjs.map((btnObj, i) => {
        const { name, onClick } = btnObj

        return (
          <button key={i} onClick={onClick}>
            {name}
          </button>
        )
      })}
    </div>
  )
}
