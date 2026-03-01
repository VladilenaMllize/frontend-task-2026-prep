import Input from "../ui/Input";
import Checkbox from "../ui/Checkbox";
import Button from "../ui/Button";
import styles from "./FiltersBar.module.css";

export default function FiltersBar() {
  return (
    <form className={styles.filters} onSubmit={(e) => { e.preventDefault(); onSearch?.(); }}>
      <div className={styles.cell}>
        <img src="/search.svg" alt="" className={styles.icon} aria-hidden="true" />
        <Input
          placeholder="Filter by title, companies, expertise..."
        />
      </div>

      <div className={styles.cell}>
        <img src="/location.svg" alt="" className={styles.icon} aria-hidden="true" />
        <Input
          placeholder="Filter by location..."
        />
      </div>

      <div className={`${styles.cell} ${styles.cellCompact}`}>
        <Checkbox
          label="Full Time Only"
        />
      </div>

      <div className={`${styles.cell} ${styles.cellButton}`}>
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}