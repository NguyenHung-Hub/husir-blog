import React from 'react';
import classNames from 'classnames/bind';
import styles from './ModalBase.module.scss';
import svg from '~/assets/svg';

const cx = classNames.bind(styles);

function ModalBase({ children, setShowModal, head = false }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container-modal')}>
                {head && (
                    <div className={cx('head')} onClick={() => setShowModal(false)}>
                        <img className={cx('close-btn')} src={svg.cross} alt="close btn" />
                    </div>
                )}

                {children}
            </div>
        </div>
    );
}

export default ModalBase;
