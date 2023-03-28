import React from 'react'
import Page from '../Page'
import WorkoutList from '../workout/WorkoutList'

export default function Home({ workouts, setWorkouts }) {
  return (
    <Page name="home">
      <WorkoutList workouts={workouts} setWorkouts={setWorkouts} />
    </Page>
  )
}
