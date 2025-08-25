import React, { useEffect, useState } from 'react'
import Topic1Basics from '../topics/topic-1/Topic1Basics'
import Topic1Complex from '../topics/topic-1/Topic2Complex'
import Topic3Basics from '../topics/topic-3/Topic3Basics'
import Topic3Complex from '../topics/topic-3/Topic3Complex'

export const footerTextContentTopic1 = `This structure clearly shows how the application is a tree of nested, descriptive components.\n\nThe filter checkboxes update a filters state variable. The ProductGrid component is simply told to render the products that match the current filters state.`

export const footerCodeContentTopic1 = `// Imperative (DOM-based)\n// 1) Find ProductGrid element\n// 2) Loop products and show/hide nodes\n\n// Declarative (React)\n// Update filter state -> ProductGrid re-renders filtered items.`

export const footerTextContentTopic3 = `JSX lets you write HTML-like syntax inside JavaScript functions, embed expressions with { }, and use conditional rendering and event handlers to create interactive UI.`

export const footerCodeContentTopic3 = `// Example: JSX embedding expressions\nconst userName = 'Alice'\nconst element = <h1>Hello, {userName}!</h1>;`

export function getFooterForTopic(topic) {
  const key = (topic || '').toLowerCase().trim()
  const TOPIC_MAP = {
    'topic 3: jsx - javascript xml': {
      Basics: Topic3Basics,
      Complex: Topic3Complex,
      footerText: footerTextContentTopic3,
      footerCode: footerCodeContentTopic3,
    },
    'topic 1: introduction to react': {
      Basics: Topic1Basics,
      Complex: Topic1Complex,
      footerText: footerTextContentTopic1,
      footerCode: footerCodeContentTopic1,
    },
  }

  const entry = TOPIC_MAP[key] || TOPIC_MAP['topic 1: introduction to react']

  // Normalize older {Basics, Complex} entries into an ordered steps array.
  // Newer topic entries may provide `steps: [{ id, label, Component }, ...]` directly.
  let steps = []
  if (Array.isArray(entry.steps) && entry.steps.length) {
    steps = entry.steps
  } else if (entry.Basics || entry.Complex) {
    // preserve the Basics -> Complex order for backward compatibility
    if (entry.Basics) steps.push({ id: 'basics', label: 'Basics', Component: entry.Basics })
    if (entry.Complex) steps.push({ id: 'complex', label: 'Complex', Component: entry.Complex })
  } else {
    // Fallback: collect any component-like fields (heuristic)
    Object.keys(entry).forEach(k => {
      if (typeof entry[k] === 'function') {
        steps.push({ id: k, label: k, Component: entry[k] })
      }
    })
  }

  return { ...entry, steps }
}

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
