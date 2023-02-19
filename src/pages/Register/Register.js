import React from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Register() {
    return (
        <div className={cx('wrapper')}>
            <form action="" className={cx('register-form')}>
                <div className={cx('title')}>Register</div>
                <input className={cx('input', 'username')} type="text" placeholder="Username" />
                <input className={cx('input', 'email')} type="email" placeholder="Email" />
                <input className={cx('input', 'password')} type="password" placeholder="Password" />
                <input className={cx('input', 'confirm-password')} type="password" placeholder="Confirm Password" />
                <Button primary className={cx('register-btn')}>
                    Register
                </Button>

                <div className={cx('suggest-login')}>
                    Have already an account?
                    <Link to={'/login'}>
                        <span className={cx('login-btn')}>Login here</span>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
