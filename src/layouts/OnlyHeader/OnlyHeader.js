import React from 'react';
import classNames from 'classnames/bind';
import styles from './OnlyHeader.module.scss';
import PropTypes from 'prop-types';

import Header from '~/layouts/components/Header';

const cx = classNames.bind(styles);

function OnlyHeader({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />

            <div className={cx('content')}>{children}</div>
        </div>
    );
}
OnlyHeader.propTypes = {
    children: PropTypes.node.isRequired,
};
export default OnlyHeader;
