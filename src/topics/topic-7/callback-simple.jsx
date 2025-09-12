import React, { useState, useCallback } from "react";

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Click Me</button>;
});

// function Child({ onClick }) {
//   console.log("Child rendered");
//   return <button onClick={onClick}>Click Me</button>;
// }

export default function UseCallbackExample() {
  const [count, setCount] = useState(0);

  // Function will not be recreated unless count changes
  const handleClick = useCallback(() => {
    console.log("Button clicked!");
  }, []);

  return (
    <div>
      <p>Parent Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment Parent</button>
      <Child onClick={handleClick} />
    </div>
  );
}