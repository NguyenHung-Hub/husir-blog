import React from 'react';
import classNames from 'classnames/bind';
import styles from './Write.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Write() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('choose-img-wrapper')}>
                <img
                    className={cx('post-img')}
                    src="https://www.studytienganh.vn/upload/2021/06/105889.jpg"
                    alt="img"
                />
            </div>

            <div className={cx('post-title-wrapper')}>
                <input type="text" placeholder="Title..." className={cx('post-title-input')} />
                <Button primary className={cx('publish-btn')}>
                    Publish
                </Button>
            </div>
            <textarea className={cx('post-content-input')} placeholder="Write now..."></textarea>
        </div>
    );
}

export default Write;
