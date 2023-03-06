import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Write.module.scss';
import Button from '~/components/Button';
import * as postService from '~/services/post.service';
import { AuthContext } from '~/contexts/AuthContext/AuthProvider';
import svg from '~/assets/svg';
import ModalBase from '~/components/Modal/ModalBase';
import Loading from '~/components/Loading';
import * as uploadService from '~/services/upload.service';
import * as categoryService from '~/services/category.service';

import { Link } from 'react-router-dom';
import ModalCategory from '~/components/ModalCategory';

const cx = classNames.bind(styles);

function Write() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);

    const [slug, setSlug] = useState('');

    useEffect(() => {
        if (title) {
            document.title = title;
        } else {
            document.title = 'Write';
        }
    }, [title]);

    const { authState } = useContext(AuthContext);

    const handleChooseImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setFile(file);
    };

    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file.preview);
        };
    }, [file]);

    const validate = () => {
        if (!file) {
            alert('Please choose image!');
            return false;
        }
        if (!category) {
            alert('Please choose category!');
            return false;
        }
        if (title === '') {
            alert('Title empty!');
            return false;
        }
        if (content === '') {
            alert('Content empty!');
            return false;
        }

        return true;
    };

    const handlePublishPost = async () => {
        if (!validate()) {
            return;
        }
        setLoading(true);
        setShowModal(true);

        const newPost = {
            username: authState.user.username,
            title,
            description: content,
            photo: 'https://bizflyportal.mediacdn.vn/bizflyportal/1228/2428/2021/03/01/17/50/he-16145742590976.jpg',
        };

        if (file) {
            try {
                const data = new FormData();
                data.append('file', file);

                const resultUpload = await uploadService.uploadImage(data);
                console.log(`file: Write.js:57 > resultUpload:`, resultUpload);
                newPost.photo = resultUpload.url;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        try {
            const result = await postService.savePost(newPost);
            console.log(`file: Write.js:47 > PUBLISH:`, result);

            setError(result?.error || null);
            setSlug(result?.slug);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleOnClickWrite = () => {
        setFile(null);
        setTitle('');
        setCategories([]);
        setCategory(null);
        setContent('');
        setError(null);
        setLoading(false);
        setShowModal(false);
    };

    const getCategories = async () => {
        try {
            const res = await categoryService.getCategories();
            setCategories(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, [showAddCategory]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('choose-img-wrapper')}>
                {file ? (
                    <div className={cx('img-wrapper')}>
                        <label htmlFor="file" className={cx('btn-select')}>
                            <img className={cx('camera-icon')} src={svg.camera} alt="camera icon" />
                        </label>
                        <img className={cx('post-img')} src={file.preview} alt="img" />
                    </div>
                ) : (
                    <div className={cx('not-selected')}>
                        <label htmlFor="file" className={cx('label-select')}>
                            Choose image
                        </label>
                    </div>
                )}
                <input type="file" name="file" id="file" style={{ display: 'none' }} onChange={handleChooseImage} />
            </div>

            <div className={cx('post-title-wrapper')}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Title..."
                    className={cx('post-title-input')}
                    title="Title of the post"
                />
                <Button primary className={cx('publish-btn')} onClick={handlePublishPost}>
                    Publish
                </Button>
            </div>

            <div className={cx('category-wrapper')}>
                <select
                    name=""
                    className={cx('categories-select')}
                    defaultValue="choose category"
                    onChange={(e) => setCategory(e.target.value)}
                    title="choose category"
                >
                    <option value="choose category">choose category </option>
                    {categories &&
                        categories.map((category, index) => (
                            <option key={index} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                </select>
                <Button className={cx('new-category-btn')} onClick={() => setShowAddCategory(true)}>
                    <img src={svg.plusCircle} alt="plus icon" />
                </Button>
            </div>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={cx('post-content-input')}
                placeholder="Write now..."
            ></textarea>
            {showModal && (
                <ModalBase>
                    <div className={cx('modal-container')}>
                        {(function () {
                            if (loading) {
                                return (
                                    <>
                                        <Loading />
                                        <p>Publishing</p>
                                    </>
                                );
                            } else {
                                if (!error) {
                                    return (
                                        <>
                                            <img
                                                className={cx('check-circle-icon')}
                                                src={svg.checkCircle}
                                                alt="successful"
                                            />
                                            <p>Publishing is complete!</p>
                                            <div className={cx('control-wrapper')}>
                                                <Link to={'/write'}>
                                                    <Button
                                                        className={cx('control-btn')}
                                                        rounded
                                                        outline
                                                        onClick={handleOnClickWrite}
                                                    >
                                                        Write
                                                    </Button>
                                                </Link>
                                                <Link to={slug ? `/post/${slug}` : '/'}>
                                                    <Button className={cx('control-btn')} rounded outline>
                                                        View Post
                                                    </Button>
                                                </Link>
                                            </div>
                                        </>
                                    );
                                }
                            }
                        })()}
                    </div>
                </ModalBase>
            )}

            {showAddCategory && <ModalCategory setShowModal={setShowAddCategory} />}
        </div>
    );
}

export default Write;
