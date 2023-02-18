import React from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Login() {
    return (
        <div className={cx('wrapper')}>
            <form action="" className={cx('login-form')}>
                <div className={cx('title')}>Login</div>
                <input className={cx('input', 'username')} type="text" placeholder="Email" />
                <input className={cx('input', 'password')} type="password" placeholder="Password" />
                <Button primary className={cx('login-btn')}>
                    Login
                </Button>

                <div className={cx('suggest-register')}>
                    Don't have an account?
                    <span className={cx('register-btn')}>Register now</span>
                </div>
            </form>
        </div>
    );
}

export default Login;
