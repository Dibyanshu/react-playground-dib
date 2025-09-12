import React, { useState, useMemo, useCallback } from "react";

// Child component (wrapped with React.memo to prevent unnecessary re-renders)
const Child = React.memo(({ onClick, squared }) => {
  console.log("Child rendered"); // helps us see when Child re-renders
  return (
    <div>
      <p>Squared Value (memoized): {squared}</p>
      <button onClick={onClick}>Click Child Button</button>
    </div>
  );
});

export default function CombinedExample() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // useMemo: memoize an expensive calculation
  const squared = useMemo(() => {
    console.log("Calculating square...");
    return count * count;
  }, [count]); // only re-calculate when count changes

  // useCallback: memoize a function so Child doesn't re-render unnecessarily
  const handleClick = useCallback(() => {
    console.log("Child button clicked!");
  }, []);

  return (
    <div>
      <h2>Parent Component</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment Count</button>
      <button onClick={() => setOther(o => o + 1)}>Increment Other</button>

      <hr />
      <Child onClick={handleClick} squared={squared} />
    </div>
  );
}