import React from 'react'

export default function Page({ children, name }) {
  return <div id={`${name}-page`} className="p-24">{children}</div>
}
