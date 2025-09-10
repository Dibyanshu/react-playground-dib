# Topic 8: Component Communication Patterns

## Based on Data and Event Passing between components

> Three types
>
> - Parent-to-Child ~ Data is passed down from a parent component to its children via props
> - Child-to-Parent ~ A parent component defines a callback function and passes it down to a child as a prop
> - Prop drilling ~ An anti-pattern where props are passed down through multiple intermediary components that do not need the data themselves, just to get it to a deeply nested child

---

### Basic Syntax

This example shows both communication patterns in a simple scenario.

```jsx
// Child Component that receives data and a callback
function ChildButton({ message, onButtonClick }) {
  // `message` is data from the parent (props)
  // `onButtonClick` is a function from the parent (callback)
  return (
    <button onClick={onButtonClick}>
      Click Me to say: "{message}"
    </button>
  );
}

// Parent Component that manages state and defines the callback
function Parent() {
  const [clickMessage, setClickMessage] = useState('No clicks yet.');

  // This function will be passed down to the child
  const handleChildClick = () => {
    // The child's action updates the parent's state
    setClickMessage('The child button was clicked!');
  };

  return (
    <div>
      <p>Status: {clickMessage}</p>
      {/* 
        Parent-to-Child: Passing `message` prop down.
        Child-to-Parent: Passing `handleChildClick` callback down.
      */}
      <ChildButton
        message="Hello from Parent"
        onButtonClick={handleChildClick}
      />
    </div>
  );
}
```

---

### Complex Example (Lifting State Up & Prop Drilling)

Here, a `FilterableProductList` needs to get filter text from a `SearchBar` component to filter a `ProductList`. The state must be "lifted up" to their nearest common ancestor.

```jsx
import { useState } from 'react';

// Grandchild: Dumb component, just displays data
function ProductList({ products }) {
  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}

// Child 1: Needs to report filter text changes up
function SearchBar({ onFilterTextChange }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      onChange={e => onFilterTextChange(e.target.value)}
    />
  );
}

// Parent: "Lifts state up" to manage it for both children
function FilterableProductList({ allProducts }) {
  // State and filtering logic live in the common parent.
  const [filterText, setFilterText] = useState('');

  const filteredProducts = allProducts.filter(p =>
    p.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div>
      {/* `setFilterText` is passed down as a callback */}
      <SearchBar onFilterTextChange={setFilterText} />
      
      {/* `filteredProducts` is passed down as a prop */}
      <ProductList products={filteredProducts} />
    </div>
  );
}
```

> **Prop Drilling Issue:**  
> If `SearchBar` and `ProductList` were nested many levels deep, `filterText` and `setFilterText` would have to be passed through all the intermediary components, even if they don't use them. This is where solutions like the Context API become necessary.

---

### Use Cases

1. **Parent-to-Child (Props):** Displaying user data. A `<UserPage>` component fetches user information and passes the user object down to child components like `<ProfileHeader user={user}>`, `<PostList user={user}>`, etc.
2. **Child-to-Parent (Callbacks / Lifting State Up):** Handling forms. A `<Form>` parent component holds the overall form state. It passes down value props and `onChange` callback functions to individual `<Input>` child components. When an input changes, it calls the parent's function to update the central state.
3. **Solving Prop Drilling (Context API / State Management):** Sharing global data like the current theme (`'dark'` or `'light'`) or authenticated user information. Instead of drilling these props through every component, they are placed in a central "Context" that any component in the tree can subscribe to directly.
