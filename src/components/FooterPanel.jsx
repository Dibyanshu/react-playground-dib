import React, { useState } from 'react'
import FooterText from './FooterText'
import FooterCode from './FooterCode'

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
          <FooterText text={contentText} />
        ) : (
          <FooterCode code={contentCode} />
        )}
      </div>
    </div>
  )
}
