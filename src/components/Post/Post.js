import React from 'react';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';

const cx = classNames.bind(styles);

function Post() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('post-img')}
                src="https://thumbs.dreamstime.com/b/fitness-sport-training-healthy-lifestyle-concept-group-happy-people-exercising-outdoor-fitness-sport-training-healthy-153352477.jpg"
                alt="post image"
            />
            <div className={cx('info')}>
                <div className={cx('other-info')}>
                    <div className={cx('post-type')}>Healthy</div>
                    <div className={cx('time')}>12 June 2022</div>
                </div>
                <div className={cx('title')}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sit itaque porro!
                </div>
            </div>
        </div>
    );
}

export default Post;
