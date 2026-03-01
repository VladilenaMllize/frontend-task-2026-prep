import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getJob } from "../api/jobsApi";
import Container from "../ui/Container";
import Button from "../ui/Button";
import styles from "./JobDetailsPage.module.css";

export default function JobDetailsPage() {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = await getJob(id);
                setJob(data);
            } catch (err) {
                setError("Failed to fetch job details.");
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (loading) {
        return (
            <div className={styles.page}>
                <header className={styles.hero}>
                    <Container>
                        <div className={styles.topRow}>
                            <Link to="/" className={styles.brand}>devjobs</Link>
                        </div>
                    </Container>
                </header>
                <main className={styles.mainContent}>
                    <Container>
                        <div className={styles.state}>Loading job details...</div>
                    </Container>
                </main>
            </div>
        );
    }

    if (error || !job) {
        return (
            <div className={styles.page}>
                <header className={styles.hero}>
                    <Container>
                        <div className={styles.topRow}>
                            <Link to="/" className={styles.brand}>devjobs</Link>
                        </div>
                    </Container>
                </header>
                <main className={styles.mainContent}>
                    <Container>
                        <div className={styles.state}>{error || "Job not found."}</div>
                    </Container>
                </main>
            </div>
        );
    }

    const logoSrc = job.companyLogoDataUrl || job.companyLogoUrl || "/logos/placeholder.svg";

    let hostname = "company.com";
    try {
        hostname = new URL(job.companyWebsite || "https://example.com").hostname;
    } catch (e) {
        // ignore
    }

    return (
        <div className={styles.page}>
            <header className={styles.hero}>
                <Container>
                    <div className={styles.topRow}>
                        <Link to="/" className={styles.brand}>devjobs</Link>
                    </div>
                </Container>
            </header>

            <main className={styles.mainContent}>
                <Container>
                    {/* Header Card */}
                    <div className={styles.headerCard}>
                        <div className={styles.logoWrap}>
                            <img src={logoSrc} alt={`${job.company} logo`} className={styles.logo} />
                        </div>

                        <div className={styles.companyInfoWrap}>
                            <div className={styles.companyInfoText}>
                                <h1 className={styles.companyName}>{job.company}</h1>
                                <p className={styles.companySite}>{hostname}</p>
                            </div>
                            <a href={job.companyWebsite} target="_blank" rel="noreferrer" className={styles.companyLink}>
                                <button className={styles.companyButton}>Company Site</button>
                            </a>
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className={styles.detailsCard}>
                        <div className={styles.jobHeader}>
                            <div className={styles.jobHeaderLeft}>
                                <div className={styles.meta}>
                                    <span>{job.postedAt}</span>
                                    <span className={styles.dot}>•</span>
                                    <span>{job.contract}</span>
                                </div>
                                <h2 className={styles.position}>{job.position}</h2>
                                <div className={styles.location}>{job.location}</div>
                            </div>

                            <div className={styles.jobHeaderRight}>
                                <div className={styles.actionBtns}>
                                    <button
                                        className={styles.iconBtn}
                                        onClick={() => {
                                            // To be implemented by students
                                        }}
                                        aria-label="Edit job"
                                        title="Edit job"
                                    >
                                        <img src="/edit.png" alt="" aria-hidden="true" className={styles.actionIcon} />
                                    </button>
                                    <button
                                        className={styles.iconBtn}
                                        onClick={() => {
                                            // To be implemented by students
                                        }}
                                        aria-label="Delete job"
                                        title="Delete job"
                                    >
                                        <img src="/bin.png" alt="" aria-hidden="true" className={styles.actionIcon} />
                                    </button>
                                </div>
                                <a href={job.applyUrl} target="_blank" rel="noreferrer" className={styles.applyBtnTop}>
                                    <Button>Apply Now</Button>
                                </a>
                            </div>
                        </div>

                        <p className={styles.description}>{job.description}</p>

                        <h3 className={styles.sectionTitle}>Requirements</h3>
                        <p className={styles.description}>{job.requirementsData}</p>
                        <ul className={styles.ul}>
                            {job.requirementsList?.map((item, idx) => (
                                <li key={idx}><span>{item}</span></li>
                            ))}
                        </ul>

                        <h3 className={styles.sectionTitle}>What You Will Do</h3>
                        <p className={styles.description}>{job.roleData}</p>
                        <ol className={styles.ol}>
                            {job.roleList?.map((item, idx) => (
                                <li key={idx}><span>{item}</span></li>
                            ))}
                        </ol>
                    </div>
                </Container>
            </main>

            {/* Footer Strip */}
            <footer className={styles.footer}>
                <Container>
                    <div className={styles.footerInner}>
                        <div className={styles.footerInfo}>
                            <h3 className={styles.footerPosition}>{job.position}</h3>
                            <p className={styles.footerCompany}>{job.company}</p>
                        </div>
                        <a href={job.applyUrl} target="_blank" rel="noreferrer" className={styles.applyBtnBottom}>
                            <Button>Apply Now</Button>
                        </a>
                    </div>
                </Container>
            </footer>
        </div>
    );
}
