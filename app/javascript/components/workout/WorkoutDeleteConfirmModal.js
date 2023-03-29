import React from 'react'
import { request } from '../../utils'
import Modal from '../Modal'

export default function WorkoutDeleteConfirmModal({ workout, setWorkouts, setShow }) {
  return (
    <Modal id="workout-delete-modal" setShow={setShow}>
      <>
        <h3>Are you sure you want to delete this workout?</h3>

        <div className="btn-group flexbox flex-center">
          <button
            onClick={() => {
              request(
                `/api/workouts/${workout.id}`,
                'DELETE',
                {
                  headers: {
                    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                  },
                },
                (_) => {
                  setWorkouts((prevWorkouts) => [...prevWorkouts].filter((w) => w.id !== workout.id))
                  document.querySelector('.close-modal-btn')?.click()
                },
                (err) => console.log(err)
              )
            }}
          >
            Yes, delete
          </button>
          <button onClick={() => document.querySelector('.close-modal-btn')?.click()}>No, go back</button>
        </div>
      </>
    </Modal>
  )
}
