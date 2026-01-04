import styles from "./BaseModal.module.css";

export const BaseModal = ({ onClose, children, variant = "" }) => {
  return (
    <div
      className={`${styles.modal} ${variant ? styles[variant] : ""}`}
      onClick={onClose}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};
