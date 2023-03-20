import React from 'react'

export default function Navbar() {
  return (
    <nav>
      <h1>WorkoutTracker</h1>

      <ul>
        <li>
          <a
            href=""
            onClick={(e) => {
              e.preventDefault()

              fetch('/users/sign_out', {
                method: 'DELETE',
                headers: {
                  'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
              })
                .then((response) => {
                  if (response.ok) return (window.location.href = '')
                  throw new Error('Could not log out')
                })
                .catch((err) => {
                  console.log(err)
                })
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </nav>
  )
}
