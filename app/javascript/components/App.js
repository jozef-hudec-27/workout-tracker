import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { request } from '../utils'
import Navbar from './Navbar'
import AddWorkout from './pages/AddWorkout'
import Home from './pages/Home'

export default function App() {
  const [workouts, setWorkouts] = useState([])
  const [workoutsError, setWorkoutsError] = useState(false)

  useEffect(() => {
    request(
      '/api/workouts',
      'GET',
      {},
      (data) => setWorkouts(data),
      (_) => setWorkoutsError(true)
    )
  }, [])

  const findMaxSets = (sessions) => {
    
  }

  if (workoutsError) {
    return <Error message="Could not get your workouts. Please try again later." />
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home workouts={workouts} />} />
          <Route path="/workout/new" element={<AddWorkout workouts={workouts} setWorkouts={setWorkouts} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
