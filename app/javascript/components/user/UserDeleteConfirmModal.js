import React from 'react'
import { blockBtnSpam, request } from '../../utils'
import Modal from '../Modal'

export default function UserDeleteConfirmModal({ setShow }) {
  const handleDeleteBtn = (e) => {
    blockBtnSpam(e, () => {
      request(
        '/users/',
        'DELETE',
        {
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
        },
        (_) => (window.location.href = ''),
        (_) => useToast('Could not delete account.', 'error')
      )
    })
  }

  return (
    <Modal id="account-delete-modal" setShow={setShow}>
      <>
        <h3>
          Are you sure you want to delete your account? All your workouts will be lost. This action is irreversible.
        </h3>

        <div className="btn-group flexbox flex-center">
          <button onClick={handleDeleteBtn}>Yes, delete</button>

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
