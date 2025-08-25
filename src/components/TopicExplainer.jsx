import React, { useEffect, useState } from 'react'
import { getFooterForTopic } from '../helpers/GetFooterForTopic'

export default function TopicExplainer({ topic }) {
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(0) // index into the ordered steps array

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [topic])

  // reset step when topic changes
  useEffect(() => {
    setStep(0)
  }, [topic])

  // handle ArrowDown/ArrowUp to navigate through an arbitrary number of steps
  useEffect(() => {
    const map = getFooterForTopic(topic)
    const steps = map.steps || []
    const len = Math.max(1, steps.length)

    function onKey(e) {
      const tag = (e.target && e.target.tagName) || ''
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return

      if (e.key === 'ArrowDown') {
        setStep(s => (s + 1) % len) // wrap forward
      } else if (e.key === 'ArrowUp') {
        setStep(s => (s - 1 + len) % len) // wrap backward
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [topic])

  if (loading) {
    return (
      <main className="ppt-main">
        <div className="loader">Loading topic...</div>
      </main>
    )
  }

  const map = getFooterForTopic(topic)
  const steps = map.steps || []
  const active = steps[step] || steps[0] || null
  const ActiveComp = active ? active.Component : null

  return (
    <main className="ppt-main">
      <article className="explainer">
        <div className="slide-content" key={`${topic}-${step}`}>
          {ActiveComp ? <ActiveComp /> : <div>No content for this topic.</div>}
        </div>
      </article>
    </main>
  )
}
