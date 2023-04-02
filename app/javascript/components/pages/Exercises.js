import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Page from '../Page'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import ExerciseList from '../exercise/ExerciseList'

export default function Exercises({ exercises, setExercises }) {
  const navigate = useNavigate()

  return (
    <Page name="exercises">
      <div className="flexbox flex-center py-12">
        <Link to="/exercise/new" aria-label="New exercise">
          <FontAwesomeIcon icon={faPlus} /> Add new exercise
        </Link>
      </div>

      <ExerciseList exercises={exercises} setExercises={setExercises} />
    </Page>
  )
}
