import React from 'react'
import useToast from '../../hooks/useToast'
import { request } from '../../utils'

export default function LoadWorkoutsButton({ setWorkouts, currentPage, setCurrentPage }) {
  const loadWorkouts = () => {
    request(
      `/api/workouts?page=${currentPage + 1}`,
      'GET',
      {},
      (data) => {
        if (data.length === 0) {
          useToast('All workouts loaded.', 'info')
          return setCurrentPage(false)
        }

        setCurrentPage((prevCurrentPage) => prevCurrentPage + 1)
        setWorkouts((prevWorkouts) => [...prevWorkouts, ...data])
      },
      () => useToast('Could not fetch more workouts.', 'error')
    )
  }

  return (
    <>
      {!!currentPage && (
        <div className="flexbox flex-center py-12 btn-group">
          <button
            className="main-btn"
            onClick={(e) => {
              e.target.disabled = true
              loadWorkouts()
              e.target.disabled = false
            }}
          >
            Load more
          </button>
        </div>
      )}
    </>
  )
}
