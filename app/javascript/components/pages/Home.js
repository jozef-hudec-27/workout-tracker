import React from 'react'
import Page from '../Page'
import LoadWorkoutsButton from '../workout/LoadWorkoutsButton'
import WorkoutList from '../workout/WorkoutList'

export default function Home({ workouts, setWorkouts, currentWorkoutsPage, setCurrentWorkoutsPage }) {
  return (
    <Page name="home">
      <WorkoutList workouts={workouts} setWorkouts={setWorkouts} />

      <LoadWorkoutsButton
        setWorkouts={setWorkouts}
        currentPage={currentWorkoutsPage}
        setCurrentPage={setCurrentWorkoutsPage}
      />
    </Page>
  )
}
