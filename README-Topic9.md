Basic Syntax (Controlled Component)
This is the most common pattern for handling forms in React. The input's value is always in sync with the component's state.
codeJsx
import { useState } from 'react';

function NameForm() {
  // 1. A piece of state is the "single source of truth" for the input.
  const [name, setName] = useState('');

  const handleChange = (event) => {
    // 3. The `onChange` handler updates the state with the new value.
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`A name was submitted: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        // 2. The input's value is explicitly set from the state.
        value={name}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

10.4. Complex Example (Multi-Input Form with Validation)
This example manages the state for multiple inputs in a single state object and performs basic validation on submission.
codeJsx
import { useState } from 'react';

const initialFormState = {  
  username: '',
  email: '',
  password: '',
};

function SignUpForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // A single handler to manage all input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Basic validation logic
  const validate = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = "Username is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid.";
    if (formData.password.length < 8) tempErrors.password = "Password must be at least 8 characters.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form is valid! Submitting:', formData);
      // Submit data to an API...
      setFormData(initialFormState); // Reset form
    } else {
      console.log('Form has errors.');
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>Username</label>
        <input name="username" value={formData.username} onChange={handleChange} />
        {errors.username && <p className="error">{errors.username}</p>}
      </div>
      <div>
        <label>Email</label>
        <input name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}
