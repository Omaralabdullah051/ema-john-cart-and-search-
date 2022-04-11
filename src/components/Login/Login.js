import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Link, NavigationType, useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import './Login.css';
import { } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword, user, loading, error,] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, googleUser] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/shop';

    const handleEmailBlur = event => {
        setEmail(event.target.value);
    }

    const handlePasswordBlur = event => {
        setPassword(event.target.value);
    }

    const handleUserSignIn = event => {
        event.preventDefault();
        signInWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        if (user || googleUser) {
            navigate(from, { replace: true });
        }
    }, [user, googleUser, navigate, from]);

    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }

    return (
        <div className='form-container'>
            <div>
                <h2 className='form-title'>Login</h2>
                <form onSubmit={handleUserSignIn}>
                    <div className='input-group'>
                        <label htmlFor="email">Email</label>
                        <input onBlur={handleEmailBlur} type="email" name="email" id="email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onBlur={handlePasswordBlur} type="password" name="password" id="password" required />
                    </div>
                    <p style={{ color: 'red' }}>{error?.message || ''} </p>
                    {
                        loading && <p>Loading..........</p>
                    }
                    <input className='form-submit' type="submit" value="Login" />
                </form>
                <p style={{ textAlign: 'center' }}>New to Ema-John? <Link className='form-link' to="/signup">Create an account</Link></p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div>----------------------</div>
                    <div>or</div>
                    <div>----------------------</div>
                </div>
                <div onClick={handleGoogleSignIn} className='google-sign'>
                    <img width={50} src="https://i1.wp.com/www.bane-tech.com/wp-content/uploads/2015/10/G.png" alt="" />
                    <p>Continue With Google</p>
                </div>
            </div>
        </div>
    );
};

export default Login;