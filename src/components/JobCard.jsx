import { Link } from "react-router-dom";
import styles from "./JobCard.module.css";

function getLogoSrc(job) {
  return job.companyLogoDataUrl || job.companyLogoUrl || "/logos/placeholder.svg";
}

export default function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job.id}`} className={styles.card}>
      <img className={styles.logo} src={getLogoSrc(job)} alt={`${job.company} logo`} />

      <div className={styles.actionBtns}>
        <button
          className={styles.iconBtn}
          onClick={(e) => {
            e.preventDefault();
            // To be implemented by students
          }}
          aria-label="Edit job"
        >
          <img src="/edit.png" alt="" aria-hidden="true" className={styles.actionIcon} />
        </button>

        <button
          className={styles.iconBtn}
          onClick={(e) => {
            e.preventDefault();
            // To be implemented by students
          }}
          aria-label="Delete job"
        >
          <img src="/bin.png" alt="" aria-hidden="true" className={styles.actionIcon} />
        </button>
      </div>

      <div className={styles.meta}>
        <span>{job.postedAt}</span>
        <span className={styles.dot}>•</span>
        <span>{job.contract}</span>
      </div>

      <div className={styles.title}>{job.position}</div>
      <div className={styles.company}>{job.company}</div>

      <div className={styles.location}>{job.location}</div>
    </Link>
  );
}