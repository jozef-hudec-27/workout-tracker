import React, { useState, useCallback } from 'react'
import { faPenToSquare, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Exercise({ exercise }) {
  const [isEditing, setIsEditing] = useState(false)

  const textareaRef = useCallback((textarea) => {
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [])

  return (
    <div className="flexbox gap-16 flex-center">
      <div className="exercise flexbox flex-column">
        {isEditing ? <input type="text" defaultValue={exercise.name} placeholder="Name" /> : <h3>{exercise.name}</h3>}

        {isEditing ? (
          <textarea defaultValue={exercise.description} placeholder="Description" ref={textareaRef}></textarea>
        ) : (
          <p>{exercise.description}</p>
        )}
      </div>

      {isEditing ? (
        <button aria-label="Submit edit" className="main-btn" onClick={() => setIsEditing(false)}>
          <FontAwesomeIcon icon={faCheck} />
        </button>
      ) : (
        <button aria-label="Edit exercise" className="main-btn" onClick={() => setIsEditing(true)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      )}
    </div>
  )
}
