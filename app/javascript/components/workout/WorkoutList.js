import React from "react"
import Workout from "./Workout"

export default function WorkoutList({ workouts }) {
  return <section className="workout-list">
    {workouts.map((workout) => {
      return <Workout key={workout.id} workout={workout} />
    })}
  </section>
}