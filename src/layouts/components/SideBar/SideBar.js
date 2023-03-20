import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import * as postService from '~/services/post.service';
import * as categoryService from '~/services/category.service';

import { Link, useLocation } from 'react-router-dom';

const cx = classNames.bind(styles);

function SideBar() {
    const location = useLocation();
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await postService.getRecommend(1);
                setPosts(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, [location]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await categoryService.getNotEmpty();
                console.log(`file: SideBar.js:32 > CATE:`, res);
                setCategories(res);
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
    }, [location]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-sticky')}>
                <div className={cx('recommend-wrapper')}>
                    <div className={cx('title')}>Recommend</div>

                    {posts.map((post, index) => {
                        return (
                            <Link key={index} to={`/post/${post.slug}`}>
                                <div className={cx('post')} key={index}>
                                    <div className={cx('img-wrapper')}>
                                        <img className={cx('post-img')} src={post.photo} alt={post.title} />
                                    </div>
                                    <div className={cx('post-title')}>{post.title}</div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                <div className={cx('categories-wrapper')}>
                    <div className={cx('title')}>Categories</div>
                    <div className={cx('scroll-wrapper')}>
                        <ul className={cx('categories')}>
                            {categories.map((category, index) => (
                                <Link key={index} to={`/${category.slug}`}>
                                    <li className={cx('category')}>
                                        <span>{category.name}</span>
                                        <span>({category.count})</span>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideBar;
