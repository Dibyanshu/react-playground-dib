
## Debouncing

  Debouncing delays execution until the events stop firing for a specified time. If the event happens again before the delay ends, the timer resets.

  ### Example — Search input (no debounce)

  ```Jsx
  import React, { useState } from 'react'

  function Search() {
    const [query, setQuery] = useState('')

    const handleChange = (e) => {
      setQuery(e.target.value)
      console.log('API call for:', e.target.value)
    }

    return <input type="text" value={query} onChange={handleChange} placeholder="Search..." />
  }

  export default Search
  ```

  Problem: this triggers on every keystroke and may cause excessive renders or API calls.

  ### Debounced version (lodash)

  ```Jsx
  import React, { useState, useMemo } from 'react'
  import debounce from 'lodash.debounce'

  function Search() {
    const [query, setQuery] = useState('')

    const debouncedSearch = useMemo(
      () => debounce((value) => {
        console.log('API call for:', value)
      }, 500),
      []
    )

    const handleChange = (e) => {
      setQuery(e.target.value)
      debouncedSearch(e.target.value)
    }

    return <input type="text" value={query} onChange={handleChange} placeholder="Search..." />
  }

  export default Search
  ```

  ### Custom debounce (plain JS)

  ```js
  function debounce(fn, delay) {
    let timer
    return function (...args) {
      clearTimeout(timer)
      timer = setTimeout(() => fn(...args), delay)
    }
  }
  ```

  Common use cases

  - Search inputs (avoid spamming API calls)
  - Form validation while typing
  - Resize events (apply layout changes after user finishes resizing)
  - Preventing double-clicks / accidental multiple submissions

  ---

## Throttling

  Throttling ensures a function runs at most once every X milliseconds, regardless of how many times the event fires.

  ### Example — Scroll handler (no throttling)

  ```Jsx
  import React, { useEffect } from 'react'

  function App() {
    useEffect(() => {
      const handleScroll = () => {
        console.log('Scroll position:', window.scrollY)
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return <div style={{ height: '200vh' }}>Scroll down!</div>
  }

  export default App
  ```

  Problem: `handleScroll` may run many times per second and can cause jitter.

  ### Throttled version (lodash)

  ```Jsx
  import React, { useEffect } from 'react'
  import throttle from 'lodash.throttle'

  function App() {
    useEffect(() => {
      const handleScroll = throttle(() => {
        console.log('Throttled scroll:', window.scrollY)
      }, 500)

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return <div style={{ height: '200vh' }}>Scroll down!</div>
  }

  export default App
  ```

  ### Custom throttle (plain JS)

  ```js
  function throttle(fn, delay) {
    let lastCall = 0
    return function (...args) {
      const now = Date.now()
      if (now - lastCall >= delay) {
        lastCall = now
        fn(...args)
      }
    }
  }
  ```

  Common use cases

  - Scroll events (infinite scroll, sticky headers)
  - Resize events
  - Mousemove/drag handlers
  - Rate-limiting analytics or telemetry pings

  ---

## Quick Recap

  - Throttle: run at most once per interval (good for frequent events where you still need periodic updates).
  - Debounce: run after a pause of inactivity (good for waiting until the user finishes an action).

  ---

## When to choose which

  - Use throttling when you need constant, periodic updates (e.g., updating a scroll progress indicator).
  - Use debouncing when you need the final result after a burst of activity (e.g., final search query).

  ---

