import React, { useState } from 'react'
import Page from '../Page'
import { useNavigate } from 'react-router-dom'
import { request } from '../../utils'
import useToast from '../../hooks/useToast'

export default function AddExercise({ setExercises }) {
  const [exerciseName, setExerciseName] = useState('')
  const [exerciseDescription, setExerciseDescription] = useState('')
  const navigate = useNavigate()

  const handleSubmitBtn = (e) => {
    e.target.disabled = true

    if (!!exerciseName) {
      request(
        '/api/exercises',
        'POST',
        {
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
          body: JSON.stringify({ name: exerciseName, description: exerciseDescription }),
        },
        (data) => {
          setExercises((prevExercises) => [...prevExercises, data])
          navigate('/')
          useToast(`New exercise '${exerciseName}' created.`, 'info')
        },
        (_) => useToast('There was an error creating a new exercise. Please try again later.', 'error')
      )
    } else {
      useToast('Exercise name cannot be empty!', 'error')
    }

    e.target.disabled = false
  }

  return (
    <Page name="add-exercise">
      <h2 style={{ marginBottom: '16px' }}>Add new exercise</h2>

      <div className="add-exercise-inputs flexbox flex-center flex-column gap-16">
        <input
          type="text"
          placeholder="Name"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={exerciseDescription}
          onChange={(e) => setExerciseDescription(e.target.value)}
        ></textarea>

        <button className="main-btn" onClick={(e) => handleSubmitBtn(e)}>
          Submit
        </button>
      </div>
    </Page>
  )
}
