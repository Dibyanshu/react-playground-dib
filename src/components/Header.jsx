import React, { useEffect, useState } from 'react'
import TopicSelector from './TopicSelector'

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
              {/* Sun icon (visible in light theme) */}
              <svg
                className={`icon sun ${theme === 'light' ? 'active' : ''}`}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <g stroke="currentColor" strokeWidth={1.2} strokeLinecap="round">
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
                  <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" />
                  <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
                </g>
              </svg>

              {/* Moon icon (visible in dark theme) */}
              <svg
                className={`icon moon ${theme === 'dark' ? 'active' : ''}`}
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                  fill="currentColor"
                />
              </svg>
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
