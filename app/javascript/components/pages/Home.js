import React, { useEffect, useState } from 'react'
import { request } from '../../utils'
import WorkoutList from '../workout/WorkoutList'

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

  if (error) {
    return <div>ERROR WITH FETCHING YOUR WORKOUTS</div>
  }


  return <div>
    <WorkoutList workouts={workouts} />
  </div>
}
