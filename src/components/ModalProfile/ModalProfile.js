import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalProfile.module.scss';
import ModalBase from '../Modal/ModalBase';
import Button from '../Button';
import svg from '~/assets/svg';

const cx = classNames.bind(styles);

function ModalProfile({ setShowModal }) {
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('John Doe');
    const [email, setEmail] = useState('john@gmail.com');
    const [phone, setPhone] = useState('0987654321');
    const [password, setPassword] = useState('123456');
    const [showPassword, setShowPassword] = useState(false);

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
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <ModalBase setShowModal={setShowModal}>
            <div className={cx('modal-container')}>
                <div className={cx('head')}>
                    <div className={cx('avatar-wrapper')}>
                        <img
                            className={cx('avatar')}
                            src={
                                file
                                    ? file.preview
                                    : 'https://i.guim.co.uk/img/media/1d4b16d4c6703e9bec9174f1cadc278026de0647/0_75_1280_768/master/1280.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d036928c5974e9e8bfd87be5dcf37dd7'
                            }
                            alt="avatar"
                        />

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
                        defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse vitae modi aliquid pariatur
                        dolorum animi, voluptatum ea nisi repellat ipsam debitis odit ducimus eligendi voluptas omnis.
                        Inventore laboriosam consectetur numquam."
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
                        <input type="text" className={cx('input')} value={phone} onChange={onChangePhone} />
                    </div>
                    <div className={cx('row')}>
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
                    </div>
                </div>

                <div className={cx('footer')}>
                    <Button primary className={cx('btn')} onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button success className={cx('btn')}>
                        Update
                    </Button>
                </div>
            </div>
        </ModalBase>
    );
}

export default ModalProfile;
