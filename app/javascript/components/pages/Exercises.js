import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Page from '../Page'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Exercise from '../exercise/Exercise'

export default function Exercises({ exercises }) {
  const navigate = useNavigate()

  return (
    <Page name="exercises">
      <div className="flexbox flex-center py-12">
        <Link to="/exercise/new" aria-label="New exercise">
          <FontAwesomeIcon icon={faPlus} /> Add new exercise
        </Link>
      </div>

      <div className="exercise-list flexbox flex-column gap-16 flex-center">
        {exercises.map((exercise) => {
          return <Exercise key={exercise.id} exercise={exercise} />
        })}
      </div>
    </Page>
  )
}
