import React from 'react'

// UseCase1: Search component demonstrating useState + useEffect
export default function UseCase71() {
  const [query, setQuery] = React.useState('')
  const [results, setResults] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const inputRef = React.useRef(null)

  // Focus the input on mount
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [])

  // Fetch users when `query` changes (debounced). Demonstrates useEffect for data fetching.
  React.useEffect(() => {
    // if query is empty, clear results and skip network
    if (!query) {
      setResults([])
      setError(null)
      setLoading(false)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    // debounce to avoid firing on every keystroke
    const timer = setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
        .then(res => {
          if (!res.ok) throw new Error('Network response was not ok')
          return res.json()
        })
        .then(data => {
          const q = query.toLowerCase()
          const filtered = data.filter(u => (u.name + ' ' + u.email).toLowerCase().includes(q))
          setResults(filtered)
        })
        .catch(err => {
          if (err.name === 'AbortError') return
          setError(err.message || 'Failed to fetch')
        })
        .finally(() => setLoading(false))
    }, 350)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  return (
    <div style={{ padding: 16, maxWidth: 720 }}>
      <h3 style={{ marginTop: 0 }}>Search users (useState + useEffect)</h3>
      <p style={{ color: 'var(--muted, #555)' }}>
        Type a name or email to search. This demo debounces input and uses AbortController to cancel in-flight requests.
      </p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search users by name or email..."
          style={{ flex: 1, padding: '8px 10px' }}
        />
        <button onClick={() => setQuery('')}>Clear</button>
      </div>

      {loading && <div style={{ marginBottom: 8 }}>Loading…</div>}
      {error && <div style={{ marginBottom: 8, color: '#b91c1c' }}>Error: {error}</div>}

      <div>
        <div style={{ marginBottom: 8 }}>Results: <strong>{results.length}</strong></div>
        <ul style={{ paddingLeft: 18 }}>
          {results.map(u => (
            <li key={u.id} style={{ marginBottom: 6 }}>
              <strong>{u.name}</strong> — <small>{u.email}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
