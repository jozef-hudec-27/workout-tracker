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
            element={<EditWorkout workouts={workouts} setWorkouts={setWorkouts} exercises={exercises} />}
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
