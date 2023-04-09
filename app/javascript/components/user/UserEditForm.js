import React, { useRef } from 'react'
import useToast from '../../hooks/useToast'
import { blockBtnSpam, request } from '../../utils'

export default function UserEditForm({ user }) {
  const emailRef = useRef()
  const newPasswordRef = useRef()
  const newPasswordConfirmationRef = useRef()
  const currentPasswordRef = useRef()

  const handleEdit = (e) => {
    e.preventDefault()

    blockBtnSpam(e, () => {
      const email = emailRef.current.value
      const newPassword = newPasswordRef.current.value
      const newPasswordConfirmation = newPasswordConfirmationRef.current.value
      const oldPassword = currentPasswordRef.current.value

      if (!oldPassword) {
        return useToast('Current password cannot be empty.', 'info')
      } else if (newPassword !== newPasswordConfirmation) {
        return useToast('New password and password confirmation must match.', 'info')
      }

      const body = JSON.stringify({
        email,
        newPassword,
        newPasswordConfirmation,
        oldPassword,
      })

      request(
        '/users',
        'PUT',
        {
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
          body,
        },
        (_) => {
          useToast('User updated successfully', 'info')
        },
        (error) => {
          useToast(error.message, 'error')
        }
      )
    })
  }

  return (
    <form className="form edit-user-form flexbox flex-center py-16" onSubmit={handleEdit}>
      <div className="edit-user-inputs flexbox flex-column gap-16">
        <label className="label">
          Email:
          <input type="email" placeholder="john.doe@example.com" defaultValue={user.email} ref={emailRef} required />
        </label>

        <label className="label">
          New password:
          <input type="password" placeholder="••••••••••" ref={newPasswordRef} />
        </label>
        <label className="label">
          New password confirmation:
          <input type="password" placeholder="••••••••••" ref={newPasswordConfirmationRef} />
        </label>

        <label className="label">
          Current password:
          <input type="password" placeholder="••••••••" ref={currentPasswordRef} required />
        </label>

        <button className="main-btn">Edit</button>
      </div>
    </form>
  )
}
