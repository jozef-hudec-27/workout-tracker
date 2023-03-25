import React from 'react'
import Tooltip from '../Tooltip'

export default function Workout({ workout }) {
  let { title, sessions, notes } = workout

  const maxSets = Math.max(...sessions.map((session) => session.series.length))
  const tableRows = []
  for (let i = 0; i < maxSets; i++) tableRows.push(i)

  return (
    <table className="workout">
      <thead>
        <tr>
          <th colSpan={sessions.length}>
            <div className="flexbox flex-center gap-8">
              <span>
                {title && `${title} -`} {new Date(workout.created_at).toLocaleDateString('en-GB')}
              </span>
              {notes && (
                <Tooltip>
                  <p>
                    <strong>Notes</strong>: {notes}
                  </p>
                </Tooltip>
              )}
            </div>
          </th>
        </tr>

        <tr>
          {sessions.map((session) => {
            return (
              <th key={session.id}>
                <span className="flexbox flex-align-center gap-8">
                  {session.exercise.name}
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
                </span>
              </th>
            )
          })}
        </tr>
      </thead>

      <tbody>
        {tableRows.map((i) => {
          return (
            <tr key={i}>
              {tableRows.map((j) => {
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
  )
}
