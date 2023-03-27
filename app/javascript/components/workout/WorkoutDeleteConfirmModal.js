import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function WorkoutDeleteConfirmModal({ setShow }) {
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
    console.log(firstFocusableElement)
    firstFocusableElement.focus()
  }, [])

  return (
    <>
      <div className="modal-overlay"></div>
      <div id="workout-delete-modal" className="modal">
        <button className="close-modal-btn" aria-label="Close modal" onClick={() => setShow(false)}>
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h3>Are you sure you want to delete this workout?</h3>

        <div className="btn-group flexbox flex-center">
          <button>Yes, delete</button>
          <button>No, go back</button>
        </div>
      </div>
    </>
  )
}
