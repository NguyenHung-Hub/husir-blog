import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './AvatarDefault.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function AvatarDefault({ name, width, radius, fontSize }) {
    const [text, setText] = useState(null);
    useEffect(() => {
        if (name) {
            setText(name[0]);
        }
    }, [name]);

    return (
        <div className={cx('wrapper')} style={{ width: width, height: width, borderRadius: radius }}>
            <p style={{ fontSize: `${width > 60 ? 11.25 : 2.5}rem` }}> {text}</p>
        </div>
    );
}

AvatarDefault.propTypes = {
    name: PropTypes.string.isRequired,
};
export default AvatarDefault;
