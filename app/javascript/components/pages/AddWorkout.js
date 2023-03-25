import React, { useEffect, useState } from 'react'
import { request, arrOfLength } from '../../utils'
import Page from '../Page'
import Error from './Error'
import { useNavigate } from 'react-router-dom'

export default function AddWorkout() {
  const [allExercises, setAllExercises] = useState([])
  const [maxSets, setMaxSets] = useState(1)
  const [sessionCount, setSessionCount] = useState(1)
  const [createError, setCreateError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    request(
      '/api/exercises',
      'GET',
      {},
      (data) => setAllExercises(data),
      (_) => setAllExercises(null)
    )
  }, [])

  if (allExercises === null) {
    return <Error message="There was an error getting your exercises. Please try again later." />
  } else if (createError) {
    return <Error message="There was an error creating a new workout. Please try again later." />
  }

  const buildWorkoutObj = () => {
    const workout = {
      title: document.getElementById('workout-title').value,
      notes: document.getElementById('workout-notes').value,
      sessions: [],
    }

    const sessionElements = Array.from(document.getElementsByClassName('session'))
    for (let i = 0; i < sessionElements.length; i++) {
      const sessionEl = sessionElements[i]

      const sessionObj = {
        note: sessionEl.querySelector('.session-note').value,
        exerciseId: sessionEl.querySelector('select').value,
        restTime: sessionEl.querySelector('.session-rest-time').value,
        sets: [],
      }

      const setElements = Array.from(document.getElementsByClassName(`session-${i}-set`))
      for (let j = 0; j < setElements.length; j++) {
        const setEl = setElements[j]
        const setObj = {
          weight: setEl.querySelector('.set-weight').value,
          reps: setEl.querySelector('.set-reps').value,
          note: setEl.querySelector('.set-note').value,
        }

        sessionObj.sets.push(setObj)
      }

      workout.sessions.push(sessionObj)
    }

    return workout
  }

  return (
    <Page name="add-workout">
      <div className="add-workout-btns btn-group flexbox flex-center">
        <button onClick={() => setMaxSets((prev) => prev + 1)}>Add set</button>
        <button onClick={() => setSessionCount((prev) => prev + 1)}>Add session</button>
      </div>

      <div className="py-16" style={{ overflowX: 'auto' }}>
        <table className="workout">
          <thead>
            <tr>
              <th colSpan={sessionCount}>
                <div className="flexbox flex-center gap-8">
                  <input id="workout-title" type="text" placeholder="Title" />
                  <input id="workout-notes" type="text" placeholder="Notes" />
                </div>
              </th>
            </tr>

            <tr>
              {arrOfLength(sessionCount).map((i) => {
                return (
                  <th key={i} id={`session-${i}`} className="session">
                    <div className="flexbox flex-column gap-4">
                      <select name="exercises">
                        {allExercises.map((exercise) => {
                          return (
                            <option key={exercise.id} value={exercise.id}>
                              {exercise.name}
                            </option>
                          )
                        })}
                      </select>
                      <input type="number" placeholder="Rest time (s)" min="0" className="session-rest-time" />
                      <input type="text" placeholder="Note" className="session-note" />
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {arrOfLength(maxSets).map((i) => {
              return (
                <tr key={i}>
                  {arrOfLength(sessionCount).map((j) => {
                    return (
                      <td key={j}>
                        <div className={`session-${j}-set flexbox flex-column gap-2`}>
                          <span className="flexbox flex-align-center gap-4">
                            <input type="text" placeholder="Weight" className="set-weight" />x
                          </span>
                          <input type="text" placeholder="Reps" className="set-reps" />
                          <input type="text" placeholder="Note" className="set-note mt-4" />
                        </div>
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="add-workout-btns btn-group flexbox flex-center">
        <button
          onClick={() => {
            request(
              '/api/workouts',
              'POST',
              {
                headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content') },
                body: JSON.stringify(buildWorkoutObj()),
              },
              (data) => navigate('/'),
              (err) => setCreateError(true)
            )
          }}
        >
          Save{' '}
        </button>
        <button
          onClick={() => {
            setMaxSets(1)
            setSessionCount(1)
            Array.from(document.querySelectorAll('input')).forEach((input) => {
              input.value = ''
            })
          }}
        >
          Clear
        </button>
      </div>
    </Page>
  )
}