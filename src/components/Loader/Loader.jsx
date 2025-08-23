import styles from "./Loader.module.css";

export default function Loader({ size = "md" }) {
  return (
    <div className={styles.wrapper} role="status" aria-label="Loading">
      <span className={`${styles.spinner} ${styles[size]}`} />
    </div>
  );
}
