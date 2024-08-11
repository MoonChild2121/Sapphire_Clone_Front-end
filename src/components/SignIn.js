import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signupstyle.css';

function SignIn({ toggleSignUp, onSignInSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('name', response.data.name);

      onSignInSuccess(response.data.name);
      navigate('/');

    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="sign">
      <div className="account">ACCOUNT</div>
            <div className="inputbox">
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="inputbox" style={{ marginBottom: '5vh' }}>
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="account-btn">
                <button onClick={handleSignIn}>SIGN IN</button>
            </div>
            {error && <div style={{ color: 'red', padding: '1em' }}>{error}</div>}
            <div style={{ padding: '1em', fontSize: '1.2em', color: '#333232' }}>New to Sapphire?</div>
            <div className="account-btn">
                <button onClick={toggleSignUp}>CREATE ACCOUNT</button>
            </div>

    </div>
  );
}

export default SignIn;
