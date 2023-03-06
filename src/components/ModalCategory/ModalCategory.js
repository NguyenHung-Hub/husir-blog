import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ModalCategory.module.scss';
import ModalBase from '../Modal/ModalBase';
import Button from '../Button';
import * as categoryService from '~/services/category.service';

const cx = classNames.bind(styles);

function ModalCategory({ setShowModal }) {
    const [categoryName, setCategoryName] = useState('');

    const [error, setError] = useState(null);

    const categoryNameOnChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleSaveCategory = async () => {
        if (categoryName === '') {
            return;
        }

        try {
            const res = await categoryService.save(categoryName);

            if (res?.error) {
                setError(res.error);
            }
            setShowModal(false);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ModalBase setShowModal={setShowModal}>
            <div className={cx('modal-container')}>
                <div className={cx('body')}>
                    <input
                        className={cx('category-input')}
                        type="text"
                        placeholder="New category"
                        value={categoryName}
                        onChange={categoryNameOnChange}
                    />

                    <div className={cx('error')}>{error}</div>
                </div>
                <div className={cx('footer')}>
                    <Button primary className={cx('btn')} onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button success className={cx('btn')} onClick={handleSaveCategory}>
                        Save
                    </Button>
                </div>
            </div>
        </ModalBase>
    );
}

export default ModalCategory;
