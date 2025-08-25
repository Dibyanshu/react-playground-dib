import React, { useMemo, useState } from 'react'

const initialUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Carol' },
]

export default function Topic3List() {
  const [users, setUsers] = useState(initialUsers)
  const [nextId, setNextId] = useState(4)
  const [filter, setFilter] = useState('')
  const [useIndexKey, setUseIndexKey] = useState(false)

  const visible = useMemo(() => {
    return users.filter(u => u.name.toLowerCase().includes(filter.toLowerCase()))
  }, [users, filter])

  function addUser(name) {
    const trimmed = (name || '').trim()
    if (!trimmed) return
    setUsers(u => [...u, { id: nextId, name: trimmed }])
    setNextId(n => n + 1)
  }

  function removeUser(id) {
    setUsers(u => u.filter(x => x.id !== id))
  }

  function shuffle() {
    setUsers(u => {
      const a = [...u]
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    })
  }

  return (
    <section className="topic3-list">
      <h4>Dynamic List Rendering — .map(), keys, filter, add/remove</h4>

      <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
        <div style={{flex:1}}>
          <div style={{display:'flex',gap:8,marginBottom:8}}>
            <input placeholder="Filter by name" value={filter} onChange={e => setFilter(e.target.value)} />
            <button onClick={() => { const name = prompt('New user name'); if (name) addUser(name) }}>Add user</button>
            <button onClick={shuffle}>Shuffle</button>
            <label style={{marginLeft:8}}>
              <input type="checkbox" checked={useIndexKey} onChange={e => setUseIndexKey(e.target.checked)} /> use index as key (anti-pattern)
            </label>
          </div>

          <div style={{padding:8,background:'rgba(255,255,255,0.02)',borderRadius:8}}>
            <h5>Rendered list</h5>
            <ul>
              {visible.map((u, idx) => (
                <li key={useIndexKey ? idx : u.id} style={{display:'flex',gap:8,alignItems:'center'}}>
                  <span style={{flex:1}}>{u.name} <small style={{color:'#9aa7c7',marginLeft:6}}>(id: {u.id})</small></span>
                  <button onClick={() => removeUser(u.id)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{width:420}}>
          <h5>Notes & Code</h5>
          <p style={{marginTop:0}}>Use <code>.map()</code> to transform arrays into elements. Always supply a stable <code>key</code> (prefer an id). Using array index as key can cause subtle bugs when order changes.</p>
          <pre style={{background:'#0b1220',color:'#dbeafe',padding:12,borderRadius:6,overflow:'auto'}}>
{`// map example
users.map(u => (
  <li key={u.id}>{u.name}</li>
))

// Avoid using index as key when items can be reordered or removed
`}
          </pre>
        </div>
      </div>
    </section>
  )
}
