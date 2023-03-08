import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import svg from '~/assets/svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '~/contexts/AuthContext/AuthProvider';
import Button from '~/components/Button';
import AuthAction from '~/contexts/AuthContext';

const cx = classNames.bind(styles);

function Header() {
    const { authState, authDispatch } = useContext(AuthContext);

    const handleLogout = () => {
        authDispatch(AuthAction.logout());
        window.location.replace('/login');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-left')}>
                <img className={cx('icon', 'logo')} src={svg.logo} alt="logo" />
                <img className={cx('icon')} src={svg.facebook} alt="facebook icon" />
                <img className={cx('icon')} src={svg.tiktok} alt="tiktok icon" />
                <img className={cx('icon')} src={svg.twitter} alt="twitter icon" />
                <img className={cx('icon')} src={svg.instagram} alt="instagram icon" />
            </div>
            <div className={cx('top-right')}>
                <div className={cx('nav')}>
                    <Link to={'/'}>
                        <div className={cx('nav-item')}>Home</div>
                    </Link>
                    <Link to={'/about'}>
                        <div className={cx('nav-item')}>About</div>
                    </Link>
                    <Link to={'/contact'}>
                        <div className={cx('nav-item')}>Contact</div>
                    </Link>
                    <Link to={'/login'}>
                        <div className={cx('nav-item')}>Login</div>
                    </Link>
                    <Link to={'/register'}>
                        <div className={cx('nav-item')}>Register</div>
                    </Link>
                </div>
                <div className={cx('search')}>
                    <img src={svg.search} alt="search icon" />
                </div>

                {authState.user && (
                    <div className={cx('user-login')}>
                        <img className={cx('avatar')} src={authState.user.avatar} alt="avatar" />
                        <div className={cx('menu')}>
                            <Link to={'/profile'} className={cx('menu-item')}>
                                <img className={cx('icon')} src={svg.user} alt="profile icon" />
                                <div className={cx('label')}>My profile</div>
                            </Link>
                            <Link to={'/write'} className={cx('menu-item')}>
                                <img className={cx('icon')} src={svg.pen} alt="write icon" />
                                <div className={cx('label')}>Write blog</div>
                            </Link>
                            <Button onClick={handleLogout} className={cx('logout-btn')} rounded outline>
                                Logout
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
