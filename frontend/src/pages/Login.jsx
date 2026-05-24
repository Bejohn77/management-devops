import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, saveToken, saveProfile } from '../api';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const { token, user } = response.data;
      saveToken(token);
      saveProfile(user);
      onLogin && onLogin(user);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h1 className="page-heading">Welcome Back</h1>
      <p className="page-lead">Sign in to access your management dashboard. Use the seeded accounts for quick testing.</p>

      <form className="grid" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@management.com"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin123!"
            required
          />
        </div>

        {error && <div className="alert">{error}</div>}

        <button className="primary" type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p style={{ marginTop: '18px', color: '#94a3b8' }}>
        New here? <Link to="/signup">Create an account</Link>
      </p>
    </section>
  );
};

export default Login;
