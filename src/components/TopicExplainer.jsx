import React, { useEffect, useState } from 'react'
import TopicBasics from '../topics/topic-1/TopicBasics'
import TopicComplex from '../topics/topic-1/TopicComplex'

export const footerTextContent = `This structure clearly shows how the application is a tree of nested, descriptive components.\n\nThe filter checkboxes update a filters state variable. The ProductGrid component is simply told to render the products that match the current filters state.`

export const footerCodeContent = `// Imperative (DOM-based)\n// 1) Find ProductGrid element\n// 2) Loop products and show/hide nodes\n\n// Declarative (React)\n// Update filter state -> ProductGrid re-renders filtered items.`

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
        <TopicBasics />
        <TopicComplex />
      </article>
    </main>
  )
}
