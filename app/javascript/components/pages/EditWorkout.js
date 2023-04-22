import React from 'react'
import WorkoutAction from './utility/WorkoutAction'

export default function EditWorkout({ workouts, setWorkouts, exercises }) {
  return <WorkoutAction action={2} workouts={workouts} setWorkouts={setWorkouts} exercises={exercises} />
}
