import styles from "./Button.module.css";

export default function Button({ variant = "primary", className = "", ...props }) {
  const cls = variant === "ghost" ? styles.ghost : styles.primary;
  return <button className={`${styles.btn} ${cls} ${className}`} {...props} />;
}