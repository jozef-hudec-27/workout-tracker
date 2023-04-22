import React from 'react'
import WorkoutAction from './utility/WorkoutAction'

export default function AddWorkout({ workouts, setWorkouts, exercises }) {
  return <WorkoutAction action={1} workouts={workouts} setWorkouts={setWorkouts} exercises={exercises} />
}
