import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalProfile.module.scss';
import ModalBase from '../Modal/ModalBase';
import Button from '../Button';
import svg from '~/assets/svg';

import * as userService from '~/services/user.service';
import AvatarDefault from '../AvatarDefault';

const cx = classNames.bind(styles);

function ModalProfile({ setShowModal, user }) {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user?.phone || '');
    const [description, setDescription] = useState(user?.description);
    // const [password, setPassword] = useState('123456');
    // const [showPassword, setShowPassword] = useState(false);

    const handleChooseImg = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setFile(file);
    };

    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file.preview);
        };
    }, [file]);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const onChangePhone = (e) => {
        setPhone(e.target.value);
    };
    // const onChangePassword = (e) => {
    //     setPassword(e.target.value);
    // };

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const handleUpdateUser = async () => {
        try {
            const updateUser = { userId: user._id, username, email, phone, description };
            const res = await userService.updateUser(updateUser);
            console.log(`file: ModalProfile.js:54 > res UPDATE:`, res);

            if (!res?.error) {
                window.location.reload();
                setShowModal(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <ModalBase setShowModal={setShowModal}>
            <div className={cx('modal-container')}>
                <div className={cx('head')}>
                    <div className={cx('avatar-wrapper')}>
                        {(function () {
                            if (file?.preview) {
                                return <img className={cx('avatar')} src={file?.preview} alt="avatar" />;
                            }
                            if (user?.avatar) {
                                return <img className={cx('avatar')} src={file?.preview} alt="avatar" />;
                            }
                            return <AvatarDefault name={user.username} width={180} />;
                        })()}

                        <label className={cx('choose-img-btn')}>
                            <img className={cx('camera-icon')} src={svg.camera} alt="camera icon" />

                            <input
                                type="file"
                                name="file"
                                id="file"
                                style={{ display: 'none' }}
                                onChange={handleChooseImg}
                            />
                        </label>
                    </div>
                    <textarea
                        className={cx('about-yourself')}
                        defaultValue={user?.description || ''}
                        onChange={onChangeDescription}
                        placeholder={'Your summary'}
                    ></textarea>
                </div>

                <div className={cx('body')}>
                    <div className={cx('row')}>
                        <div className={cx('label')}>Username </div>
                        <input type="text" className={cx('input')} value={username} onChange={onChangeUsername} />
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('label')}>Email </div>
                        <input type="email" className={cx('input')} value={email} onChange={onChangeEmail} />
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('label')}>Phone </div>
                        <input
                            type="text"
                            className={cx('input')}
                            placeholder="Phone number"
                            value={phone}
                            onChange={onChangePhone}
                        />
                    </div>
                    {/* <div className={cx('row')}>
                        <div className={cx('label')}>Password </div>

                        <div className={cx('password-wrapper')}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={cx('input')}
                                value={password}
                                onChange={onChangePassword}
                            />
                            <img
                                className={cx('eye-icon')}
                                src={showPassword ? svg.eyeOpen : svg.eyeClose}
                                alt="eye"
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>
                    </div> */}
                </div>

                <div className={cx('footer')}>
                    <Button primary className={cx('btn')} onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button success className={cx('btn')} onClick={handleUpdateUser}>
                        Update
                    </Button>
                </div>
            </div>
        </ModalBase>
    );
}

export default ModalProfile;
