import styles from "./ShareButton.module.css";

export const ShareButton = ({ onClick = null, img, platform }) => {
  return (
    <button className={styles.share_button} onClick={onClick}>
      <img src={img} alt={platform} />
    </button>
  );
};
