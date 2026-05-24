import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './pages/ProtectedRoute';
import { getToken, logout, getProfileFromStorage } from './api';

function App() {
  const [profile, setProfile] = useState(getProfileFromStorage());
  const navigate = useNavigate();

  useEffect(() => {
    setProfile(getProfileFromStorage());
  }, []);

  const handleLogout = () => {
    logout();
    setProfile(null);
    navigate('/');
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">Management System</div>
        <nav className="nav-links">
          {profile ? (
            <>
              <span className="role-chip">{profile.role.toUpperCase()}</span>
              <button className="ghost-button" onClick={handleLogout}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link className="ghost-button" to="/">
                Login
              </Link>
              <Link className="ghost-button" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Login onLogin={setProfile} />} />
          <Route path="/signup" element={<Signup onRegister={setProfile} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Login onLogin={setProfile} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
