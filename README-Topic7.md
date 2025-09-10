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
2. useRef: Directly access DOM elements (e.g., a `<video>` element) to call imperative methods like `.play()`/`.pause()` without causing re-renders.
3. useMemo: Optimize expensive calculations (e.g., transforming large datasets for charts). `useMemo` re-computes only when its inputs change, preventing unnecessary work.

