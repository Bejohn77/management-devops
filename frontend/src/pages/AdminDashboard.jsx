import { useEffect, useState } from 'react';
import { getCurrentUser, getAdminStats } from '../api';

const AdminDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState({ totalUsers: 0, totalAdmins: 0 });
  const [message, setMessage] = useState('Loading admin metrics...');

  useEffect(() => {
    getCurrentUser().then((response) => {
      setProfile(response.data.user);
    });

    getAdminStats()
      .then((response) => {
        setStats(response.data);
        setMessage('Admin summary loaded.');
      })
      .catch(() => {
        setMessage('Unable to load admin data.');
      });
  }, []);

  return (
    <section className="card">
      <h1 className="page-heading">Admin Dashboard</h1>
      <p className="page-lead">Manage the system and review user insights. Admin access gives full visibility.</p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{profile?.name || 'Admin'}</h3>
          <p>Signed in as admin.</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalUsers}</h3>
          <p>Total registered users.</p>
        </div>
        <div className="stat-card">
          <h3>{stats.totalAdmins}</h3>
          <p>Admins with access privileges.</p>
        </div>
      </div>

      <div style={{ marginTop: '28px', color: '#cbd5e1' }}>{message}</div>
    </section>
  );
};

export default AdminDashboard;
