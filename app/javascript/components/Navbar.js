import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
  return (
    <nav>
      <h1>
        <Link to="/">WorkoutTracker</Link>
      </h1>

      <ul className="flexbox gap-16">
        <Dropdown
          button={{ text: <FontAwesomeIcon icon={faChevronDown} />, className: 'nav-dropdown-btn' }}
          links={[
            { url: '/workouts/new', text: 'Add workout' },
            { url: '/exercises', text: 'My exercises' },
          ]}
        />

        <li className="nav-link add-exercise">
          <Link to="/exercises">My exercises</Link>
        </li>

        <li className="nav-link add-workout">
          <Link to="/workouts/new">Add workout</Link>
        </li>

        <li className="nav-link">
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
