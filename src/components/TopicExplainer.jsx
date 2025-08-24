import React, { useEffect, useState } from 'react'

export default function TopicExplainer({ topic }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [topic])

  if (loading) {
    return (
      <main className="ppt-main">
        <div className="loader">Loading topic...</div>
      </main>
    )
  }

  return (
    <main className="ppt-main">
      <article className="explainer">
        <h3>{topic}</h3>
        <p>
          This is a short explainer for <strong>{topic}</strong>. Use this area to
          show key points, diagrams, or embed interactive examples.
        </p>
        <ul>
          <li>Goal: Communicate the main idea clearly.</li>
          <li>Keep slides focused and minimal.</li>
          <li>Show code examples in the expandable footer.</li>
        </ul>
      </article>
    </main>
  )
}
