import React from 'react'

// Small inline icon components for reuse
export const SunIcon = ({ className = '', size = 18 }) => (
  <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
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
)

export const MoonIcon = ({ className = '', size = 18 }) => (
  <svg className={className} viewBox="0 0 24 24" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
  </svg>
)

// Footer strings keyed by topic key
export const FOOTER = {
  'topic 1: introduction to react': {
    text: `This structure clearly shows how the application is a tree of nested, descriptive components.\n\nThe filter checkboxes update a filters state variable. The ProductGrid component is simply told to render the products that match the current filters state.`,
    code: `// Imperative (DOM-based)\n// 1) Find ProductGrid element\n// 2) Loop products and show/hide nodes\n\n// Declarative (React)\n// Update filter state -> ProductGrid re-renders filtered items.`,
  },
  'topic 3: jsx - javascript xml': {
    text: `JSX lets you write HTML-like syntax inside JavaScript functions, embed expressions with { }, and use conditional rendering and event handlers to create interactive UI.`,
    code: `// Example: JSX embedding expressions\nconst userName = 'Alice'\nconst element = <h1>Hello, {userName}!</h1>;`,
  },
}

// (single default export is at the end)

// Import topic components here to centralize mapping and reduce duplication
import Topic1Basics from '../topics/topic-1/Topic1Basics'
import Topic1Complex from '../topics/topic-1/Topic2Complex'
import Topic3Basics from '../topics/topic-3/Topic3Basics'
import Topic3Complex from '../topics/topic-3/Topic3Complex'
import UseCase1 from '../topics/topic-3/UseCase1'
import UseCase2 from '../topics/topic-3/UseCase2'
import UseCase3 from '../topics/topic-3/UseCase3'
import UseCase4 from '../topics/topic-3/UseCase4'
import UseCase5 from '../topics/topic-3/UseCase5'

import UseCase71 from '../topics/topic-7/UseCase71'
import UseCase72 from '../topics/topic-7/UseCase72'
import UseCase73 from '../topics/topic-7/UseCase73'

import UseCase81 from '../topics/topic-8/UseCase81'
import UseCase82 from '../topics/topic-8/UseCase82'

import ContextAPIExample from '../topics/topic-12/ContextAPI-Basic'
import ZustandCounter from '../topics/topic-12/ZustandCounter'

// Topics data structure: id, label, component, footer text/code
// Used by App.jsx and TopicViewer.jsx to build navigation and render content

export const TOPICS = {
  'topic 1: introduction to react': {
    label: 'Topic 1: Introduction to React',
    steps: [
      { id: 'basics', label: 'Basics', Component: Topic1Basics },
      { id: 'complex', label: 'Complex', Component: Topic1Complex },
    ],
    footer: FOOTER['topic 1: introduction to react'],
  },
  'topic 3: jsx - javascript xml': {
    label: 'Topic 3: JSX - JavaScript XML',
    steps: [
      { id: 'basics', label: 'Basics', Component: Topic3Basics },
      { id: 'complex', label: 'Complex', Component: Topic3Complex },
      { id: 'list', label: 'Dynamic List', Component: UseCase1 },
      { id: 'conditional', label: 'Conditional UI', Component: UseCase2 },
      { id: 'configurable', label: 'Configurable Component', Component: UseCase3 },
      { id: 'controlled', label: 'Controlled Components', Component: UseCase4 },
      { id: 'memoization', label: 'Memoization', Component: UseCase5 }
    ],
    footer: FOOTER['topic 3: jsx - javascript xml'],
  },
  'topic 7: state and effects (react hooks)': {
    label: 'Topic 7: State and Effects (React Hooks)',
    steps: [
      { id: 'useState / useEffect', label: 'useState / useEffect', Component: UseCase71 },
      { id: 'useRef', label: 'useRef', Component: UseCase72 },
      { id: 'useMemo', label: 'useMemo', Component: UseCase73 },
      { id: 'useMemo-simple', label: 'useMemo simple', Component: React.lazy(() => import('../topics/topic-7/memoized-simple')) },
      { id: 'useCallback-simple', label: 'useCallback simple', Component: React.lazy(() => import('../topics/topic-7/callback-simple')) },
      { id: 'memo-callback-simple', label: 'memo + useCallback simple', Component: React.lazy(() => import('../topics/topic-7/memo-callback-simple')) },
    ],
    footer: FOOTER['topic 7: state and effects (react hooks)'],
  },
  'topic8': {
    label: 'Topic 8: Component Communucation',
    steps: [
      { id: 'Parent-to-Child', label: 'Parent-to-Child (Props)', Component: UseCase81 },
      { id: 'Child-to-Parent', label: 'Child-to-Parent (Lifting State Up)', Component: UseCase82 }
    ],
    footer: FOOTER['topic8'],
  },
  'topic12': {
    label: 'Topic 12: Managing Complex State',
    steps: [
      { id: 'context-basic', label: 'Basic Usage Context API', Component: ContextAPIExample },
      { id: 'useReducer-basic', label: 'Basic Usage useReducer', Component: React.lazy(() => import('../topics/topic-12/useReducer-Basic')) },
      { id: 'zustand', label: 'Zustand store (example)', Component: ZustandCounter },
    ],
    footer: FOOTER['topic12'],
  },
}

export default { SunIcon, MoonIcon, FOOTER, TOPICS }
