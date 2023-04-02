import React from 'react'
import Exercise from './Exercise'

export default function ExerciseList({ exercises, setExercises }) {
  return (
    <div className="exercise-list flexbox flex-column gap-16 flex-center">
      {exercises.map((exercise) => {
        return <Exercise key={exercise.id} exercise={exercise} setExercises={setExercises} />
      })}
    </div>
  )
}
