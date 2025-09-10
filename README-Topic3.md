# Topic 3: JSX - JavaScript XML

## Basic "Syntax"

### JSX looks like HTML but with the full power of JavaScript available inside curly braces {}.


```Jsx
// 1. A basic JSX element assigned to a variable
const greeting = <h1>Hello, React Developer!</h1>;

// 2. A function component that returns JSX
function UserGreeting() {
  // 3. Embedding a JavaScript variable expression with {}
  const userName = "Alice";
  
  return (
    <div>
      <h2>Welcome back, {userName}!</h2>
      {/* You can also embed expressions directly */}
      <p>The current year is {new Date().getFullYear()}.</p>
    </div>
  );
}

```

> **Key Rules:** 
> - Single Root Element: A component must return a single "parent" element. Use a <div> or a Fragment (<>...</>) to wrap your elements.
> - CamelCase Attributes: HTML attributes like class and for become className and htmlFor in JSX.
> - Tags Must Be Closed: Every tag, including self-closing tags, must be closed (e.g., ```<img />, <br />```).
 

## Complex Example

### This example shows a ProductCard component that uses props, conditional logic, dynamic attributes, and event handlers all within JSX.

[Link](src/topics/topic-3/Topic3Complex.jsx)

```Jsx
function ProductCard({ product, onAddToCart }) {
  // Logic to determine CSS classes and text
  const isAvailable = product.stock > 0;
  const stockClass = isAvailable ? 'in-stock' : 'out-of-stock';
  const hasDiscount = product.originalPrice > product.salePrice;

  return (
    // 1. Dynamic className using an embedded expression
    <div className={`card ${stockClass}`}>
      <img src={product.imageUrl} alt={product.name} />
      
      <div className="card-body">
        <h3>{product.name}</h3>

        {/* 2. Conditional rendering with the ternary operator */}
        {hasDiscount ? (
          <p className="price">
            <span className="original">${product.originalPrice}</span>
            <span className="sale">${product.salePrice}</span>
          </p>
        ) : (
          <p className="price">${product.salePrice}</p>
        )}

        {/* 3. Conditional rendering with && operator */}
        {!isAvailable && <p className="notice">Currently Unavailable</p>}

        {/* 4. Dynamic attributes (disabled) and event handlers */}
        <button 
          onClick={() => onAddToCart(product.id)}
          disabled={!isAvailable}
        >
          {isAvailable ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

```
## Use Cases
### 1. Dynamic List Rendering

Using the .map() array method to transform data into a list of components. This is fundamental for rendering things like news feeds, product grids, or comment threads.

```Jsx
<ul>
  {users.map(user => (
    <li key={user.id}>{user.name}</li>
  ))}
</ul>
```

### 2. Conditional UI Display

Showing or hiding entire sections of the UI based on application state (e.g., user authentication, loading status, or form validation).

```Jsx
function Dashboard({ isLoading, data }) {
  if (isLoading) {
    return <Spinner />;
  }
  return <UserProfile data={data} />;
}
```

### 3. Configurable Component Creation

Building reusable components like a `<Button>` where props control appearance and behavior (color, size, disabled state, handlers).

```Jsx
function Button({ variant = 'primary', size = 'md', disabled = false, onClick, children }) {
  const classes = `btn btn-${variant} btn-${size} ${disabled ? 'is-disabled' : ''}`.trim();
  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
```

### 4. Form Handling & Controlled Components

Controlled components keep form state in React, making validation and conditional UI straightforward.

```Jsx
function LoginForm({ onSubmit }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit" disabled={!email || !password}>Sign In</button>
    </form>
  );
}
```

### 5. Using React specific API e.g. React.memo

A minimal example showing how React.memo avoids re-rendering a child when unrelated parent state changes:

```Jsx
const Child = React.memo(function Child({ value }) {
  console.log('Child render');
  return <div>Child value: {value}</div>;
});

function Parent() {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState('hello');

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>Increment: {count}</button>
      <input value={text} onChange={e => setText(e.target.value)} />
      {/* Child only re-renders when `text` changes, not when `count` changes */}
      <Child value={text} />
    </div>
  );
}
```

- Use React.memo for pure presentational components.
- Use useCallback/useMemo to keep prop references stable.
- Use virtualization (react-window, react-virtualized) when lists are very large.

