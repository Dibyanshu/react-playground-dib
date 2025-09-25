import React, { useReducer } from 'react'

// Reducer function for a simple counter
function counterReducer(state, action) {
	switch (action.type) {
		case 'increment':
			return { count: state.count + 1 }
		case 'decrement':
			return { count: state.count - 1 }
		case 'add':
			return { count: state.count + action.payload }
		case 'reset':
			return { count: 0 }
		default:
			return state
	}
}

export default function UseReducerBasic() {
	const [state, dispatch] = useReducer(counterReducer, { count: 0 })

	return (
		<div style={{ maxWidth: 560, margin: '0 auto' }}>
			<h3>useReducer — Basic Counter</h3>
			<p>Count: {state.count}</p>

			<div style={{ display: 'flex', gap: 8 }}>
				<button onClick={() => dispatch({ type: 'decrement' })}>-</button>
				<button onClick={() => dispatch({ type: 'increment' })}>+</button>
				<button onClick={() => dispatch({ type: 'add', payload: 5 })}>+5</button>
				<button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
			</div>

			<section style={{ marginTop: 12 }}>
				<p>
					This example shows how `useReducer` centralizes update logic in a reducer function.
					Actions are dispatched with a `type` (and optional `payload`) and the reducer returns
					the new state. This pattern scales well for more complex state transitions.
				</p>
			</section>
		</div>
	)
}

