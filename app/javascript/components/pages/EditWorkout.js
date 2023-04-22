import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../Page'
import { useParams } from 'react-router-dom'
import { arrOfLength, blockBtnSpam, findMaxSets, request } from '../../utils'
import useToast from '../../hooks/useToast'
import ExercisesSelect from '../exercise/ExercisesSelect'
import ButtonGroup from '../ButtonGroup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function EditWorkout({ exercises, setWorkouts, fillWorkoutSessionInfo, buildWorkoutObj }) {
  const [workout, setWorkout] = useState({})
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

  const selectRef = useCallback(() => {
    fillWorkoutSessionInfo(workout)
  }, [workout])

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

  return (
    <Page name="edit-workout">
      {!!!Object.keys(workout).length ? (
        <p>Workout not found.</p>
      ) : (
        <>
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
                            xref={selectRef}
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
                      {/* {arrOfLength(sessionCount).map((j) => {
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
                      })} */}
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

          <div className="flexbox flex-center">
            <button className="main-btn" onClick={handleUpdateBtn}>
              Edit
            </button>
          </div>
        </>
      )}
    </Page>
  )
}
