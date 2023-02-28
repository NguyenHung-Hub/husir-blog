import React, { useContext, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';

import * as authService from '~/services/auth.service';
import { AuthContext } from '~/contexts/AuthContext/AuthProvider';
import AuthAction from '~/contexts/AuthContext';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { authState, authDispatch } = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            authDispatch(AuthAction.loginStart());
            const user = { email, password };
            const result = await authService.login(user);

            console.log(`file: Login.js:21 > LOGIN:`, result);
            if (result) {
                window.location.replace('/');
                authDispatch(AuthAction.loginSuccess(result));
            } else {
                authDispatch(AuthAction.loginFailure());
            }
        } catch (error) {
            console.log(error);
            setError(error.response.statusText);
            console.log(error.response.statusText);
            authDispatch(AuthAction.loginFailure());
        }
    };

    const backToLogin = () => {
        setError(null);
    };

    return (
        <div className={cx('wrapper')}>
            <form onSubmit={handleSubmit} className={cx('login-form')}>
                {(function () {
                    if (authState.isFetching) {
                        return <Loading />;
                    } else {
                        if (error) {
                            return (
                                <div className={cx('error-wrapper')}>
                                    <div className={cx('notification')}>{error}</div>
                                    <Button rounded primary onClick={backToLogin}>
                                        Continue
                                    </Button>
                                </div>
                            );
                        } else {
                            return (
                                <>
                                    <div className={cx('title')}>Login</div>
                                    <input
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={cx('input', 'username')}
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

                                    <Button primary className={cx('login-btn')}>
                                        Login
                                    </Button>

                                    <div className={cx('suggest-register')}>
                                        Don't have an account?
                                        <Link to={'/register'}>
                                            <span className={cx('register-btn')}>Register now</span>
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

export default Login;
