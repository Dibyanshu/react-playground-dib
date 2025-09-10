import React from 'react'

// Demonstrates useMemo to avoid recomputing expensive derived data
export default function UseCase73() {
  // create a large sample dataset once
  const bigData = React.useMemo(() => {
    const arr = []
    for (let i = 0; i < 20000; i++) {
      arr.push({
        id: i + 1,
        value: Math.round(Math.random() * 1000),
        category: ['A', 'B', 'C', 'D'][i % 4],
      })
    }
    return arr
  }, [])

  const [categoryFilter, setCategoryFilter] = React.useState('All')
  const [showRaw, setShowRaw] = React.useState(false)
  const [tick, setTick] = React.useState(0) // unrelated state to prove memoization

  // expensive aggregation: compute counts and sums per category
  const startExpLabel = React.useRef(null)
  const aggregated = React.useMemo(() => {
    // intentionally expensive loop to simulate heavy CPU work
    const t0 = performance.now()
    const summary = { total: 0, count: 0, byCategory: {} }
    for (let item of bigData) {
      summary.total += item.value
      summary.count += 1
      if (!summary.byCategory[item.category]) summary.byCategory[item.category] = { sum: 0, count: 0 }
      summary.byCategory[item.category].sum += item.value
      summary.byCategory[item.category].count += 1
    }
    // busy work to amplify cost
    let burn = 0
    for (let i = 0; i < 200000; i++) burn += i % 3
    const t1 = performance.now()
    startExpLabel.current = `computed in ${(t1 - t0).toFixed(1)}ms` // show how long it took
    return summary
  }, [bigData]) // important: depends only on bigData

  // filtered list (cheap) but memoized to avoid recreating array on unrelated renders
  const filtered = React.useMemo(() => {
    if (categoryFilter === 'All') return bigData
    return bigData.filter(d => d.category === categoryFilter)
  }, [bigData, categoryFilter])

  return (
    <div style={{ padding: 16, maxWidth: 880 }}>
      <h3 style={{ marginTop: 0 }}>useMemo — expensive derived data</h3>

      <p style={{ color: 'var(--muted, #555)' }}>
        This demo generates a large dataset once and shows an expensive aggregation computed with
        <code>useMemo</code>. Changing unrelated UI state (the <em>tick</em> counter) will not re-run the expensive calculation.
      </p>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <label>
          Category:
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} style={{ marginLeft: 8 }}>
            <option>All</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
            <option>D</option>
          </select>
        </label>

        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={showRaw} onChange={e => setShowRaw(e.target.checked)} /> Show raw (first 10)
        </label>

        <button onClick={() => setTick(t => t + 1)} style={{ marginLeft: 'auto' }}>Unrelated tick: {tick}</button>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Aggregated (memoized):</strong>
        <div style={{ padding: 10, borderRadius: 6, background: '#0f172a08', marginTop: 8 }}>
          <div>Total items: {aggregated.count}</div>
          <div>Total sum: {aggregated.total}</div>
          <div style={{ marginTop: 8 }}><em>{startExpLabel.current}</em></div>
        </div>
      </div>

      <div style={{ marginBottom: 12 }}>
        <strong>Per-category summary:</strong>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          {Object.entries(aggregated.byCategory).map(([cat, s]) => (
            <div key={cat} style={{ padding: 8, borderRadius: 6, background: 'rgba(15, 23, 42, 0.03)' }}>
              <div><strong>{cat}</strong></div>
              <div>count: {s.count}</div>
              <div>sum: {s.sum}</div>
            </div>
          ))}
        </div>
      </div>

      {showRaw && (
        <div>
          <strong>Raw sample (first 10 of filtered):</strong>
          <ul style={{ paddingLeft: 18 }}>
            {filtered.slice(0, 10).map(d => (
              <li key={d.id}>#{d.id} — {d.category} — {d.value}</li>
            ))}
          </ul>
        </div>
      )}

      <details style={{ marginTop: 12 }}>
        <summary style={{ cursor: 'pointer' }}>Why useMemo here?</summary>
        <div style={{ padding: 10 }}>
          <ul>
            <li>Expensive operations (loops, heavy transforms) should be memoized so they only run when inputs change.</li>
            <li>In this example the expensive aggregation depends only on the dataset, not on UI toggles — so useMemo is effective.</li>
            <li>Measure with performance.now() during development to verify savings.</li>
          </ul>
        </div>
      </details>
      <details style={{ marginTop: 12 }}>
        <summary style={{ cursor: 'pointer' }}>Why useMemo in 2 places?</summary>
        <div style={{ padding: 10 }}>
          <ul>
            <li>First useMemo (bigData): create a large, stable dataset once and keep the same reference across renders.
                <ul>
                    <li>Purpose: avoid re-allocating/generating 20k items on every render. Generating that array is non-trivial (and uses randomness here), so you want it done once.</li>
                    <li>Benefit: stable reference for downstream computations (and prevents values from changing each render when Math.random is used).</li>
                </ul>
            </li>
            <li>Second useMemo (aggregated): run an expensive aggregation once (or only when the dataset changes) instead of on every render.
                <ul>
                    <li>Purpose: the aggregation does an expensive loop + busy work. You only want to compute that when the underlying data changes.</li>
                    <li>Benefit: UI actions that don’t change the dataset (e.g., toggling showRaw or incrementing tick) won't trigger the heavy work, keeping the UI responsive.</li>
                </ul>
            </li>
            <li>Third useMemo for filtered: cheaply memoizes a filtered view so unrelated renders don’t recreate the array.
                <ul>
                    <li>Purpose: avoid re-filtering the large array on every unrelated render and to keep filtered referentially stable unless the inputs change.</li>
                    <li>Benefit: keeps reference stable unless filter or data changes, which is good practice when passing data to children.</li>
                </ul>
            </li>
          </ul>
        </div>
      </details>
    </div>
  )
}
