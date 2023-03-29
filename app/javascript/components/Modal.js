import React, { useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Modal({ id, setShow, children }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (!modalRef.current) return

    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    const focusableContent = modalRef.current.querySelectorAll(focusableElements)
    const firstFocusableElement = focusableContent.item(0)
    const lastFocusableElement = focusableContent.item(focusableContent.length - 1)

    const handleTab = (e) => {
      if (!(e.key === 'Tab')) return

      if (e.shiftKey && document.activeElement === firstFocusableElement) {
        // if shift key is pressed
        lastFocusableElement.focus()
        e.preventDefault()
      } else if (!e.shiftKey && document.activeElement === lastFocusableElement) {
        firstFocusableElement.focus()
        e.preventDefault()
      }

      if (!modalRef.current.contains(document.activeElement) || document.activeElement.tagName === 'BODY') {
        firstFocusableElement.focus()
        e.preventDefault()
      }
    }

    document.addEventListener('keydown', handleTab)

    firstFocusableElement.focus()

    return () => {
      document.removeEventListener('keydown', handleTab)
    }
  }, [modalRef])

  const hideModal = () => setShow(false)

  return (
    <>
      <div className="modal-overlay"></div>
      <div id={id ? id : ''} className="modal">
        <button className="close-modal-btn" aria-label="Close modal" onClick={hideModal}>
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {children}
      </div>
    </>
  )
}
