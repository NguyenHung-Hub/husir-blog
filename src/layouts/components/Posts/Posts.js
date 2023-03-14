import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Posts.module.scss';
import Post from '~/components/Post/Post';

import * as postService from '~/services/post.service';
import { useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function Posts() {
    const location = useLocation();
    const category = location.pathname.split('/').at(-1);
    console.log(`file: Posts.js:14 > slug:`, category);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchAPi = async () => {
            let result;
            if (category) {
                result = await postService.getPostByCategory(category);
                console.log(`file: Posts.js:23 > result:`, result);
            } else {
                result = await postService.getAllPost();
            }

            setPosts(result);
        };

        fetchAPi();
    }, [category]);

    return (
        <div className={cx('wrapper')}>
            {posts.map((post, index) => (
                <Post data={post} key={index} />
            ))}
        </div>
    );
}

export default Posts;
