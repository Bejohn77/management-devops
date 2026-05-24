import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, saveToken, saveProfile } from '../api';

const Signup = ({ onRegister }) => {
  const [name, setName] = useState('');
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
      const response = await registerUser({ name, email, password });
      const { token, user } = response.data;
      saveToken(token);
      saveProfile(user);
      onRegister && onRegister(user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h1 className="page-heading">Create Your Account</h1>
      <p className="page-lead">Sign up as a new user and start using the management system immediately.</p>

      <form className="grid" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
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
            placeholder="Choose a strong password"
            required
          />
        </div>

        {error && <div className="alert">{error}</div>}

        <button className="primary" type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>
    </section>
  );
};

export default Signup;
