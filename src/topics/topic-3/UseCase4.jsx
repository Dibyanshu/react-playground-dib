import React from 'react'

// Controlled LoginForm demo that follows the README example and shows form handling patterns
export default function UseCase4() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [remember, setRemember] = React.useState(false)
  const [errors, setErrors] = React.useState({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [result, setResult] = React.useState(null)

  function validate() {
    const e = {}
    if (!email) e.email = 'Email is required'
    // simple email-ish check
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email'

    if (!password) e.password = 'Password is required'
    else if (password.length < 6) e.password = 'Password must be at least 6 characters'

    return e
  }

  async function handleSubmit(evt) {
    evt.preventDefault()
    setResult(null)
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return // early-return on validation fail

    setIsSubmitting(true)
    // simulate async submit
    await new Promise(r => setTimeout(r, 650))
    setIsSubmitting(false)
    setResult({ ok: true, email, remember })
    // Clear password for safety while keeping email for convenience
    setPassword('')
  }

  return (
    <div style={{ padding: 18, maxWidth: 640 }}>
      <h3 style={{ marginTop: 0 }}>Form Handling & Controlled Components</h3>

      <p style={{ color: 'var(--muted, #555)' }}>
        This example demonstrates a controlled login form: inputs bound to state, inline validation,
        disabled submit during async requests, and an early-return validation pattern.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 10 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 13 }}>Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ padding: '8px 10px' }}
          />
          {errors.email && <small style={{ color: '#b91c1c' }}>{errors.email}</small>}
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ fontSize: 13 }}>Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ padding: '8px 10px' }}
          />
          {errors.password && <small style={{ color: '#b91c1c' }}>{errors.password}</small>}
        </label>

        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} />
          <span style={{ fontSize: 13 }}>Remember me</span>
        </label>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{ padding: '8px 12px' }}
          >
            {isSubmitting ? 'Signing in…' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={() => {
              // demonstrate controlled reset
              setEmail('')
              setPassword('')
              setErrors({})
              setResult(null)
            }}
            style={{ padding: '8px 12px' }}
          >
            Reset
          </button>
        </div>
      </form>

      {result && (
        <div style={{ marginTop: 12, padding: 10, borderRadius: 6, background: '#ecfeff' }}>
          <strong>Signed in</strong>
          <div style={{ fontSize: 13 }}>Email: {result.email}</div>
          <div style={{ fontSize: 13 }}>Remember: {result.remember ? 'yes' : 'no'}</div>
        </div>
      )}

      <details style={{ marginTop: 12 }}>
        <summary style={{ cursor: 'pointer' }}>Show minimal example</summary>
        <pre style={{ background: '#0f172a08', padding: 12, borderRadius: 6, overflowX: 'auto' }}>
{`function LoginForm({ onSubmit }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Sign In</button>
    </form>
  )
}`}
        </pre>
      </details>

      <hr style={{ marginTop: 14 }} />
      <h4>Notes</h4>
      <ul>
        <li>Controlled inputs keep values in React state for validation and predictable behavior.</li>
        <li>Use early-returns on validation failures to keep submit handlers simple.</li>
        <li>Disable submit while awaiting a network request to avoid duplicate submissions.</li>
      </ul>
    </div>
  )
}
