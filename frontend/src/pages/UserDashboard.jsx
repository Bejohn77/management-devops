import { useEffect, useState } from 'react';
import { getCurrentUser } from '../api';

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('Loading your dashboard...');

  useEffect(() => {
    getCurrentUser()
      .then((response) => {
        setProfile(response.data.user);
        setMessage(`Welcome to your dashboard, ${response.data.user.name}!`);
      })
      .catch(() => {
        setMessage('Unable to load your profile. Please refresh.');
      });
  }, []);

  return (
    <section className="card">
      <h1 className="page-heading">User Dashboard</h1>
      <p className="page-lead">A clean overview for standard users. Learn about your account and recent adoption metrics.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{profile?.name || 'Guest'}</h3>
          <p>Your name on file.</p>
        </div>

        <div className="stat-card">
          <h3>{profile?.email || '---'}</h3>
          <p>Primary login email for your user account.</p>
        </div>

        <div className="stat-card">
          <h3>{profile?.role?.toUpperCase() || 'USER'}</h3>
          <p>Current access level.</p>
        </div>
      </div>

      <div style={{ marginTop: '28px', color: '#cbd5e1' }}>{message}</div>
    </section>
  );
};

export default UserDashboard;
