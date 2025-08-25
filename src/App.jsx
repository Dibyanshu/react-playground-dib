import './App.css'
import Header from './components/Header'
import TopicExplainer, { getFooterForTopic } from './components/TopicExplainer'
import FooterPanel from './components/FooterPanel'
import TopicSelector from './components/TopicSelector'
import { useState, useEffect, useMemo } from 'react'

function App() {
  const topicOptions = useMemo(() => [
    { key: 'Topic 1: Introduction to React', label: 'Topic 1: Introduction to React' },
    { key: 'Topic 3: JSX - JavaScript XML', label: 'Topic 3: JSX - JavaScript XML' },
  ], [])

  const [topic, setTopic] = useState(topicOptions[1].key)

  // Keyboard navigation: left/right arrows to move between topics
  useEffect(() => {
    function onKey(e) {
      // ignore when typing into inputs
      const tag = (e.target && e.target.tagName) || ''
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return

      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const idx = topicOptions.findIndex(t => t.key === topic)
        if (idx === -1) return
        let nextIdx = idx
        if (e.key === 'ArrowLeft') {
          // loop to last when at first
          nextIdx = idx === 0 ? topicOptions.length - 1 : idx - 1
        }
        if (e.key === 'ArrowRight') {
          // loop to first when at last
          nextIdx = idx === topicOptions.length - 1 ? 0 : idx + 1
        }
        if (nextIdx !== idx) setTopic(topicOptions[nextIdx].key)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [topic, topicOptions])

  // Choose footer content based on the current topic
  const mapping = getFooterForTopic(topic)
  const sampleCode = mapping.footerCode
  const sampleText = mapping.footerText

  return (
    <div className="ppt-root">
  <Header title={`Topic: ${topic}`} topics={topicOptions} topicValue={topic} onTopicChange={setTopic} />
      <TopicExplainer topic={topic} />
      <FooterPanel contentText={sampleText} contentCode={sampleCode} />
    </div>
  )
}

export default App
