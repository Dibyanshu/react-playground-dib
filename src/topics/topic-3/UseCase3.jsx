import React from 'react'

// A small, reusable Button component that demonstrates configurable props
function ConfigurableButton({ variant = 'primary', size = 'md', disabled = false, onClick, children }) {
  const base = {
    border: 'none',
    borderRadius: 6,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.65 : 1,
    transition: 'transform 120ms ease, box-shadow 120ms ease',
  }

  const variants = {
    primary: { background: '#0b5cff', color: '#fff', boxShadow: '0 6px 12px rgba(11,92,255,0.12)' },
    secondary: { background: '#e5e7eb', color: '#111827', boxShadow: '0 6px 12px rgba(0,0,0,0.06)' },
    danger: { background: '#ef4444', color: '#fff', boxShadow: '0 6px 12px rgba(239,68,68,0.12)' },
  }

  const sizes = {
    sm: { padding: '6px 10px', fontSize: 13 },
    md: { padding: '9px 14px', fontSize: 15 },
    lg: { padding: '12px 18px', fontSize: 17 },
  }

  const style = Object.assign({}, base, variants[variant] || variants.primary, sizes[size] || sizes.md)

  return (
    <button
      style={style}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'translateY(1px)')}
      onMouseUp={e => !disabled && (e.currentTarget.style.transform = 'translateY(0)')}
    >
      {children}
    </button>
  )
}

export default function UseCase3() {
  const [variant, setVariant] = React.useState('primary')
  const [size, setSize] = React.useState('md')
  const [disabled, setDisabled] = React.useState(false)
  const [label, setLabel] = React.useState('Click me')
  const [count, setCount] = React.useState(0)

  const snippet = `// Usage example
<Button variant="${variant}" size="${size}" ${disabled ? 'disabled' : ''}>${label}</Button>`

  return (
    <div style={{ padding: 18, maxWidth: 820 }}>
      <h3 style={{ marginTop: 0 }}>Configurable Component Creation</h3>

      <p style={{ color: 'var(--muted, #555)' }}>
        This demo shows a small configurable <code>Button</code> component. Change the controls
        to see different variants, sizes, and disabled states in action.
      </p>

      <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 13 }}>Variant</label>
          <select value={variant} onChange={e => setVariant(e.target.value)}>
            <option value="primary">primary</option>
            <option value="secondary">secondary</option>
            <option value="danger">danger</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <label style={{ fontSize: 13 }}>Size</label>
          <select value={size} onChange={e => setSize(e.target.value)}>
            <option value="sm">sm</option>
            <option value="md">md</option>
            <option value="lg">lg</option>
          </select>
        </div>

        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
          disabled
        </label>

        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 13 }}>Label</span>
          <input value={label} onChange={e => setLabel(e.target.value)} style={{ padding: '6px 8px' }} />
        </label>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
        <ConfigurableButton
          variant={variant}
          size={size}
          disabled={disabled}
          onClick={() => setCount(c => c + 1)}
        >
          {label}
        </ConfigurableButton>

        <div style={{ color: 'var(--muted, #666)' }}>Clicked: <strong>{count}</strong></div>
      </div>

      <details style={{ marginBottom: 14 }}>
        <summary style={{ cursor: 'pointer' }}>Show usage snippet</summary>
        <pre style={{ background: '#0f172a08', padding: 12, borderRadius: 6, overflowX: 'auto' }}>{snippet}</pre>
      </details>

      <hr />

      <h4>Design notes</h4>
      <ul>
        <li>Keep component API small and predictable: variant, size, disabled, onClick.</li>
        <li>Favor predictable defaults so the component is ergonomic to use.</li>
        <li>Expose appearance via props and avoid coupling to global styles where possible.</li>
      </ul>
    </div>
  )
}
