import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import PropTypes from 'prop-types';

import Header from '~/layouts/components/Header';
import Banner from '../components/Banner';
import SideBar from '../components/SideBar';
import { PostContext } from '~/contexts/PostContext/PostProvider';
import PostAction from '~/contexts/PostContext';

import * as postService from '~/services/post.service';
const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const [posts, setPosts] = useState([]);
    const { postsDispatch } = useContext(PostContext);

    useEffect(() => {
        const fetchAPi = async () => {
            const result = await postService.getAllPost();
            setPosts(result);
            postsDispatch(PostAction.addAllPost(result));

            const postsSorted = result.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            const postsBanner = postsSorted.slice(0, 3);
            postsDispatch(PostAction.addPostBanner(postsBanner));
        };

        fetchAPi();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <Header />
            <Banner />

            <div className={cx('content')}>
                {children}
                <SideBar />
            </div>
        </div>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
