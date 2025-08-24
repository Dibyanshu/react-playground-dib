import React, { useState } from 'react'

export default function FooterPanel({ initialMode = 'text', contentText, contentCode }) {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState(initialMode)

  return (
    <div className={`ppt-footer ${open ? 'open' : ''}`}>
      <div className="ppt-footer-bar" onClick={() => setOpen(o => !o)}>
        <button onClick={(e) => { e.stopPropagation(); setMode('text') }} className={mode === 'text' ? 'active' : ''}>Text</button>
        <button onClick={(e) => { e.stopPropagation(); setMode('code') }} className={mode === 'code' ? 'active' : ''}>Code</button>
        <div className="ppt-footer-toggle">{open ? '▼' : '▲'}</div>
      </div>

      <div className="ppt-footer-content">
        {mode === 'text' ? (
          <div className="footer-text">{contentText}</div>
        ) : (
          <pre className="footer-code"><code>{contentCode}</code></pre>
        )}
      </div>
    </div>
  )
}
