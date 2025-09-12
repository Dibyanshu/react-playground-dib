import React from 'react'

const codeSnippet = `// 1. A basic JSX element assigned to a variable
const greeting = <h1>Hello, React Developer!</h1>;

// 2. A function component that returns JSX
function UserGreeting() {
  const userName = "Alice";
  return (
    <div>
      <h2>Welcome back, {userName}!</h2>
      <p>The current year is {new Date().getFullYear()}.</p>
    </div>
  );
}`

export default function Topic3Basics() {
  function UserGreeting() {
    const userName = 'Alice'
    return (
      <div>
        <h2>Welcome back, {userName}!</h2>
        <p>The current year is {new Date().getFullYear()}.</p>
      </div>
    )
  }

  return (
    <section className="topic3-basics">
      <h4>Basic JSX — Live example</h4>
      <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
        <div style={{flex:1}}>
          <div style={{padding:12,background:'rgba(255,255,255,0.02)',borderRadius:8}}>
            <h5>Rendered Output</h5>
            <div style={{padding:8}}>
              <h1>Hello, React Developer!</h1>
              <UserGreeting />
            </div>
          </div>
        </div>

        <div style={{width:520}}>
          <h5>JSX Source</h5>
          <pre style={{background:'#0b1220',color:'#dbeafe',padding:12,borderRadius:6,overflow:'auto'}}>
            <code>{codeSnippet}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
