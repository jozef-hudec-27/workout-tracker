import React, { useEffect, useState } from 'react'
import useToast from '../../hooks/useToast'
import Page from '../Page'
import { request } from '../../utils'
import UserDeleteConfirmModal from '../user/UserDeleteConfirmModal'
import UserEditForm from '../user/UserEditForm'

export default function EditUserPage() {
  const [user, setUser] = useState(null)
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false)

  useEffect(() => {
    request(
      '/api/users',
      'GET',
      {},
      (data) => setUser(data),
      (_) => useToast('Could not get user data.', 'error')
    )
  }, [])

  return (
    <Page name="edit-user">
      {showDeleteAccountModal && <UserDeleteConfirmModal setShow={setShowDeleteAccountModal} />}

      <h2 className="mb-16">Edit account</h2>

      {!!!user ? (
        <p>User not found.</p>
      ) : (
        <>
          <UserEditForm user={user} />

          <div className="flexbox flex-center">
            <button className="main-btn mt-16" onClick={() => setShowDeleteAccountModal(true)}>
              Delete account
            </button>
          </div>
        </>
      )}
    </Page>
  )
}
