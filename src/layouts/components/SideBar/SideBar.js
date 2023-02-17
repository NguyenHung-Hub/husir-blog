import React from 'react';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

function SideBar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-sticky')}>
                <div className={cx('recommend-wrapper')}>
                    <div className={cx('title')}>Recommend</div>
                    <div className={cx('post')}>
                        <img
                            className={cx('post-img')}
                            src="https://www.muscleandfitness.com/wp-content/uploads/2019/12/Healthy-Happy-Couple-Stretching-Grass.jpg?quality=86&strip=all"
                            alt="img"
                        />
                        <div className={cx('post-title')}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, eaque?
                        </div>
                    </div>
                    <div className={cx('post')}>
                        <img
                            className={cx('post-img')}
                            src="https://www.muscleandfitness.com/wp-content/uploads/2019/12/Healthy-Happy-Couple-Stretching-Grass.jpg?quality=86&strip=all"
                            alt="img"
                        />
                        <div className={cx('post-title')}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, eaque?
                        </div>
                    </div>
                    <div className={cx('post')}>
                        <img
                            className={cx('post-img')}
                            src="https://www.muscleandfitness.com/wp-content/uploads/2019/12/Healthy-Happy-Couple-Stretching-Grass.jpg?quality=86&strip=all"
                            alt="img"
                        />
                        <div className={cx('post-title')}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, eaque?
                        </div>
                    </div>
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
