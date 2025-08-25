import React from 'react'

// A memoized child that displays a value and exposes a button to invoke a callback
const MemoChild = React.memo(function MemoChild({ value, onAction }) {
  const renders = React.useRef(0)
  renders.current += 1
  return (
    <div style={{ padding: 10, borderRadius: 8, background: '#f8fafc' }}>
      <div>MemoChild renders: <strong>{renders.current}</strong></div>
      <div>value: <strong>{String(value)}</strong></div>
      <div style={{ marginTop: 8 }}>
        <button onClick={onAction} style={{ padding: '6px 10px' }}>Action</button>
      </div>
    </div>
  )
})

// A non-memoized child for comparison
function NonMemoChild({ value, onAction }) {
  const renders = React.useRef(0)
  renders.current += 1
  return (
    <div style={{ padding: 10, borderRadius: 8, background: '#fff7ed' }}>
      <div>NonMemoChild renders: <strong>{renders.current}</strong></div>
      <div>value: <strong>{String(value)}</strong></div>
      <div style={{ marginTop: 8 }}>
        <button onClick={onAction} style={{ padding: '6px 10px' }}>Action</button>
      </div>
    </div>
  )
}

export default function UseCase5() {
  const [count, setCount] = React.useState(0)
  const [text, setText] = React.useState('hello')
  const [childValue, setChildValue] = React.useState(0)

  // Handler recreated on every render (unless wrapped) — used for the NonMemoChild
  const unstableHandler = () => setChildValue(v => v + 1)

  // Stable handler memoized with useCallback — prevents causing memoized child to re-render
  const stableHandler = React.useCallback(() => setChildValue(v => v + 1), [])

  // A fake expensive derived value that we memoize with useMemo
  const expensive = React.useMemo(() => {
    // simulate CPU work
    let x = 0
    for (let i = 0; i < 50000; i++) x += i % 7
    return `${text} (${x})`
  }, [text])

  return (
    <div style={{ padding: 18, maxWidth: 820 }}>
      <h3 style={{ marginTop: 0 }}>Using React API: React.memo, useCallback, useMemo</h3>

      <p style={{ color: 'var(--muted, #555)' }}>
        This demo compares a memoized child and a non-memoized child. Use the controls to change
        unrelated parent state and observe render counts. It also shows memoizing handlers with
        <code>useCallback</code> and expensive derived data with <code>useMemo</code>.
      </p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <button onClick={() => setCount(c => c + 1)} style={{ padding: '8px 12px' }}>Parent count: {count}</button>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="text" style={{ padding: '8px' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <div>
          <h4>Memoized child (uses <code>useCallback</code> handler)</h4>
          <MemoChild value={childValue} onAction={stableHandler} />
        </div>

        <div>
          <h4>Non-memoized child (handler recreated each render)</h4>
          <NonMemoChild value={childValue} onAction={unstableHandler} />
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Derived expensive value (memoized):</strong>
        <div style={{ padding: 8, background: '#0f172a08', borderRadius: 6, marginTop: 8 }}>{expensive}</div>
      </div>

      <details>
        <summary style={{ cursor: 'pointer' }}>Why this matters</summary>
        <div style={{ padding: 10 }}>
          <ul>
            <li><code>React.memo</code> prevents re-renders when props are shallow-equal.</li>
            <li><code>useCallback</code> stabilizes function identities so memoized children don't re-render because of changing callback references.</li>
            <li><code>useMemo</code> avoids re-computing expensive values unless inputs change.</li>
          </ul>
        </div>
      </details>
    </div>
  )
}
