import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SinglePost.module.scss';
import { useLocation } from 'react-router-dom';
import * as postService from '~/services/post.service';
import formatDate from '~/utils/formatDate';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function SinglePost() {
    const location = useLocation();
    const slug = location.pathname.split('/').at(-1);
    console.log(`file: SinglePost.js:12 > slug:`, slug);

    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await postService.getPost(slug);
            setPost(result);
        };

        fetchApi();
    }, [slug]);

    return (
        <div className={cx('wrapper')}>
            {post ? (
                <>
                    <img className={cx('post-img')} src={post.photo} alt={post.title} />

                    <div className={cx('title')}>{post.title}</div>
                    <div className={cx('info')}>
                        <div className={cx('author')}>{post.username}</div>
                        <div className={cx('separate')}></div>
                        <div className={cx('time')}>{post.createdAt && formatDate(post.createdAt)}</div>
                    </div>

                    <div className={cx('content')}>{post.description}</div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}

export default SinglePost;
