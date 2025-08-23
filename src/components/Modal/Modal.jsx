import { useEffect, useRef } from "react";
import cn from "classnames";
import Icon from "../Icon/Icon"; // ← використовуємо твій Icon
import styles from "./Modal.module.css";

export default function Modal({
  isOpen,
  onClose,
  children,
  ariaLabel = "Modal dialog",
  contentClassName, // ← дозволяє перевизначити розмір/падинги
}) {
  const closeRef = useRef(null);

  // Esc + блокування скролу body
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // автофокус на кнопці закриття
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={cn(styles.modal, contentClassName)}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          className={styles.close}
          onClick={onClose}
          aria-label="Close"
        >
          <Icon name="icon-close" size={16} className={styles.closeIcon} />
        </button>
        {children}
      </div>
    </div>
  );
}
