# Topic 12: Managing Complex State

## Basic Syntax

This slide shows the "Hello World" of Context and useReducer.

### 1. Context API - Basic Setup

```Jsx
import { createContext, useContext } from 'react';

// Create a context "container"
const ThemeContext = createContext('light');

// The "Provider" component that wraps part of your appfunction App() {
  return (
    <ThemeContext.Provider value="dark">
      <MyComponent />
      
    </ThemeContext.Provider>
  );
}

// The "Consumer" component that reads the context value
function MyComponent() {
  const theme = useContext(ThemeContext); // "dark"
  return <div>The current theme is: {theme}</div>;
}
```

### 2. useReducer - Basic Setup

```JSX
import { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: throw new Error();
  }
};

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
    </>
  );
}

```

## Complex Example (Combining useReducer and Context for a Todo List)

This pattern is a powerful way to manage global state without external libraries. The useReducer handles the complex logic, and Context broadcasts the state and dispatch function to any component that needs it.

```Jsx
import { createContext, useContext, useReducer } from 'react';

// 1. Define the state logic with a reducer
const todosReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );
    case 'REMOVE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    default:
      return state;
  }
};

// 2. Create the Context
const TodosContext = createContext();

// 3. Create the Provider Component
export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(todosReducer, []);
  // The value provides both the state and the function to change it
  return (
    <TodosContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodosContext.Provider>
  );
};

// 4. Create a custom hook for easy consumption
export const useTodos = () => useContext(TodosContext);

// --- How to use it anywhere in the app ---

// In TodoList.jsx
function TodoList() {
  const { todos, dispatch } = useTodos(); // No prop drilling!
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} onClick={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}>
          {todo.text} {todo.completed ? '✅' : ''}
        </li>
      ))}
    </ul>
  );
}

// In App.jsx, wrap the app with the provider
// <TodosProvider><TodoList /></TodosProvider>

```

## Example of Managing State using Zustand

```Jsx
// Minimal Zustand example
// 1) Install: npm install zustand
import create from 'zustand'

// 2) Create a store hook. The store is independent of React components.
const useCounterStore = create((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  decrement: () => set((s) => ({ count: s.count - 1 })),
  add: (n) => set((s) => ({ count: s.count + n })),
  reset: () => set({ count: 0 }),
}))

// 3) Use the store directly inside any component (no Provider required)
function ZustandCounter() {
  const { count, increment, decrement, add, reset } = useCounterStore()

  return (
    <div style={{ maxWidth: 560, margin: '0 auto' }}>
      <h4>Zustand Counter</h4>
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

// 4) Render <ZustandCounter /> anywhere in your app — multiple components
//    can read and update the same store without prop drilling.
```

> Why Zustand?
>
> - Tiny and ergonomic API: the store is just a hook you create once and import where needed.
> - No Provider or boilerplate required for many use-cases (but you can combine with context if desired).
> - Works well for small-to-medium global state needs where Redux would be overkill.

## Custom Hooks and Fetching Data using Axios 
This pattern shows how to encapsulate data fetching and related state (loading, error) in a reusable custom hook using Axios.

```Jsx
// 1) Install: npm install axios
import { useState, useEffect } from 'react'
import axios from 'axios'

// A small reusable hook that fetches data with axios and returns { data, loading, error }
function useAxios(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    axios
      .get(url, options)
      .then(res => {
        if (!cancelled) setData(res.data)
      })
      .catch(err => {
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [url])

  return { data, loading, error }
}

// Example component that consumes the hook
function UsersList() {
  const { data: users, loading, error } = useAxios('https://jsonplaceholder.typicode.com/users')

  if (loading) return <div>Loading users...</div>
  if (error) return <div style={{ color: 'red' }}>Error loading users</div>

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>{u.name} — {u.email}</li>
      ))}
    </ul>
  )
}

// Render <UsersList /> anywhere to show fetched users.
```

> Tips
>
> - Cancel requests on unmount (as shown) to avoid state updates after unmount.


## React Coding Patterns 

React coding patterns are common, reusable ways to solve problems when building with React’s component-based structure. They aren’t official APIs but proven methods for organizing components and logic to make code easier to reuse, maintain, and understand. While modern Hooks now provide cleaner solutions for many cases, knowing the older patterns is still helpful—both for working with legacy projects and for understanding why Hooks were introduced.

> Common Patterns
> 
> •	Container/Presentational: Separates data-fetching and state logic (containers) from UI rendering (presentational).
> 
> •	Higher-Order Component (HOC): A function that takes a component and returns a new component with additional props or logic.
> 
> •	Render Props: A technique for sharing code between components using a prop whose value is a function. The component calls this function to know what to render.
> 

### 1. Container & Presentational Components Pattern

What is it?

Presentational Components → Focus on UI/markup (how things look).

Container Components → Focus on logic & data (how things work).

Together, they separate concerns → UI vs Logic.

```JSX
// Presentational Component (UI only)
function UserList({ users }) {
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

// Container Component (data + logic)
function UserListContainer() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return <UserList users={users} />;
}
```

> Advantages
> 
> Clear separation: UI is dumb (easy to test, reusable), container handles data fetching/logic. Useful when multiple UIs share the same logic.
> 

> Drawbacks
> 
> Adds extra boilerplate (two files/components for one feature).
> With Hooks, this is less common today (Custom Hooks handle logic reusability better).

#### Modern Equivalent

Instead of creating separate containers, now we usually write:

```JSX
function useUsers() {
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);
  return users;
}

function UserList() {
  const users = useUsers();
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

Same separation, but cleaner with Custom Hooks.

### 2. Higher-Order Components (HOCs)

A function that takes a component and returns a new component with extra features.

```JSX
function withLogger(WrappedComponent) {
  return function Enhanced(props) {
    console.log("Props:", props);
    return <WrappedComponent {...props} />;
  };
}

// Usage
const ButtonWithLogger = withLogger(Button);
```

> 
> Used to share logic across multiple components.
> 
> Can lead to “wrapper hell” if nested too much.
> 

### 3. Render Props

A component that takes a function as a prop and uses it to decide what to render.

```JSX
function MouseTracker({ children }) {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  return (
    <div onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY })}>
      {children(pos)}
    </div>
  );
}

// Usage
<MouseTracker>
  {({ x, y }) => <p>Mouse at {x}, {y}</p>}
</MouseTracker>
```

> 
> Flexible way to share stateful logic.
> 
> Can make JSX harder to read.
>