import React, { useEffect, useState } from 'react'
import TopicSelector from './TopicSelector'
import { SunIcon, MoonIcon } from '../helpers/topicMetadata.jsx'

export default function Header({ title, topics = [], topicValue, onTopicChange }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored) return stored
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    } catch (e) {
      // ignore
    }
    return 'light'
  })

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    } catch (e) {
      // ignore
    }
  }, [theme])

  function toggleTheme() {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  }

  return (
    <header className="ppt-header">
      <div className="ppt-header-inner">
        <h2 className="topic-title">{title}</h2>
        <div className="header-controls" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            className={`theme-toggle`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <span className="icon-wrap" aria-hidden="true">
              <SunIcon className={`icon sun ${theme === 'light' ? 'active' : ''}`} />
              <MoonIcon className={`icon moon ${theme === 'dark' ? 'active' : ''}`} />
            </span>
          </button>

          {topics.length > 0 && (
            <TopicSelector topics={topics} value={topicValue} onChange={onTopicChange} />
          )}
        </div>
      </div>
    </header>
  )
}
