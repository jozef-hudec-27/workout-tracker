import React, { useEffect, useState } from 'react'
import { request, arrOfLength } from '../../utils'
import Page from '../Page'
import Error from './Error'

export default function AddWorkout() {
  const [allExercises, setAllExercises] = useState([])
  const [maxSets, setMaxSets] = useState(1)
  const [sessionCount, setSessionCount] = useState(1)
  const [error, setError] = useState(false)

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
                  <input type="text" placeholder="Title" />
                  <input type="text" placeholder="Notes" />
                </div>
              </th>
            </tr>

            <tr>
              {arrOfLength(sessionCount).map((i) => {
                return (
                  <th key={i}>
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
                      <input type="number" placeholder="Rest time (s)" min="0" />
                      <input type="text" placeholder="Note" />
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
                        <div className="flexbox flex-column gap-2">
                          <span className="flexbox flex-align-center gap-4">
                            <input type="text" placeholder="Weight" />x
                          </span>
                          <input type="text" placeholder="Reps" />
                          <input type="text" placeholder="Note" className="mt-4" />
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
    </Page>
  )
}
