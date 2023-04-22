import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { request } from '../utils'
import Navbar from './Navbar'
import AddExercise from './pages/AddExercise'
import AddWorkout from './pages/AddWorkout'
import EditUserPage from './pages/EditUserPage'
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
          setEl.querySelector('.set-weight').value = workout.sessions[i]?.series[j].weight
          setEl.querySelector('.set-reps').value = workout.sessions[i]?.series[j].reps
          setEl.querySelector('.set-note').value = workout.sessions[i]?.series[j].note
        })
      })
    })
  }

  // Creates an object with data from workout table in the DOM
  const buildWorkoutObj = () => {
    const workout = {
      title: document.getElementById('workout-title').value,
      notes: document.getElementById('workout-notes').value,
      sessions: [],
    }

    const sessionElements = Array.from(document.getElementsByClassName('session'))
    for (let i = 0; i < sessionElements.length; i++) {
      const sessionEl = sessionElements[i]

      const sessionObj = {
        note: sessionEl.querySelector('.session-note').value,
        exerciseId: sessionEl.querySelector('select').value,
        restTime: sessionEl.querySelector('.session-rest-time').value,
        sets: [],
      }

      const setElements = Array.from(document.getElementsByClassName(`session-${i}-set`))
      for (let j = 0; j < setElements.length; j++) {
        const setEl = setElements[j]
        const setObj = {
          weight: setEl.querySelector('.set-weight').value,
          reps: setEl.querySelector('.set-reps').value,
          note: setEl.querySelector('.set-note').value,
        }

        sessionObj.sets.push(setObj)
      }

      workout.sessions.push(sessionObj)
    }

    return workout
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
            path="/workouts/new"
            element={<AddWorkout workouts={workouts} setWorkouts={setWorkouts} exercises={exercises} />}
          />
          <Route
            path="/workouts/:id/edit"
            element={
              <EditWorkout
                exercises={exercises}
                setWorkouts={setWorkouts}
                fillWorkoutSessionInfo={fillWorkoutSessionInfo}
                buildWorkoutObj={buildWorkoutObj}
              />
            }
          />

          <Route path="/exercises" element={<Exercises exercises={exercises} setExercises={setExercises} />} />
          <Route path="/exercises/new" element={<AddExercise setExercises={setExercises} />} />

          <Route path="/users/edit" element={<EditUserPage />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
