import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Posts.module.scss';
import Post from '~/components/Post/Post';

import * as postService from '~/services/post.service';

const cx = classNames.bind(styles);

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchAPi = async () => {
            const result = await postService.getAllPost();
            setPosts(result);
        };

        fetchAPi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {posts.map((post, index) => (
                <Post data={post} key={index} />
            ))}
            {/* <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post />
            <Post /> */}
        </div>
    );
}

export default Posts;
