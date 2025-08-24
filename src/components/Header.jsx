import React from 'react'

export default function Header({ title }) {
  return (
    <header className="ppt-header">
      <div className="ppt-header-inner">
        <h2 className="topic-title">{title}</h2>
      </div>
    </header>
  )
}
