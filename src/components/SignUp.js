import React, { useState } from "react";
import axios from 'axios';
import './signupstyle.css';

function SignUp({ toggleSignIn }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const validateForm = () => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return 'Invalid email format';
        }
        if (password.length < 6) {
            return 'Password must be at least 6 characters long';
        }
        if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
            return 'Password must contain at least one uppercase letter and one number';
        }
        return '';
    };

    const handleSignUp = async () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            setSuccess('');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                name,
                email,
                password
            });

            // Handle successful response
            setSuccess('Registered successfully');
            setError('');
            // Redirect or perform other actions as needed
        } catch (error) {
            if (error.response) {
                // Handle errors from the server
                setError(error.response.data.message);
            } else {
                // Handle network or other errors
                setError('An error occurred. Please try again.');
            }
            setSuccess('');
        }
    };

    return (
        <div className="sign">
            <div className="account">REGISTER</div>
            <div className="inputbox">
                <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="inputbox">
                <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="inputbox" style={{ marginBottom: '5vh' }}>
                <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="account-btn">
                <button onClick={handleSignUp}>REGISTER</button>
            </div>
            {error && <div style={{ color: 'red', padding: '1em' }}>{error}</div>}
            {success && <div style={{ color: 'green', padding: '1em' }}>{success}</div>}
            <div style={{ padding: '1em', fontSize: '1.2em', color: '#333232' }}>Already have an account?</div>
            <div className="account-btn">
                <button onClick={toggleSignIn}>Log in here</button>
            </div>
        </div>
    );
}

export default SignUp;