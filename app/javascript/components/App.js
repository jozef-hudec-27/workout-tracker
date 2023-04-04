import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { request } from '../utils'
import Navbar from './Navbar'
import AddExercise from './pages/AddExercise'
import AddWorkout from './pages/AddWorkout'
import EditWorkout from './pages/EditWorkout'
import Exercises from './pages/Exercises'
import Home from './pages/Home'
import PageNotFound from './pages/PageNotFound'

export default function App() {
  const [workouts, setWorkouts] = useState([])
  const [workoutsError, setWorkoutsError] = useState(false)
  const [exercises, setExercises] = useState([])
  const [currentWorkoutsPage, setCurrentWorkoutsPage] = useState(1)

  useEffect(() => {
    request(
      '/api/workouts',
      'GET',
      {},
      (data) => setWorkouts(data),
      (_) => setWorkoutsError(true)
    )

    request(
      '/api/exercises',
      'GET',
      {},
      (data) => setExercises(data),
      (_) => setExercises(null)
    )
  }, [])

  // Copies given workout's sessions info to table in the DOM
  const fillWorkoutSessionInfo = (workout) => {
    if (!workout) return

    workout.sessions.forEach((session, i) => {
      window.requestAnimationFrame(() => {
        const sessionEl = document.getElementById(`session-${i}`)
        if (!sessionEl) return

        sessionEl.querySelector('.session-rest-time').value = session.rest_time
        sessionEl.querySelector('.session-note').value = session.note
        sessionEl.querySelector('select').value = session.exercise_id

        const setEls = Array.from(document.getElementsByClassName(`session-${i}-set`) || [])
        setEls.forEach((setEl, j) => {
          setEl.querySelector('.set-weight').value = workout.sessions[i].series[j].weight
          setEl.querySelector('.set-reps').value = workout.sessions[i].series[j].reps
          setEl.querySelector('.set-note').value = workout.sessions[i].series[j].note
        })
      })
    })
  }

  if (workoutsError) {
    return <Error message="Could not get your workouts. Please try again later." />
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                workouts={workouts}
                setWorkouts={setWorkouts}
                currentWorkoutsPage={currentWorkoutsPage}
                setCurrentWorkoutsPage={setCurrentWorkoutsPage}
              />
            }
          />

          <Route
            path="/workout/new"
            element={
              <AddWorkout
                workouts={workouts}
                setWorkouts={setWorkouts}
                exercises={exercises}
                fillWorkoutSessionInfo={fillWorkoutSessionInfo}
              />
            }
          />
          <Route
            path="/workouts/:id/edit"
            element={<EditWorkout exercises={exercises} fillWorkoutSessionInfo={fillWorkoutSessionInfo} />}
          />

          <Route path="/exercises" element={<Exercises exercises={exercises} setExercises={setExercises} />} />
          <Route path="/exercise/new" element={<AddExercise setExercises={setExercises} />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
