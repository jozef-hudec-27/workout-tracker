import React, { useState } from 'react'
import { request, arrOfLength, findMaxSets, blockBtnSpam } from '../../utils'
import Page from '../Page'
import Error from './Error'
import { useNavigate } from 'react-router-dom'
import ButtonGroup from '../ButtonGroup'
import Select from '../Select'
import useToast from '../../hooks/useToast'

export default function AddWorkout({ workouts, setWorkouts, exercises }) {
  const [maxSets, setMaxSets] = useState(1)
  const [sessionCount, setSessionCount] = useState(1)
  const navigate = useNavigate()

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

  const copyToTable = (workout) => {
    setSessionCount(workout.sessions.length)
    setMaxSets(findMaxSets(workout.sessions))

    document.getElementById('workout-title').value = workout.title
    document.getElementById('workout-notes').value = workout.notes

    workout.sessions.forEach((session, i) => {
      window.requestAnimationFrame(() => {
        const sessionEl = document.getElementById(`session-${i}`)
        if (!sessionEl) return

        sessionEl.querySelector('select').value = session.exercise_id
        sessionEl.querySelector('.session-rest-time').value = session.rest_time
        sessionEl.querySelector('.session-note').value = session.note

        const setEls = Array.from(document.getElementsByClassName(`session-${i}-set`) || [])
        setEls.forEach((setEl, j) => {
          setEl.querySelector('.set-weight').value = workout.sessions[i].series[j].weight
          setEl.querySelector('.set-reps').value = workout.sessions[i].series[j].reps
          setEl.querySelector('.set-note').value = workout.sessions[i].series[j].note
        })
      })
    })
  }

  const handleSaveBtn = (e) => {
    blockBtnSpam(e, () => {
      request(
        '/api/workouts',
        'POST',
        {
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
          body: JSON.stringify(buildWorkoutObj()),
        },
        (data) => {
          setWorkouts((prev) => [data, ...prev])
          navigate('/')
        },
        (_) => useToast('There was an error creating a new workout. Please try again later.', 'error')
      )
    })
  }

  const handleClearBtn = () => {
    setMaxSets(1)
    setSessionCount(1)
    Array.from(document.querySelectorAll('input')).forEach((input) => {
      input.value = ''
    })
  }

  if (exercises === null) {
    return <Error message="There was an error getting your exercises. Please try again later." />
  }

  return (
    <Page name="add-workout">
      <h2>Add workout</h2>

      <div className="flexbox flex-align-center gap-8 py-16">
        <Select
          id="prev-workouts"
          label="Copy workout"
          onChange={(e) => {
            const pickedWorkout = workouts.find((w) => w.id == e.target.value)
            if (pickedWorkout) copyToTable(pickedWorkout)
          }}
          options={workouts.map((w) => ({
            value: w.id,
            name: `${w.title && w.title + ' - '}${new Date(w.created_at).toLocaleDateString('en-GB')}`,
          }))}
        />
      </div>

      <ButtonGroup
        className="add-workout-btns"
        btnObjs={[
          { name: 'Add set', onClick: () => setMaxSets((prev) => prev + 1) },
          { name: 'Add session', onClick: () => setSessionCount((prev) => prev + 1) },
        ]}
      />

      <div className="workout-wrapper py-16">
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
                      <Select options={exercises.map((e) => ({ value: e.id, name: e.name }))} hideDefault />
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

      <ButtonGroup
        className="add-workout-btns"
        btnObjs={[
          { name: 'Save', onClick: (e) => handleSaveBtn(e) },
          { name: 'Clear', onClick: handleClearBtn },
        ]}
      />
    </Page>
  )
}
