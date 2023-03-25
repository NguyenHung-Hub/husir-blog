import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Post from '~/components/Post/Post';
import Button from '~/components/Button';
import ModalProfile from '~/components/ModalProfile';
import * as postService from '~/services/post.service';
import { AuthContext } from '~/contexts/AuthContext/AuthProvider';
import AuthAction from '~/contexts/AuthContext';
import AvatarDefault from '~/components/AvatarDefault';

const cx = classNames.bind(styles);

function Profile() {
    const [showModal, setShowModal] = useState(false);
    const [myPosts, setMyPosts] = useState([]);
    const [user, setUser] = useState(null);

    const { authState, authDispatch } = useContext(AuthContext);

    const handleToggleModal = () => {
        setShowModal(true);
    };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const result = await postService.getByUser(authState.user._id);

                const { posts, ...userInfo } = result;
                setUser(userInfo);
                setMyPosts(posts);

                authDispatch(AuthAction.refreshUser(result));
            } catch (error) {
                console.log(error);
            }
        };

        fetchApi();
        // eslint-disable-next-line
    }, [authState.user._id]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('profile-wrapper')}>
                {(function () {
                    if (user?.avatar) {
                        return <img className={cx('avatar')} src={user?.avatar} alt={user?.username} />;
                    } else if (user?.username) {
                        return <AvatarDefault name={user?.username} width={180} />;
                    }
                })()}

                <div className={cx('about-yourself')}>{user?.description || 'Your summary '}</div>
                <div className={cx('row')}>
                    <div className={cx('column')}>Username: </div>
                    <div className={cx('column')}>{user?.username}</div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('column')}>Email: </div>
                    <div className={cx('column')}>{user?.email}</div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('column')}>Phone: </div>
                    <div className={cx('column')}>{user?.phone || "Haven't updated"}</div>
                </div>

                <div className={cx('button-wrapper')}>
                    <Button outline className={cx('btn')}>
                        Change password
                    </Button>
                    <Button outline className={cx('btn')} onClick={handleToggleModal}>
                        Update profile
                    </Button>
                </div>
            </div>

            <div className={cx('post-wrapper')}>
                <div className={cx('heading')}>Your post</div>

                <div className={cx('body')}>
                    {myPosts.map((post, index) => (
                        <Post key={index} data={post} />
                    ))}
                </div>
            </div>

            {showModal && <ModalProfile setShowModal={setShowModal} user={user} />}
        </div>
    );
}

export default Profile;
