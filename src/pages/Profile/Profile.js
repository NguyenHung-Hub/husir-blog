import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Post from '~/components/Post/Post';
import Button from '~/components/Button';
import ModalProfile from '~/components/ModalProfile';

const cx = classNames.bind(styles);

function Profile() {
    const [showModal, setShowModal] = useState(false);

    const handleToggleModal = () => {
        setShowModal(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('profile-wrapper')}>
                <img
                    className={cx('avatar')}
                    src="https://i.guim.co.uk/img/media/1d4b16d4c6703e9bec9174f1cadc278026de0647/0_75_1280_768/master/1280.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d036928c5974e9e8bfd87be5dcf37dd7"
                    alt="avatar"
                />
                <div className={cx('about-yourself')}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse vitae modi aliquid pariatur dolorum
                    animi, voluptatum ea nisi repellat ipsam debitis odit ducimus eligendi voluptas omnis. Inventore
                    laboriosam consectetur numquam.
                </div>
                <div className={cx('row')}>
                    <div className={cx('column')}>Username: </div>
                    <div className={cx('column')}>John Doe</div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('column')}>Email: </div>
                    <div className={cx('column')}>john@gmail.com</div>
                </div>
                <div className={cx('row')}>
                    <div className={cx('column')}>Phone: </div>
                    <div className={cx('column')}>0987654321</div>
                </div>

                <Button outline className={cx('update-btn')} onClick={handleToggleModal}>
                    Update profile
                </Button>
            </div>

            <div className={cx('post-wrapper')}>
                <div className={cx('heading')}>Your post</div>

                <div className={cx('body')}>
                    {/* <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post />
                    <Post /> */}
                </div>
            </div>

            {showModal && <ModalProfile setShowModal={setShowModal} />}
        </div>
    );
}

export default Profile;
