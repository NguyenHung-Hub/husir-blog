import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './SinglePost.module.scss';
import { Link, useLocation } from 'react-router-dom';
import * as postService from '~/services/post.service';
import formatDate from '~/utils/formatDate';
import Loading from '~/components/Loading';
import Button from '~/components/Button';
import { AuthContext } from '~/contexts/AuthContext/AuthProvider';
import svg from '~/assets/svg';
import { PostContext } from '~/contexts/PostContext/PostProvider';
import PostAction from '~/contexts/PostContext';
import ModalBase from '~/components/Modal/ModalBase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const cx = classNames.bind(styles);

function SinglePost() {
    const location = useLocation();
    const slug = location.pathname.split('/').at(-1);
    console.log(`file: SinglePost.js:12 > slug:`, slug);

    const [post, setPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { authState } = useContext(AuthContext);
    const { postsDispatch } = useContext(PostContext);

    useEffect(() => {
        const fetchApi = async () => {
            const result = await postService.getPost(slug);
            console.log(`file: SinglePost.js:30 > result:`, result);
            setPost(result);
        };

        fetchApi();
    }, [slug]);

    const handleOnClickEdit = () => {
        postsDispatch(PostAction.addPostEdit(post));
    };

    const handleOnClickDelete = () => {
        setShowModal(true);
    };
    const handleOnClickCancel = () => {
        setShowModal(false);
    };
    const handleOnClickYes = async () => {
        try {
            await postService.hidden({ postId: post._id, username: authState.user.username });
            window.location.replace('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            {post ? (
                <>
                    <img className={cx('post-img')} src={post.photo} alt={post.title} />

                    {authState.user && (
                        <div className={cx('button-wrapper')}>
                            <Button to={'/write'} success onClick={handleOnClickEdit}>
                                Edit
                            </Button>
                            <Button primary onClick={handleOnClickDelete}>
                                Delete
                            </Button>
                        </div>
                    )}

                    <div className={cx('title')}>{post.title}</div>
                    <div className={cx('info')}>
                        <div className={cx('author')}>{post.username}</div>
                        <div className={cx('separate')}></div>
                        <div className={cx('time')}>{post.createdAt && formatDate(post.createdAt)}</div>
                    </div>

                    <ReactQuill value={post.description} theme="bubble" readOnly={true} />
                </>
            ) : (
                <Loading />
            )}

            {showModal && (
                <ModalBase>
                    <div className={cx('container-modal')}>
                        <div className={cx('question')}>Are you sure you want to delete?</div>
                        <div className={cx('control-wrapper')}>
                            <Button className={cx('control-btn')} rounded primary onClick={handleOnClickCancel}>
                                Cancel
                            </Button>
                            <Button className={cx('control-btn')} rounded success onClick={handleOnClickYes}>
                                Yes
                            </Button>
                        </div>
                    </div>
                </ModalBase>
            )}
        </div>
    );
}

export default SinglePost;
