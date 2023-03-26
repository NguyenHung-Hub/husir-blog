import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import * as authService from '~/services/auth.service';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        if (password === confirmPass) {
            try {
                const user = { username, email, password };
                const result = await authService.register(user);
                console.log(`file: Register.js:23 > REGISTER:`, result);

                setLoading(false);
                setSuccess(true);
                // result && window.location.replace('/login');
            } catch (error) {
                console.log(error);
            }
        } else {
            setLoading(false);
            setSuccess(false);
            alert('Password does nost match!!');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <form className={cx('register-form')} onSubmit={handleSubmit}>
                {(function () {
                    if (loading) {
                        return <Loading />;
                    } else {
                        if (success) {
                            return (
                                <>
                                    <div className={cx('notification')}>Successfully register</div>
                                    <Button rounded primary to={'/login'}>
                                        Next
                                    </Button>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <div className={cx('title')}>Register</div>
                                    <input
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className={cx('input', 'username')}
                                        type="text"
                                        placeholder="Username"
                                        required
                                    />
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={cx('input', 'email')}
                                        type="email"
                                        placeholder="Email"
                                        required
                                    />
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={cx('input', 'password')}
                                        type="password"
                                        placeholder="Password"
                                        required
                                    />
                                    <input
                                        value={confirmPass}
                                        onChange={(e) => setConfirmPass(e.target.value)}
                                        className={cx('input', 'confirm-password')}
                                        type="password"
                                        placeholder="Confirm Password"
                                        disabled={password ? false : true}
                                        required
                                    />
                                    <Button primary className={cx('register-btn')}>
                                        Register
                                    </Button>

                                    <div className={cx('suggest-login')}>
                                        Have already an account?
                                        <Link to={'/login'}>
                                            <span className={cx('login-btn')}>Login here</span>
                                        </Link>
                                    </div>
                                </>
                            );
                        }
                    }
                })()}
            </form>
        </div>
    );
}

export default Register;
