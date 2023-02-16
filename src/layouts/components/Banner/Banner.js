import React from 'react';
import classNames from 'classnames/bind';
import styles from './Banner.module.scss';

const cx = classNames.bind(styles);

const ArticleBox = () => {
    return (
        <div className={cx('article-wrapper')}>
            <img
                className={cx('img-banner')}
                src="https://cdn.shopify.com/s/files/1/1237/8116/articles/Active-Lifestyle.jpg?v=1503420208"
                alt="lifestyle"
            />

            <div className={cx('info')}>
                <div className={cx('article-type')}>Lifestype</div>
                <h3 className={cx('title')}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, repellat!</h3>
                <div className={cx('other-info')}>
                    <p className={cx('author')}>John Doe</p>
                    <div className={cx('separate')}></div>
                    <p className={cx('time')}>20 April 2018</p>
                </div>
            </div>
        </div>
    );
};

function Banner() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-wrapper')}>
                <ArticleBox />
            </div>
            <div className={cx('right-wrapper')}>
                <div className={cx('top-box')}>
                    <ArticleBox />
                </div>
                <div className={cx('bottom-box')}>
                    <ArticleBox />
                </div>
            </div>
        </div>
    );
}

export default Banner;
