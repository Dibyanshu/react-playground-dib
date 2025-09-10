import React, { useState } from 'react';
import './UseCase82.css';

// Child input component: controlled input receives value + onChange from parent
function InputField({ label, name, value, onChange }) {
  return (
    <div className="uc82-field">
      <label className="uc82-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={e => onChange(name, e.target.value)}
        className="uc82-input"
      />
    </div>
  );
}

// Parent Form: holds state for both inputs and handles submit
export default function UseCase82() {
  const [form, setForm] = useState({ firstName: '', lastName: '' });
  const [submitted, setSubmitted] = useState(null);

  // This callback will be passed down to each InputField
  const handleFieldChange = (fieldName, fieldValue) => {
    setForm(prev => ({ ...prev, [fieldName]: fieldValue }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted({ ...form });
  };

  return (
    <div className="uc82-container">
      <h3>Contact Form (lifting state up)</h3>

      <form onSubmit={handleSubmit}>
        {/* Pass current values and the parent's onChange handler */}
        <InputField
          label="First name"
          name="firstName"
          value={form.firstName}
          onChange={handleFieldChange}
        />

        <InputField
          label="Last name"
          name="lastName"
          value={form.lastName}
          onChange={handleFieldChange}
        />

        <button type="submit" className="uc82-submit">
          Submit
        </button>
      </form>

      <section className="uc82-section">
        <h4>Live preview</h4>
        <p>
          <strong>First:</strong> {form.firstName || '(empty)'}
        </p>
        <p>
          <strong>Last:</strong> {form.lastName || '(empty)'}
        </p>
      </section>

      {submitted && (
        <section className="uc82-submitted">
          <h4>Submitted data</h4>
          <pre className="uc82-pre">{JSON.stringify(submitted, null, 2)}</pre>
        </section>
      )}
    </div>
  );
}
