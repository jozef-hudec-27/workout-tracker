import React, { useState, useCallback } from 'react'
import { faPenToSquare, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { blockBtnSpam, request } from '../../utils'
import useToast from '../../hooks/useToast'

export default function Exercise({ exercise, setExercises }) {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(exercise?.name)
  const [description, setDescription] = useState(exercise?.description)
  const [originalName, setOriginalName] = useState(exercise?.name)
  const [originalDescription, setOriginalDescription] = useState(exercise?.description)

  const textareaRef = useCallback((textarea) => {
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${textarea.scrollHeight}px`
  }, [])

  const handleSubmitBtn = (e) => {
    blockBtnSpam(e, () => {
      request(
        `/api/exercises/${exercise.id}`,
        'PUT',
        {
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
          body: JSON.stringify({ name: name, description: description }),
        },
        (_) => {
          setOriginalName(name)
          setOriginalDescription(description)
          setIsEditing(false)
          setExercises((prevExercises) =>
            prevExercises.map((ex) => {
              if (ex.id !== exercise.id) return ex

              const newExercise = { ...ex }
              newExercise.name = name
              newExercise.description = description
              return newExercise
            })
          )
        },
        (_) => useToast('Could not update exercise.', 'error')
      )
    })
  }

  const handleDeleteBtn = (e) => {
    blockBtnSpam(e, () => {
      request(
        `/api/exercises/${exercise.id}`,
        'DELETE',
        {
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
          },
        },
        (data) => {
          if (data.message.includes('deleted')) {
            setExercises((prevExercises) => prevExercises.filter((ex) => ex.id !== exercise.id))
          }
          useToast(data.message, 'info')
        },
        (_) => useToast('Could not delete exercise.', 'error')
      )
    })
  }

  return (
    <div className="flexbox gap-16 flex-center">
      <button aria-label="Delete exercise" className="empty-btn" onClick={handleDeleteBtn}>
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <div className="exercise flexbox flex-column">
        {isEditing ? (
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        ) : (
          <h3>{name}</h3>
        )}

        {isEditing ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            ref={textareaRef}
          ></textarea>
        ) : (
          <p>{description}</p>
        )}
      </div>

      {isEditing ? (
        <div className="flexbox flex-column gap-4">
          <button aria-label="Submit edit" className="main-btn" onClick={handleSubmitBtn}>
            <FontAwesomeIcon icon={faCheck} />
          </button>

          <button
            aria-label="Cancel edit"
            className="main-btn"
            onClick={() => {
              setName(originalName)
              setDescription(originalDescription)
              setIsEditing(false)
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ) : (
        <button aria-label="Edit exercise" className="main-btn" onClick={() => setIsEditing(true)}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      )}
    </div>
  )
}
