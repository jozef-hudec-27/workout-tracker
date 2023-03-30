import React from 'react'
import { request } from '../../utils'
import Modal from '../Modal'
import useToast from '../../hooks/useToast'

export default function WorkoutDeleteConfirmModal({ workout, setWorkouts, setShow }) {
  return (
    <Modal id="workout-delete-modal" setShow={setShow}>
      <>
        <h3>Are you sure you want to delete this workout?</h3>

        <div className="btn-group flexbox flex-center">
          <button
            onClick={(e) => {
              request(
                `/api/workouts/${workout.id}`,
                'DELETE',
                {
                  headers: {
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                  },
                },
                (_) => {
                  document.querySelector('.close-modal-btn')?.click()
                  setTimeout(() => {
                    setWorkouts((prevWorkouts) => [...prevWorkouts].filter((w) => w.id !== workout.id))
                  }, 1000)
                  e.target.disabled = true
                },
                (_) => useToast('Could not delete workout. Please try again later.', 'error-toast')
              )
            }}
          >
            Yes, delete
          </button>
          <button
            onClick={(e) => {
              document.querySelector('.close-modal-btn')?.click()
              e.target.disabled = true
            }}
          >
            No, go back
          </button>
        </div>
      </>
    </Modal>
  )
}
