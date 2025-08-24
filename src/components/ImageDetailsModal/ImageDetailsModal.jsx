import css from './ImageDetailsModal.module.css';
import Modal from 'react-modal';
import Icon from '../Icon/Icon.jsx';

Modal.setAppElement('#root');

const ImageDetailsModal = ({ modalIsOpen, closeModal, src }) => {
    return (
        <Modal isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className={css.modalContent}
            overlayClassName={css.modalOverlay}
            contentLabel='Image Modal' >
            <div className={css.containerHeder}>
                <button className={css.btn}
                    aria-label='Close Modal Button'
                    onClick={closeModal}>
                    <Icon id='icon-close' width={15} height={14} className={css.icon}/>
                </button>
            </div>
            <img src={src}/>
            </Modal>
    )

}
export default ImageDetailsModal