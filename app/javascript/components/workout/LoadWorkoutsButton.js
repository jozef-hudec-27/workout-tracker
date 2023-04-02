import React from 'react'
import useToast from '../../hooks/useToast'
import { request, blockBtnSpam } from '../../utils'

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
              blockBtnSpam(e, () => {
                loadWorkouts()
              })
            }}
          >
            Load more
          </button>
        </div>
      )}
    </>
  )
}
