# Topic 11: Routing (React Router)

## Basic Syntax

This is the foundational setup for a single-page application using `react-router-dom`.

```Jsx
// In your main.jsx or index.js
import { BrowserRouter } from 'react-router-dom'

// Wrap your entire app in BrowserRouter to enable routing
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

// In your App.jsx
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  return (
    <div>
      <nav>
        {/* Use <Link> instead of <a> for client-side routing */}
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>

      {/* The <Routes> component matches the first matching route */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        {/* A wildcard route for 404 pages */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
```

## Complex Example (Nested, Parameterized, and Restricted Routes)

This example shows an admin dashboard with nested routes, dynamic user IDs, programmatic navigation, and a protected route for admins only.

```Jsx
import { Routes, Route, Link, Outlet, useParams, useNavigate, Navigate } from 'react-router-dom'

// A component for protecting routes – redirects non-admins to /login
function RestrictedRoute({ user }) {
  if (user?.role !== 'admin') {
    return <Navigate to="/login" replace />
  }
  // Outlet renders nested routes when authorized
  return <Outlet />
}

// A layout for the admin panel
function AdminLayout() {
  return (
    <div>
      <h2>Admin Panel</h2>
      <nav>
        <Link to="dashboard">Dashboard</Link> | <Link to="users">Users</Link>
      </nav>
      <hr />
      <Outlet /> {/* Renders nested content */}
    </div>
  )
}

// A component that reads a URL parameter and demonstrates programmatic navigation
function UserProfile() {
  const { userId } = useParams()
  const navigate = useNavigate()

  const goToDashboard = () => navigate('/admin/dashboard')

  return (
    <div>
      <h3>Profile for User ID: {userId}</h3>
      <button onClick={goToDashboard}>Back to Dashboard</button>
    </div>
  )
}

function App() {
  const currentUser = { name: 'Admin User', role: 'admin' } // or { role: 'guest' }

  return (
    <Routes>
      <Route path="/" element={<h1>Home Page</h1>} />
      <Route path="/login" element={<h1>Login Page</h1>} />

      {/* Restricted Route Configuration */}
      <Route element={<RestrictedRoute user={currentUser} />}>
        {/* Nested routes render inside AdminLayout's <Outlet> */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<h2>Dashboard Home</h2>} />
          <Route path="users" element={<h2>User Management List</h2>} />
          {/* Route with a URL parameter */}
          <Route path="users/:userId" element={<UserProfile />} />
        </Route>
      </Route>

      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  )
}
```

## Use Cases

1. Client-side navigation: Use `<Link>` and `<Route>` to build fast, SPA-style navigation without full page reloads.
2. Dynamic routes & params: Build user pages or product pages using `:id` parameters and `useParams()`.
3. Protected routes & programmatic navigation: Restrict access (e.g., admin areas) and navigate via `useNavigate()`.
4. Nested layouts: Compose UI with parent layout components that render child routes through `<Outlet>`.
