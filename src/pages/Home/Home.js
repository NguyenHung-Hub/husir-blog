import React from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import Posts from '~/layouts/components/Posts';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wrapper')}>
            <Posts />
        </div>
    );
}

export default Home;
