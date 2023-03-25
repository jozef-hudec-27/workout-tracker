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
    <Page>
      <div className="btn-group flexbox flex-center">
        <button onClick={() => setMaxSets((prev) => prev + 1)}>Add set</button>
        <button onClick={() => setSessionCount((prev) => prev + 1)}>Add session</button>
      </div>

      <table className="workout">
        <thead>
          <tr>
            <th colSpan={sessionCount}>
              <div className="flexbox flex-center gap-4">
                <input type="text" placeholder="Title" />
                <input type="text" placeholder="Workout notes" />
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
                    <input type="text" placeholder="Session note" />
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
                        <div className="flexbox flex-align-center gap-2">
                          <input type="text" placeholder="Weight" />x<input type="text" placeholder="reps" />
                        </div>
                        <input type="text" placeholder="Set note" />
                      </div>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Page>
  )
}
