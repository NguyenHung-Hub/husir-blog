import React from 'react';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Post() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('post-img')}
                src="https://thumbs.dreamstime.com/b/fitness-sport-training-healthy-lifestyle-concept-group-happy-people-exercising-outdoor-fitness-sport-training-healthy-153352477.jpg"
                alt="post img"
            />
            <div className={cx('info')}>
                <div className={cx('other-info')}>
                    <div className={cx('post-type')}>Healthy</div>
                    <div className={cx('time')}>12 June 2022</div>
                </div>
                <Link to={'/post'}>
                    <div className={cx('title')}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem sit itaque porro!
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Post;
