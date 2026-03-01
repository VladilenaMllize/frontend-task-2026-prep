import styles from "./Checkbox.module.css";

export default function Checkbox({ label, className = "", ...props }) {
  return (
    <label className={`${styles.checkbox} ${className}`}>
      <input className={styles.box} type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
}