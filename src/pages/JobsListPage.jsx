import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../api/jobsApi";
import Container from "../ui/Container";
import FiltersBar from "../components/FiltersBar";
import JobCard from "../components/JobCard";
import Button from "../ui/Button";
import styles from "./JobsListPage.module.css";

export default function JobsListPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await getJobs();

      const responseData = data.map(job => job);
      setJobs(responseData.slice(0, responseData.length - 1));

      setLoading(false);
    })();
  }, []);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <Container>
          <div className={styles.topRow}>
            <div className={styles.brand}>devjobs</div>
          </div>

          <div className={styles.filtersWrap}>
            <FiltersBar />
          </div>
        </Container>
      </header>

      <main>
        <Container>
          <div className={styles.listHeader}>
            <Link to="/jobs/new" className={styles.createLink}>
              <Button>+Create Job</Button>
            </Link>
          </div>

          {loading ? (
            <div className={styles.state}>Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className={styles.state}>No jobs available.</div>
          ) : (
            <div className={styles.grid}>
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </Container>
      </main>
    </div>
  );
}