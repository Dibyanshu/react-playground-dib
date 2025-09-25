import React, { createContext, useContext, useState } from 'react'

// Create a ThemeContext with a default value
const ThemeContext = createContext({ theme: 'light', toggleTheme: () => {} })

// Provider component that holds the theme state and exposes a toggle
function ThemeProvider({ children }) {
	const [theme, setTheme] = useState('light')
	const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

// A header component that consumes theme from context
function Header() {
	const { theme, toggleTheme } = useContext(ThemeContext)
	const style = {
		padding: 12,
		background: theme === 'light' ? '#f5f5f5' : '#222',
		color: theme === 'light' ? '#111' : '#fff',
		borderRadius: 6,
	}

	return (
		<div style={style}>
			<h3 style={{ margin: 0 }}>Theme: {theme}</h3>
			<button onClick={toggleTheme} style={{ marginTop: 8 }}>
				Toggle Theme
			</button>
		</div>
	)
}

// A nested child component that also reads from the same context
function Footer() {
	const { theme } = useContext(ThemeContext)
	return (
		<div style={{ marginTop: 12, color: theme === 'light' ? '#333' : '#ddd' }}>
			This footer reads the theme from Context too.
		</div>
	)
}

// Example usage: ThemeProvider at top, children consume via useContext
export default function ContextAPIExample() {
	return (
		<ThemeProvider>
			<div style={{ maxWidth: 640, margin: '0 auto' }}>
				<Header />
				<main style={{ marginTop: 12 }}>
					<p>
						The ThemeProvider places theme state in Context. Any component inside the provider
						tree can read or update it using the same context object.
					</p>
					<Footer />
				</main>
			</div>
		</ThemeProvider>
	)
}

