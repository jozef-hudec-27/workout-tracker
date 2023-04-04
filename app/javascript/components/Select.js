import React from 'react'

export default function Select({ id, label, onChange, options, hideDefault, xref }) {
  return (
    <>
      {label && <label htmlFor={id}>{label}:</label>}

      <select defaultValue="-1" id={id} onChange={onChange}>
        {!hideDefault && (
          <option disabled value="-1">
            -- select an option --
          </option>
        )}

        {options.map((option, i) => {
          const { value, name } = option

          return (
            <option key={i} value={value} ref={i === options.length - 1 ? xref : null}>
              {name}
            </option>
          )
        })}
      </select>
    </>
  )
}
