import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Navbar'
import AddWorkout from './pages/AddWorkout'
import Home from './pages/Home'

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout/new" element={<AddWorkout />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
