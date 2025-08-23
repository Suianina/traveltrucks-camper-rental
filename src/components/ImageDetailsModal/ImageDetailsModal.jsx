import Modal from "../Modal/Modal";
import s from "./ImageDetailsModal.module.css";

export default function ImageDetailsModal({ isOpen, onClose, src, alt }) {
  if (!src) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Image modal"
      contentClassName={s.modalWide} // ширший контейнер під зображення
    >
      <img className={s.img} src={src} alt={alt || "Image"} />
    </Modal>
  );
}
