import React, { useState, useMemo, useEffect } from "react";

export default function UseMemoExample() {
  const [count, setCount] = useState(0);
  // additional state used only to force re-renders without changing `count`
  const [tick, setTick] = useState(0);

  // Expensive calculation (simulated with console.log)
  const squared = useMemo(() => {
    console.log("Calculating square (inside memo)...");
    return count * count;
  }, [count]);

  useEffect(() => {
    console.log("Calculating square (no memo)...");
  });

  return (
    <div>
      <p>Count: {count}</p>
      <p>Squared (memoized): {squared}</p>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => setCount((c) => c + 1)}>Increment</button>
        <button onClick={() => setCount((c) => c - 1)}>Decrement</button>
        {/* This button updates `tick` to force a re-render without changing `count` */}
        <button onClick={() => setTick((t) => t + 1)} style={{ marginLeft: 8 }}>
          Force re-render
        </button>
        <span style={{ marginLeft: 8, color: '#666' }}>
          (re-renders: {tick})
        </span>
      </div>
    </div>
  );
}