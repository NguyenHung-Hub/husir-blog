import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import * as postService from '~/services/post.service';

const cx = classNames.bind(styles);

function SideBar() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await postService.getRecommend(3);
                setPosts(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-sticky')}>
                <div className={cx('recommend-wrapper')}>
                    <div className={cx('title')}>Recommend</div>

                    {posts.map((post, index) => {
                        return (
                            <div className={cx('post')} key={index}>
                                <div className={cx('img-wrapper')}>
                                    <img className={cx('post-img')} src={post.photo} alt={post.title} />
                                </div>
                                <div className={cx('post-title')}>{post.title}</div>
                            </div>
                        );
                    })}
                </div>
                <div className={cx('categories-wrapper')}>
                    <div className={cx('title')}>Categories</div>
                    <ul className={cx('categories')}>
                        <li className={cx('category')}>Teachnolory</li>
                        <li className={cx('category')}>Travel</li>
                        <li className={cx('category')}>Music</li>
                        <li className={cx('category')}>Sport</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
