import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { request } from '../../utils'

export default function WorkoutDeleteConfirmModal({ workout, setWorkouts, setShow }) {
  useEffect(() => {
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const modal = document.getElementById('workout-delete-modal')

    const focusableContent = modal.querySelectorAll(focusableElements)
    const firstFocusableElement = focusableContent.item(0)
    const lastFocusableElement = focusableContent.item(focusableContent.length - 1)

    document.addEventListener('keydown', function (e) {
      if (!(e.key === 'Tab')) return

      if (e.shiftKey && document.activeElement === firstFocusableElement) {
        // if shift key is pressed
        lastFocusableElement.focus()
        e.preventDefault()
      } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus()
        e.preventDefault()
      }

      if (!modal.contains(document.activeElement) || document.activeElement.tagName === 'BODY') {
        firstFocusableElement.focus()
        e.preventDefault()
      }
    })

    firstFocusableElement.focus()
  }, [])

  const hideModal = () => setShow(false)

  return (
    <>
      <div className="modal-overlay"></div>
      <div id="workout-delete-modal" className="modal">
        <button className="close-modal-btn" aria-label="Close modal" onClick={hideModal}>
          <FontAwesomeIcon icon={faXmark} />
        </button>

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
                  hideModal()
                },
                (err) => console.log(err)
              )
            }}
          >
            Yes, delete
          </button>
          <button onClick={hideModal}>No, go back</button>
        </div>
      </div>
    </>
  )
}
