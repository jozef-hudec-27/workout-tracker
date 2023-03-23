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
          <th colSpan={sessions.length}>
            <div className="flexbox flex-center gap-8">
              <span>
                {title} - {new Date(workout.created_at).toLocaleDateString('en-GB')}
              </span>
              <button className="tooltip">
                <div className="tooltip-content">
                  <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora repellendus a inventore cupiditate quidem vero veritatis mollitia excepturi at, provident ab deserunt. Temporibus dolores ipsa dolorum doloribus voluptates corporis maxime.</div>
                </div>
              </button>
            </div>
          </th>
        </tr>

        <tr>
          {sessions.map((session) => {
            return (
              <th key={session.id}>
                {session.exercise.name} <span className="font-07">(rest: {session.rest_time}s)</span>
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
