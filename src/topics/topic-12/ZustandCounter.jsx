import React from 'react'
import { create } from 'zustand'

// Local store for demo purposes
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  add: (n) => set((s) => ({ count: s.count + n })),
  reset: () => set({ count: 0 }),
}))

export default function ZustandCounter() {
  const { count, increment, decrement, add, reset } = useCounterStore()

  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <h3>Zustand Counter (demo)</h3>
      <p>Count: {count}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <button onClick={() => add(5)}>+5</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
