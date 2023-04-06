import React, { useRef } from 'react'
import Page from '../Page'

export default function EditUserPage() {
  const emailRef = useRef()
  const newPasswordRef = useRef()
  const newPasswordConfirmationRef = useRef()
  const currentPasswordConfirmationRef = useRef()

  return (
    <Page name="edit-user">
      <h1>Edit account</h1>

      <div className="edit-user-form flexbox flex-center">
        <div className="edit-user-inputs flexbox flex-column gap-16">
          <label className="label">
            Email:
            <input type="email" placeholder="john.doe@example.com" ref={emailRef} />
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
            <input type="password" placeholder="••••••••" ref={currentPasswordConfirmationRef} />
          </label>

          <button className="main-btn">Edit</button>
        </div>
      </div>
    </Page>
  )
}
