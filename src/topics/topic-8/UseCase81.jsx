import React, { useEffect, useState } from 'react';
import './UseCase81.css';

// Child 1: Displays basic profile information
function ProfileHeader({ user }) {
  if (!user) return null;
  return (
    <header className="uc81-profile-header">
      <h2>{user.name}</h2>
      <p className="uc81-profile-email">{user.email}</p>
    </header>
  );
}

// Child 2: Displays a list of posts authored by the user
function PostList({ posts }) {
  if (!posts) return null;
  if (posts.length === 0) return <p>No posts found for this user.</p>;
  return (
    <ul className="uc81-post-list">
      {posts.map(post => (
        <li key={post.id} className="uc81-post-item">
          <strong>{post.title}</strong>
          <div className="uc81-post-body">{post.body}</div>
        </li>
      ))}
    </ul>
  );
}

// Parent: Fetches user data and passes it down to ProfileHeader and PostList
export default function UseCase81() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // For this example we'll fetch a single user and their posts from JSONPlaceholder
    const userId = 1;
    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(r => r.json()),
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`).then(r => r.json()),
    ])
      .then(([userData, postsData]) => {
        setUser(userData);
        setPosts(postsData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load user data.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading user...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div className="uc81-container">
      {/* Parent-to-Child: pass `user` down to header, `posts` down to list */}
      <ProfileHeader user={user} />

      <section className="uc81-section">
        <h3>Posts by {user.name}</h3>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
