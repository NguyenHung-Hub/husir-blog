import React from 'react';
import classNames from 'classnames/bind';
import styles from './Posts.module.scss';
import Post from '~/components/Post/Post';

const cx = classNames.bind(styles);

function Posts() {
    return (
        <div className={cx('wrapper')}>
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    );
}

export default Posts;
