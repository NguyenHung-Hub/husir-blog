import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import { PostContext } from '~/contexts/PostContext/PostProvider';

const cx = classNames.bind(styles);

function SideBar() {
    const { postsState } = useContext(PostContext);
    const posts = postsState.postsRecommand;
    console.log(`file: SideBar.js:13 > postsRecommand:`, posts);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-sticky')}>
                <div className={cx('recommend-wrapper')}>
                    <div className={cx('title')}>Recommend</div>

                    {posts.map((post, index) => {
                        return (
                            <div className={cx('post')} key={index}>
                                <img className={cx('post-img')} src={post.photo} alt={post.title} />
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
