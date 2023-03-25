import React from 'react'
import Page from '../Page'

export default function Error({ message }) {
  return (
    <Page>
      <div className="page-error">{message}</div>
    </Page>
  )
}
