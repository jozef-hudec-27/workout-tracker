import React, { useEffect, useState } from 'react'
import { request } from '../../utils'
import Page from '../Page'
import WorkoutList from '../workout/WorkoutList'
import Error from './Error'

export default function Home() {
  const [error, setError] = useState(false)
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    request(
      '/api/workouts',
      'GET',
      {},
      (data) => setWorkouts(data),
      (_) => setError(true)
    )
  }, [])

  if (error) return <Error message="There was an error fetching your workouts. Please try again later." />

  return (
    <Page>
      <WorkoutList workouts={workouts} />
    </Page>
  )
}
