import React from 'react'
import Select from '../Select'

export default function ExercisesSelect({ exercises, xref }) {
  return (
    <Select
      options={exercises.map((e) => ({ value: e.id, name: e.name }))}
      xref={xref}
      hideDefault
    />
  )
}
