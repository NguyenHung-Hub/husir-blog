import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';
import formatDate from '~/utils/formatDate';
import { PostContext } from '~/contexts/PostContext/PostProvider';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ArticleBox = ({ data }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (data?.photo) {
            setTimeout(() => {
                setLoading(false);
            }, 100);
        } else {
            setLoading(true);
        }
    }, [data]);

    return (
        <Link to={`/post/${data?.slug}`}>
            <div className={cx('article-wrapper', loading ? 'loading' : '')}>
                <div className={cx('image-wrapper')}>
                    <img className={cx('img-banner')} src={data?.photo} alt={data?.title} />
                </div>

                <div className={cx('info')}>
                    <div className={cx('article-type')}>{data?.categories.name}</div>
                    <h3 className={cx('title')}>{data?.title}</h3>
                    <div className={cx('other-info')}>
                        <p className={cx('author')}>{data?.username}</p>
                        <div className={cx('separate')}></div>
                        <p className={cx('time')}>{formatDate(data?.createdAt)}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

function Banner() {
    const { postsState } = useContext(PostContext);
    // const [posts, setPosts] = useState(null);
    // // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     if (postsState.postsBanner) {
    //         setPosts(postsState.postsBanner);
    //         // setLoading(false);
    //     } else {
    //         // setLoading(true);
    //     }
    // }, [postsState]);

    const posts = postsState.postsBanner;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-wrapper')}>
                <ArticleBox data={posts[0]} />
            </div>
            <div className={cx('right-wrapper')}>
                <div className={cx('top-box')}>
                    <ArticleBox data={posts[1]} />
                </div>
                <div className={cx('bottom-box')}>
                    <ArticleBox data={posts[2]} />
                </div>
            </div>
        </div>
    );
}

export default Banner;
