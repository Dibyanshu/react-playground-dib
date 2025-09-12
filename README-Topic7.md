# Topic 7: State and Effects (React Hooks)

## Basic Syntax

This example demonstrates the core syntax for `useState` and `useEffect`.

```Jsx
import { useState, useEffect } from 'react'

function DocumentTitleChanger() {
  // useState: declares a state variable `count` and an updater `setCount`.
  const [count, setCount] = useState(0)

  // useEffect: runs a side effect when `count` changes.
  useEffect(() => {
    document.title = `You clicked ${count} times`
  }, [count])

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Click me to update title (Count: {count})
    </button>
  )
}
```

> Key Rules of Hooks
>
> - Only call Hooks at the top level (don’t call them inside loops, conditions, or nested functions).
> - Only call Hooks from React function components or custom Hooks.

## Complex Example — Combining Hooks for Performance

This component fetches a list of users, allows filtering, and uses `useMemo` to avoid a costly calculation on every render. It also uses `useRef` to focus the input on mount.

```Jsx
import { useState, useEffect, useMemo, useRef } from 'react'

// Imagine this is a slow, computationally expensive function
const findLongestName = (users) => {
  console.log('Calculating longest name...')
  if (!users || users.length === 0) return ''
  return users.reduce((longest, user) =>
    user.name.length > longest.length ? user.name : longest,
    ''
  )
}

function UserSearch() {
  const [users, setUsers] = useState([])
  const [filter, setFilter] = useState('')
  const inputRef = useRef(null)

  // Data fetching (runs once on mount for this example)
  useEffect(() => {
    // Simulating an API call
    fetch('https://api.example.com/users')
      .then(res => res.json())
      .then(data => setUsers(data))

    // Focus the input element when the component mounts
    if (inputRef.current) inputRef.current.focus()
  }, [])

  // useMemo to optimize a heavy calculation: recomputes only when `users` changes
  const longestName = useMemo(() => findLongestName(users), [users])

  const filteredUsers = users.filter(u => u.name.includes(filter))

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter users..."
      />
      <p>The longest name in the list is: {longestName}</p>
      <ul>
        {filteredUsers.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  )
}
```

## Use Cases

1. [useState / useEffect](src/topics/topic-7/UseCase71.jsx): Building a search component that fetches data from an API. `useState` holds the search query, loading status, and results. `useEffect` triggers the API call when dependencies change.
2. [useRef](src/topics/topic-7/UseCase72.jsx): Directly access DOM elements (e.g., a `<video>` element) to call imperative methods like `.play()`/`.pause()` without causing re-renders.
3. [useMemo](src/topics/topic-7/UseCase73.jsx): Optimize expensive calculations (e.g., transforming large datasets for charts). `useMemo` re-computes only when its inputs change, preventing unnecessary work.

## Simpler examples of useMemo & useCallback

### useMemo Example (Memoizing a Value)
```Jsx
import React, { useState, useMemo } from "react";

export default function UseMemoExample() {
  const [count, setCount] = useState(0);

  // Expensive calculation (simulated with console.log)
  const squared = useMemo(() => {
    console.log("Calculating square...");
    return count * count;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Squared (memoized): {squared}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      <button onClick={() => setCount(c => c - 1)}>Decrement</button>
    </div>
  );
}
```
> 
> - The calculation (count * count) only runs when count changes, not on every re-render.

### useCallback Example (Memoizing a Function)

```Jsx
import React, { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Me</button>;
});

export default function UseCallbackExample() {
  const [count, setCount] = useState(0);

  // Function will not be recreated unless count changes
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  return (
    <div>
      <p>Parent Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment Parent</button>
      <Child onClick={handleClick} />
    </div>
  );
}
```
> 
> - The Child component won’t re-render unnecessarily because handleClick stays the same function reference across renders.

### Combined Example: useMemo + useCallback

```Jsx
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

  // ✅ useMemo: memoize an expensive calculation
  const squared = useMemo(() => {
    console.log("Calculating square...");
    return count * count;
  }, [count]); // only re-calculate when count changes

  // ✅ useCallback: memoize a function so Child doesn't re-render unnecessarily
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
```

> - What Happens Here?
>   - useMemo
>     - squared = count * count
>     - Only recalculates when count changes.
>     - Clicking "Increment Other" does not re-run squared.
>   - useCallback
>     - handleClick is memoized (same function reference across renders).
>     - Child won’t re-render just because the parent re-rendered.
>     - Without useCallback, Child would re-render every time.
>   - Combined
>     - Clicking Increment Count → updates count → recalculates squared → Child re-renders.
>     - Clicking Increment Other → only parent re-renders; Child does not (thanks to useMemo + useCallback).

This is the classic scenario where both hooks shine:
useMemo prevents unnecessary calculations.
useCallback prevents unnecessary child re-renders due to new function props.