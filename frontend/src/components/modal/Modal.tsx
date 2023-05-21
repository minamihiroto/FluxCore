import React from 'react';
import styles from './style/Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className={styles.modalBackground}
    >
      <div className={styles.modalBody}>
        {children}
        <button onClick={onClose} className={styles.cancelButton}>
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default Modal;
