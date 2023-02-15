import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import svg from '~/assets/svg';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('top-left')}>
                <img className={cx('icon')} src={svg.facebook} alt="facebook icon" />
                <img className={cx('icon')} src={svg.tiktok} alt="tiktok icon" />
                <img className={cx('icon')} src={svg.twitter} alt="twitter icon" />
                <img className={cx('icon')} src={svg.instagram} alt="instagram icon" />
            </div>
            <div className={cx('top-right')}>
                <div className={cx('nav')}>
                    <Link>
                        <div className={cx('nav-item')}>Home</div>
                    </Link>
                    <Link>
                        <div className={cx('nav-item')}>About</div>
                    </Link>
                    <Link>
                        <div className={cx('nav-item')}>Contact</div>
                    </Link>
                    <Link>
                        <div className={cx('nav-item')}>Login</div>
                    </Link>
                    <Link>
                        <div className={cx('nav-item')}>Register</div>
                    </Link>
                </div>
                <div className={cx('search')}>
                    <img src={svg.search} alt="search icon" />
                </div>
            </div>
        </div>
    );
}

export default Header;
