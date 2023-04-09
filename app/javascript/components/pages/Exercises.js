import React from 'react'
import { Link } from 'react-router-dom'
import Page from '../Page'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ExerciseList from '../exercise/ExerciseList'

export default function Exercises({ exercises, setExercises }) {
  return (
    <Page name="exercises">
      {!!!exercises.length && <p>You don't have any exercises.</p>}

      <div className="flexbox flex-center py-12">
        <Link to="/exercises/new" aria-label="New exercise">
          <FontAwesomeIcon icon={faPlus} /> Add new exercise
        </Link>
      </div>

      <ExerciseList exercises={exercises} setExercises={setExercises} />
    </Page>
  )
}
