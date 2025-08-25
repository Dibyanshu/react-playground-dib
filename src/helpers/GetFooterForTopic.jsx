
import { TOPICS } from './topicMetadata.jsx'

export function getFooterForTopic(topic) {
  const key = (topic || '').toLowerCase().trim()
  const entry = (TOPICS[key] || TOPICS['topic 1: introduction to react']) || {}

  // Ensure we return a normalized { steps, footerText, footerCode, label }
  const steps = Array.isArray(entry.steps) ? entry.steps : []
  const footerText = (entry.footer && entry.footer.text) || ''
  const footerCode = (entry.footer && entry.footer.code) || ''

  return { ...entry, steps, footerText, footerCode }
}
