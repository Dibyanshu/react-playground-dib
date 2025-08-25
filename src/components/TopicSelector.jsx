import React from 'react'

export default function TopicSelector({ topics, value, onChange }) {
  return (
    <div className="topic-selector">
      <label htmlFor="topic-select">Choose topic:</label>
      <select id="topic-select" value={value} onChange={e => onChange(e.target.value)}>
        {topics.map(t => (
          <option key={t.key} value={t.key}>{t.label}</option>
        ))}
      </select>
    </div>
  )
}
