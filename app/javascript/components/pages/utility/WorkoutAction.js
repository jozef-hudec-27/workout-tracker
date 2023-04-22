import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Page from '../../Page'
import Error from '../Error'
import ExercisesSelect from '../../exercise/ExercisesSelect'
import ButtonGroup from '../../ButtonGroup'
import Select from '../../Select'
import { arrOfLength, blockBtnSpam, request } from '../../../utils'
import useToast from '../../../hooks/useToast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

// ACTIONS: 1 - Add workout, 2 - Edit workout
export default function WorkoutAction({ action, exercises, workouts, setWorkouts }) {
  const [workout, setWorkout] = useState(
    action === 2
      ? {}
      : {
          title: '',
          notes: '',
          sessions: [
            {
              note: '',
              exercise_id: exercises[0]?.id || 0,
              rest_time: '',
              series: [{ note: '', weight: '', reps: '' }],
            },
          ],
        }
  )

  const maxSets = useCallback(() => {
    let max = 0
    workout.sessions.forEach((session) => {
      max = Math.max(max, session.series.length)
    })

    return max
  }, [workout])

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (action === 1) return

    // Fetch the workout if we're editing
    request(
      `/api/workouts/${id}`,
      'GET',
      {},
      (data) => {
        setWorkout(data)
      },
      (e) => useToast(e, 'error')
    )
  }, [])

  // Shared functions

  const updateWorkoutSession = (index, key, e) => {
    setWorkout((prevWorkout) => {
      const sessionsCopy = prevWorkout.sessions.slice()
      sessionsCopy[index][key] = e.target.value
      return { ...prevWorkout, sessions: sessionsCopy }
    })
  }

  const updateWorkoutSet = (sessionIndex, setIndex, key, e) => {
    setWorkout((prevWorkout) => {
      const sessionsCopy = prevWorkout.sessions.slice()
      sessionsCopy[sessionIndex].series[setIndex][key] = e.target.value
      return { ...prevWorkout, sessions: sessionsCopy }
    })
  }

  const handleDeleteSession = (index) => {
    setWorkout((prevWorkout) => {
      let sessionsCopy = prevWorkout.sessions.slice()
      sessionsCopy.splice(index, 1)
      return { ...prevWorkout, sessions: sessionsCopy }
    })
  }

  const handleAddSession = () => {
    setWorkout((prevWorkout) => ({
      ...prevWorkout,
      sessions: [
        ...prevWorkout.sessions,
        {
          note: '',
          exercise_id: exercises[0].id,
          rest_time: '',
          series: Array.from({ length: maxSets() }, () => [{ note: '', weight: '', reps: '' }]).flat(),
        },
      ],
    }))
  }

  const handleAddSet = () => {
    setWorkout((prevWorkout) => {
      const sessionsCopy = prevWorkout.sessions.slice()

      for (let i = 0; i < sessionsCopy.length; i++) {
        sessionsCopy[i].series.push((emptySet = { note: '', weight: '', reps: '' }))
      }

      return { ...prevWorkout, sessions: sessionsCopy }
    })
  }

  // Add workout functions

  const handleSaveBtn = (e) => {
    blockBtnSpam(e, () => {
      request(
        '/api/workouts',
        'POST',
        {
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
          body: JSON.stringify(workout),
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
    setWorkout({
      title: '',
      notes: '',
      sessions: [
        { note: '', exercise_id: exercises[0]?.id || 0, rest_time: '', series: [{ note: '', weight: '', reps: '' }] },
      ],
    })
  }

  // Edit workout functions

  const handleUpdateBtn = (e) => {
    blockBtnSpam(e, () => {
      request(
        `/api/workouts/${workout.id}`,
        'PUT',
        {
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
          body: JSON.stringify(workout),
        },
        (data) => {
          setWorkouts((prevWorkouts) => prevWorkouts.map((w) => (w.id === workout.id ? data : w)))
          navigate('/')
          useToast('Workout updated successfully.', 'info')
        },
        (_) => useToast('Could not edit workout. Make sure it exists or try again later.', 'error')
      )
    })
  }

  if (action === 1) {
    if (exercises === null) {
      return <Error message="There was an error getting your exercises. Please try again later." />
    } else if (!!!exercises.length) {
      return <Error message="You don't have any exercises yet. Create some first." />
    }
  } else if (action === 2) {
    if (!!!Object.keys(workout).length) {
      return (
        <Page name="edit-workout">
          <p>Workout not found.</p>
        </Page>
      )
    }
  }

  return (
    <Page name={`${action === 1 ? 'add' : 'edit'}-workout`}>
      {action === 1 && (
        <>
          <h2>Add workout</h2>

          <div className="flexbox flex-align-center gap-8 py-16">
            <Select
              id="prev-workouts"
              label="Copy workout"
              onChange={(e) => {
                const pickedWorkout = workouts.find((w) => w.id == e.target.value)
                if (pickedWorkout) setWorkout({ ...pickedWorkout })
              }}
              options={workouts.map((w) => ({
                value: w.id,
                name: `${w.title && w.title + ' - '}${new Date(w.created_at).toLocaleDateString('en-GB')}`,
              }))}
            />
          </div>
        </>
      )}

      <ButtonGroup
        className="add-workout-btns"
        btnObjs={[
          { name: 'Add set', onClick: handleAddSet },
          { name: 'Add session', onClick: handleAddSession },
        ]}
      />

      <div className="workout-wrapper py-16">
        <table className="workout">
          <thead>
            <tr>
              <th colSpan={workout.sessions.length}>
                <div className="flexbox flex-center gap-8">
                  <input
                    id="workout-title"
                    type="text"
                    placeholder="Title"
                    value={workout.title}
                    onChange={(e) => setWorkout((prevWorkout) => ({ ...prevWorkout, title: e.target.value }))}
                  />
                  <input
                    id="workout-notes"
                    type="text"
                    placeholder="Notes"
                    value={workout.notes}
                    onChange={(e) => setWorkout((prevWorkout) => ({ ...prevWorkout, notes: e.target.value }))}
                  />
                </div>
              </th>
            </tr>

            <tr>
              {workout.sessions.map((session, i) => {
                return (
                  <th key={i} id={`session-${i}`} className="session">
                    <button
                      className="delete-session-btn"
                      aria-label="Delete session"
                      onClick={() => handleDeleteSession(i)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>

                    <div className="flexbox flex-column gap-4">
                      <ExercisesSelect
                        exercises={exercises}
                        value={session.exercise_id}
                        onChange={(e) => updateWorkoutSession(i, 'exercise_id', e)}
                      />
                      <input
                        type="text"
                        placeholder="Rest time (s)"
                        className="session-rest-time"
                        value={session.rest_time}
                        onChange={(e) => updateWorkoutSession(i, 'rest_time', e)}
                      />
                      <input
                        type="text"
                        placeholder="Note"
                        className="session-note"
                        value={session.note}
                        onChange={(e) => updateWorkoutSession(i, 'note', e)}
                      />
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {arrOfLength(maxSets()).map((i) => {
              return (
                <tr key={i}>
                  {workout.sessions.map((session, j) => {
                    return (
                      <td key={j}>
                        <div className={`session-${j}-set flexbox flex-column gap-2`}>
                          <span className="flexbox flex-align-center gap-4">
                            <input
                              type="text"
                              placeholder="Weight"
                              className="set-weight"
                              value={session.series[i].weight}
                              onChange={(e) => updateWorkoutSet(j, i, 'weight', e)}
                            />
                            x
                          </span>
                          <input
                            type="text"
                            placeholder="Reps"
                            className="set-reps"
                            value={session.series[i].reps}
                            onChange={(e) => updateWorkoutSet(j, i, 'reps', e)}
                          />
                          <input
                            type="text"
                            placeholder="Note"
                            className="set-note mt-4"
                            value={session.series[i].note}
                            onChange={(e) => updateWorkoutSet(j, i, 'note', e)}
                          />
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

      {action === 1 ? (
        <ButtonGroup
          className="add-workout-btns"
          btnObjs={[
            { name: 'Save', onClick: (e) => handleSaveBtn(e) },
            { name: 'Clear', onClick: handleClearBtn },
          ]}
        />
      ) : (
        <div className="flexbox flex-center">
          <button className="main-btn" onClick={handleUpdateBtn}>
            Edit
          </button>
        </div>
      )}
    </Page>
  )
}
