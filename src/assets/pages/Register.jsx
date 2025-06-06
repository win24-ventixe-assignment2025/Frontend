import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
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
    const res = await fetch('https://ventixe-authservice2025-dpdvc0dcfvgnfwa7.swedencentral-01.azurewebsites.net/api/Auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      navigate('/login');
    } else {
      console.error('Registration failed');
    }
  };

  return (
    <form className="login-register-forms" onSubmit={handleSubmit}>
      <h3>Register</h3>
      <div className="form-input-group">
        <label>Email address</label>
        <input className="input-text" type="email" name="email" value={formData.email} onChange={handleChange} required/>
      </div>
       <div className="form-input-group">
        <label>Password</label>
        <input className="input-text" type="password" name="password" value={formData.password} onChange={handleChange} required/>
      </div>
      <button className='submit-btn' type="submit">Register</button>

      <p>Already have an account? <Link className="register-link" to="/login">Login here.</Link></p>
    </form>
  );
};

export default Register;
