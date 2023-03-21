import React from 'react'

export default function Workout({ workout }) {
  const { title, sessions, notes } = workout

  const maxSets = Math.max(...sessions.map((session) => session.series.length))
  const tableRows = []
  for (let i = 0; i < maxSets; i++) tableRows.push(i)

  return (
    <table className="workout">
      <thead>
        <tr>
          {sessions.map((session) => {
            return <th key={session.id}>{session.exercise.name}</th>
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
                    {set?.weight}x{set?.reps}
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
