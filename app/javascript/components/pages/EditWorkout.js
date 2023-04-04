import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Page from '../Page'
import { useParams } from 'react-router-dom'
import { arrOfLength, blockBtnSpam, findMaxSets, request } from '../../utils'
import useToast from '../../hooks/useToast'
import ExercisesSelect from '../exercise/ExercisesSelect'
import ButtonGroup from '../ButtonGroup'

export default function EditWorkout({ exercises, setWorkouts, fillWorkoutSessionInfo, buildWorkoutObj }) {
  const [workout, setWorkout] = useState({})
  const [sessionCount, setSessionCount] = useState(0)
  const [maxSets, setMaxSets] = useState(0)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    request(
      `/api/workouts/${id}`,
      'GET',
      {},
      (data) => {
        setWorkout(data)
        setSessionCount(data.sessions.length)
        setMaxSets(findMaxSets(data.sessions))

        document.getElementById('workout-title').value = data.title
        document.getElementById('workout-notes').value = data.notes
      },
      (_) => useToast('Workout not found.', 'error')
    )
  }, [])

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
          body: JSON.stringify(buildWorkoutObj()),
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

  return (
    <Page name="edit-workout">
      {!!!workout ? (
        <p>Workout not found.</p>
      ) : (
        <>
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
                      <input id="workout-title" type="text" placeholder="Title" defaultValue={workout.title} />
                      <input id="workout-notes" type="text" placeholder="Notes" defaultValue={workout.description} />
                    </div>
                  </th>
                </tr>

                <tr>
                  {arrOfLength(sessionCount).map((i) => {
                    return (
                      <th key={i} id={`session-${i}`} className="session">
                        <div className="flexbox flex-column gap-4">
                          <ExercisesSelect exercises={exercises} xref={selectRef} />
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
