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
import { PostContext } from '~/contexts/PostContext/PostProvider';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const cx = classNames.bind(styles);

function Write() {
    const { postsState } = useContext(PostContext);
    const { postEdit } = postsState;

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(postEdit ? postEdit.title : '');
    const [content, setContent] = useState(postEdit ? postEdit.description : '');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(postEdit ? postEdit.categories : 'choose category');

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAddCategory, setShowAddCategory] = useState(false);

    const [updateMode, setUpdateMode] = useState(postEdit ? true : false);

    const [slug, setSlug] = useState('');
    const { authState } = useContext(AuthContext);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ['large', false, 'large', 'huge'] }],
            [{ color: [] }, { background: [] }],
            ['bold', 'italic', 'underline', 'stricke', 'blockquote', 'code-block'],
            [{ list: 'odered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link'],
        ],
    };

    useEffect(() => {
        document.title = title || 'Write';
    }, [title]);

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
        if (!file && !updateMode) {
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
            author: authState.user._id,
            username: authState.user.username,
            title,
            description: content,
            photo: postEdit?.photo || '',
            categories: category,
        };

        if (file) {
            try {
                const data = new FormData();
                data.append('image', file);

                const resultUpload = await uploadService.uploadImage(data);
                newPost.photo = resultUpload.url;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }

        try {
            let result;

            if (updateMode) {
                newPost._id = postEdit._id;
                result = await postService.update(newPost);
            } else {
                result = await postService.savePost(newPost);
            }

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
            const res = await categoryService.getAll();
            setCategories(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, [showAddCategory]);

    console.log(content);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('choose-img-wrapper')}>
                {(function () {
                    if (file) {
                        return (
                            <div className={cx('img-wrapper')}>
                                <label htmlFor="file" className={cx('btn-select')}>
                                    <img className={cx('camera-icon')} src={svg.camera} alt="camera icon" />
                                </label>
                                <img className={cx('post-img')} src={file.preview} alt="img" />
                            </div>
                        );
                    }
                    if (postsState.postEdit?.photo) {
                        return (
                            <div className={cx('img-wrapper')}>
                                <label htmlFor="file" className={cx('btn-select')}>
                                    <img className={cx('camera-icon')} src={svg.camera} alt="camera icon" />
                                </label>
                                <img className={cx('post-img')} src={postsState.postEdit.photo} alt="img" />
                            </div>
                        );
                    }

                    return (
                        <div className={cx('not-selected')}>
                            <label htmlFor="file" className={cx('label-select')}>
                                Choose image
                            </label>
                        </div>
                    );
                })()}

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
                    // defaultValue="choose category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    title="choose category"
                >
                    <option value="choose category">choose category </option>
                    {categories &&
                        categories.map((category, index) => (
                            <option key={index} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                </select>
                <Button className={cx('new-category-btn')} onClick={() => setShowAddCategory(true)}>
                    <img src={svg.plusCircle} alt="plus icon" />
                </Button>
            </div>
            {/* <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={cx('post-content-input')}
                placeholder="Write now..."
            ></textarea> */}

            <div className="editor-wrapper">
                <ReactQuill
                    className={cx('post-content-input')}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                />
            </div>

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
                                            <p>{updateMode ? 'Update' : 'Publishing'} is complete!</p>
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
