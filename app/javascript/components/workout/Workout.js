import React, { useState } from 'react'
import { arrOfLength, findMaxSets } from '../../utils'
import Tooltip from '../Tooltip'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPen } from '@fortawesome/free-solid-svg-icons'
import WorkoutDeleteConfirmModal from './WorkoutDeleteConfirmModal'
import { useNavigate } from 'react-router-dom'

export default function Workout({ workout, setWorkouts }) {
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
  const navigate = useNavigate()

  let { title, sessions, notes } = workout
  const maxSets = findMaxSets(sessions)

  return (
    <div className="workout-wrapper py-12">
      {showDeleteConfirmModal && (
        <WorkoutDeleteConfirmModal workout={workout} setWorkouts={setWorkouts} setShow={setShowDeleteConfirmModal} />
      )}

      <table id={`workout-${workout.id}`} className="workout">
        <thead>
          <tr>
            <th colSpan={sessions.length}>
              <button
                className="edit-workout-btn"
                aria-label="Edit workout"
                onClick={() => navigate(`/workouts/${workout.id}/edit`)}
              >
                <FontAwesomeIcon icon={faPen} />
              </button>

              <div className="flexbox flex-center gap-8">
                <h2 className="font-12">
                  {title && `${title} -`} {new Date(workout.created_at).toLocaleDateString('en-GB')}
                </h2>
                {notes && (
                  <Tooltip>
                    <p>
                      <strong>Notes</strong>: {notes}
                    </p>
                  </Tooltip>
                )}
              </div>

              <button
                className="delete-workout-btn"
                aria-label="Delete workout"
                onClick={() => setShowDeleteConfirmModal(true)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </th>
          </tr>

          <tr>
            {sessions.map((session) => {
              return (
                <th key={session.id}>
                  <span className="flexbox flex-align-center gap-8">
                    {session.exercise.name}
                    {session.rest_time && (
                      <Tooltip>
                        <>
                          <p>
                            <strong>Rest time</strong>: {session.rest_time}s
                          </p>
                          {session.note && (
                            <p>
                              <strong>Note</strong>: {session.note}
                            </p>
                          )}
                        </>
                      </Tooltip>
                    )}
                  </span>
                </th>
              )
            })}
          </tr>
        </thead>

        <tbody>
          {arrOfLength(maxSets).map((i) => {
            return (
              <tr key={i}>
                {arrOfLength(maxSets).map((j) => {
                  const set = sessions[j]?.series[i]

                  if (!set) return

                  return (
                    <td key={j}>
                      <span className="flexbox flex-align-center gap-8">
                        <>
                          {set.weight}x{set.reps}
                        </>
                        {set.note && (
                          <Tooltip>
                            <p>
                              <strong>Note</strong>: {set.note}
                            </p>
                          </Tooltip>
                        )}
                      </span>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
