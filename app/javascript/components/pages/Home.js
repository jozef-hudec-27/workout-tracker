import React from 'react'
import Dropdown from '../Dropdown'
import Page from '../Page'
import LoadWorkoutsButton from '../workout/LoadWorkoutsButton'
import WorkoutList from '../workout/WorkoutList'

export default function Home({ workouts, setWorkouts, currentWorkoutsPage, setCurrentWorkoutsPage }) {
  return (
    <Page name="home">
      <WorkoutList workouts={workouts} setWorkouts={setWorkouts} />

      {!!workouts.length ? (
        <LoadWorkoutsButton
          setWorkouts={setWorkouts}
          currentPage={currentWorkoutsPage}
          setCurrentPage={setCurrentWorkoutsPage}
        />
      ) : <p>Get to work and add your first workout!</p>}
    </Page>
  )
}
