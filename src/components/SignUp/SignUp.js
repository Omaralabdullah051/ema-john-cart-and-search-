import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [createUserWithEmailAndPassword, user, loading, hookError] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithGoogle, googleUser] = useSignInWithGoogle(auth);

    const handleEmailBlur = event => {
        setEmail(event.target.value);
    }

    const handlePasswordBlur = event => {
        setPassword(event.target.value);
    }

    const handleConfirmPasswordBlur = event => {
        setConfirmPassword(event.target.value);
    }

    useEffect(() => {
        if (googleUser || user) {
            navigate('/shop');
        }
    }, [user, googleUser, navigate]);

    const handleCreateUser = event => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setError('Your two passwords did not match');
            return;
        }
        if (password.length < 6) {
            setError('password must be 6 characters or longer');
            return;
        }

        createUserWithEmailAndPassword(email, password);
    }



    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }

    return (
        <div className='form-container'>
            <div>
                <h2 className='form-title'>SignUp</h2>
                <form onSubmit={handleCreateUser}>
                    <div className='input-group'>
                        <label htmlFor="email">Email</label>
                        <input onBlur={handleEmailBlur} type="email" name="email" id="email" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input onBlur={handlePasswordBlur} type="password" name="password" id="password" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input onBlur={handleConfirmPasswordBlur} type="password" name="confirm-password" id="confirm-password" required />
                    </div>
                    <p style={{ color: 'red' }}>{error}</p>
                    <p style={{ color: 'red' }}>{hookError?.message}</p>
                    <input className='form-submit' type="submit" value="Sign up" />
                </form>
                <p style={{ textAlign: 'center' }}>Already have an account? <Link className='form-link' to="/login">Login</Link></p>
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

export default SignUp;