import React from 'react'
import Select from '../Select'

export default function ExercisesSelect({ exercises, onChange, value }) {
  return (
    <Select
      options={exercises.map((e) => ({ value: e.id, name: e.name }))}
      onChange={onChange}
      value={value}
      hideDefault
    />
  )
}
