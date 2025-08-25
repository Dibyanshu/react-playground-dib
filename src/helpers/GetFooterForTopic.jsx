
import Topic1Basics from '../topics/topic-1/Topic1Basics'
import Topic1Complex from '../topics/topic-1/Topic2Complex'
import Topic3Basics from '../topics/topic-3/Topic3Basics'
import Topic3Complex from '../topics/topic-3/Topic3Complex'
import Topic3List from '../topics/topic-3/Topic3List'

export const footerTextContentTopic1 = `This structure clearly shows how the application is a tree of nested, descriptive components.\n\nThe filter checkboxes update a filters state variable. The ProductGrid component is simply told to render the products that match the current filters state.`
export const footerCodeContentTopic1 = `// Imperative (DOM-based)\n// 1) Find ProductGrid element\n// 2) Loop products and show/hide nodes\n\n// Declarative (React)\n// Update filter state -> ProductGrid re-renders filtered items.`
export const footerTextContentTopic3 = `JSX lets you write HTML-like syntax inside JavaScript functions, embed expressions with { }, and use conditional rendering and event handlers to create interactive UI.`
export const footerCodeContentTopic3 = `// Example: JSX embedding expressions\nconst userName = 'Alice'\nconst element = <h1>Hello, {userName}!</h1>;`


export function getFooterForTopic(topic) {
  const key = (topic || '').toLowerCase().trim()
  const TOPIC_MAP = {
    'topic 3: jsx - javascript xml': {
      steps: [
        { id: 'basics', label: 'Basics', Component: Topic3Basics },
        { id: 'complex', label: 'Complex', Component: Topic3Complex },
        { id: 'list', label: 'Dynamic List', Component: Topic3List },
      ],
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
