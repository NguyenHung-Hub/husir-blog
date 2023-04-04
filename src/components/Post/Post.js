import React from 'react';
import classNames from 'classnames/bind';
import styles from './Post.module.scss';
import { Link } from 'react-router-dom';
import formatDate from '~/utils/formatDate';

const cx = classNames.bind(styles);

function Post({ data }) {
    return (
        <Link to={`/post/${data?.slug}`}>
            <div className={cx('wrapper')}>
                <img className={cx('post-img')} src={data.photo} alt="post img" />
                <div className={cx('info')}>
                    <div className={cx('other-info')}>
                        {data.categories && <div className={cx('post-type')}>{data.categories?.name}</div>}
                        <div className={cx('time')}>{formatDate(data.createdAt)}</div>
                    </div>
                    <div className={cx('title')}>{data.title}</div>
                </div>
            </div>
        </Link>
    );
}

export default Post;
