import React from 'react'

export default function Select({ id, label, onChange, options, hideDefault, value, xref }) {
  const selectBody = (
    <>
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
    </>
  )
  return (
    <>
      {label && <label htmlFor={id}>{label}:</label>}

      {hideDefault ? (
        <select id={id} onChange={onChange} value={value}>
          {selectBody}
        </select>
      ) : (
        <select defaultValue="-1" id={id} onChange={onChange}>
          {selectBody}
        </select>
      )}
    </>
  )
}
