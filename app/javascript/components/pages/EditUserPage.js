import React, { useEffect, useRef, useState } from 'react'
import useToast from '../../hooks/useToast'
import Page from '../Page'
import { request } from '../../utils'

export default function EditUserPage() {
  const [user, setUser] = useState(null)

  const emailRef = useRef()
  const newPasswordRef = useRef()
  const newPasswordConfirmationRef = useRef()
  const currentPasswordRef = useRef()

  useEffect(() => {
    request(
      '/api/users',
      'GET',
      {},
      (data) => setUser(data),
      (_) => useToast('Could not get user data.', 'error')
    )
  }, [])

  const handleEditClick = (e) => {
    e.preventDefault()

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
  }

  return (
    <Page name="edit-user">
      <h1>Edit account</h1>

      {!!!user ? (
        <p>User not found.</p>
      ) : (
        <form className="edit-user-form flexbox flex-center py-16" onSubmit={handleEditClick}>
          <div className="edit-user-inputs flexbox flex-column gap-16">
            <label className="label">
              Email:
              <input
                type="email"
                placeholder="john.doe@example.com"
                defaultValue={user.email}
                ref={emailRef}
                required
              />
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
      )}
    </Page>
  )
}
