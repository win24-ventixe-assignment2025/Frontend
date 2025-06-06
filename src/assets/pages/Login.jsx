import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('https://ventixe-authservice2025-dpdvc0dcfvgnfwa7.swedencentral-01.azurewebsites.net/api/Auth/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        console.error('Failed to Login');
        return;
      }

      const data = await res.json();
      const decoded = jwtDecode(data.accessToken);
      const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

      //Använder jwt decode för att ta emot json stringen jag skickar iväg och decodar min token för att identifiera min token för mina auth headers och role för att se om jag är admin eller user. tog hjälp här men jag tycker ändå jag förstår tror jag?
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', userId);

      navigate('/');
    } catch (err) {
      console.error('Error logging in:', err);
    }
  };

  return (
    <form className="login-register-forms" onSubmit={handleSubmit}>
      <h3>Login</h3>
      <div className="form-input-group">
        <label>Email address</label>
        <input className="input-text" type="email" name="email" value={formData.email} onChange={handleChange} required/>
      </div>

      <div className="form-input-group">
        <label>Password</label>
        <input className="input-text" type="password" name="password" value={formData.password} onChange={handleChange} required/>
      </div>

      <button className="submit-btn" type="submit">Login</button>

      <p>Don't have an account? <Link className="register-link" to="/register">Register here.</Link></p>
    </form>
  );
};

export default Login;
