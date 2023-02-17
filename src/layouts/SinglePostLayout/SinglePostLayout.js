import React from 'react';
import classNames from 'classnames/bind';
import styles from './SinglePostLayout.module.scss';
import PropTypes from 'prop-types';

import Header from '~/layouts/components/Header';
import Banner from '../components/Banner';
import SideBar from '../components/SideBar';

const cx = classNames.bind(styles);

function SinglePostLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('content')}>
                {children}
                <SideBar />
            </div>
        </div>
    );
}
SinglePostLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default SinglePostLayout;
