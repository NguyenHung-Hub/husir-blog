import React from 'react';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { Link } from 'react-router-dom';
import formatDate from '~/utils/formatDate';

const cx = classNames.bind(styles);

function Post({ data }) {
    return (
        <div className={cx('wrapper')}>
            <Link to={`/post/${data?.slug}`}>
                <img className={cx('post-img')} src={data.photo} alt="post img" />
            </Link>
            <div className={cx('info')}>
                <div className={cx('other-info')}>
                    {data.categories && (
                        <Link to={`/${data.categories?.slug}`}>
                            <div className={cx('post-type')}>{data.categories?.name}</div>
                        </Link>
                    )}
                    <div className={cx('time')}>{formatDate(data.createdAt)}</div>
                </div>
                <Link to={`/post/${data.slug}`}>
                    <div className={cx('title')}>{data.title}</div>
                </Link>
            </div>
        </div>
    );
}

export default Post;
