import React, { useEffect, useState } from 'react'

function Spinner() {
  return <div style={{padding:20}}>Loading…</div>
}

function UserProfile({ user, onLogout }) {
  return (
    <div style={{padding:12, borderRadius:8, background:'rgba(255,255,255,0.02)'}}>
      <h4 style={{margin:0}}>{user.name}</h4>
      <p style={{margin:'6px 0 0 0'}}>Email: {user.email}</p>
      <div style={{marginTop:8}}>
        <button onClick={onLogout}>Logout</button>
      </div>
    </div>
  )
}

export default function UseCase2() {
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    // simulate initial loading state; then not authenticated
    setIsLoading(true)
    const t = setTimeout(() => setIsLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  function handleLogin(e) {
    e.preventDefault()
    setError('')
    if (!email.includes('@') || password.length < 4) {
      setError('Please enter a valid email and a password with at least 4 characters.')
      return
    }
    // simulate login
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsAuthenticated(true)
      setUser({ id: 1, name: 'Alice', email })
    }, 600)
  }

  function handleLogout() {
    setIsAuthenticated(false)
    setUser(null)
  }

  // Conditional rendering examples: early return vs conditional blocks
  if (isLoading) return (
    <section className="topic3-conditional">
      <h4>Conditional UI — Loading state (early return)</h4>
      <div style={{padding:12}}><Spinner /></div>
    </section>
  )

  return (
    <section className="topic3-conditional">
      <h4>Conditional UI — Authentication & Loading Examples</h4>

      <div style={{display:'grid',gridTemplateColumns:'1fr 480px',gap:16,alignItems:'start'}}>
        <div>
          {/* Auth gating: show login form when not authenticated, profile when authenticated */}
          {!isAuthenticated ? (
            <div style={{padding:12,background:'rgba(255,255,255,0.02)',borderRadius:8}}>
              <h5>Login Form (controlled inputs)</h5>
              {error && <div style={{color:'#f88',marginBottom:8}}>{error}</div>}
              <form onSubmit={handleLogin}>
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                  <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  <div style={{display:'flex',gap:8}}>
                    <button type="submit">Sign In</button>
                    <button type="button" onClick={() => { setEmail('test@example.com'); setPassword('abcd') }}>Fill demo</button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <h5>Protected Content (shown when authenticated)</h5>
              <UserProfile user={user} onLogout={handleLogout} />
            </div>
          )}

          <div style={{marginTop:12}}>
            <h5>Conditional UI patterns</h5>
            <ul>
              <li>Early return for loading/error states (simpler control flow)</li>
              <li>Conditional blocks inside render (ternary, &&) for selective sections</li>
              <li>Controlled components for form inputs to validate before submit</li>
            </ul>
          </div>
        </div>

        <div>
          <h5>Notes & Example</h5>
          <pre style={{background:'#0b1220',color:'#dbeafe',padding:12,borderRadius:6,overflow:'auto'}}>
            {`// Early return for loading
            if (isLoading) return <Spinner />

            // Conditional rendering inside JSX
            {isAuthenticated ? <UserProfile /> : <LoginForm />}
          `}
          </pre>
        </div>
      </div>
    </section>
  )
}
