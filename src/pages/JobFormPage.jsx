import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createJob } from "../api/jobsApi";
import Container from "../ui/Container";
import Button from "../ui/Button";
import Input from "../ui/Input";
import styles from "./JobFormPage.module.css";

export default function JobFormPage({ mode }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        company: "",
        companyLogoUrl: "",
        companyLogoDataUrl: "",
        companyWebsite: "",
        position: "",
        contract: "Full Time",
        location: "",
        applyUrl: "",
        description: "",
        requirementsContent: "",
        requirementsItems: "",
        roleContent: "",
        roleItems: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, companyLogoDataUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({ ...prev, companyLogoDataUrl: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!formData.company || !formData.position) {
            setError("Company and Position are strictly required.");
            setLoading(false);
            return;
        }

        if (formData.applyUrl && !formData.applyUrl.startsWith("http")) {
            setError("Apply URL must be a valid link starting with http.");
            setLoading(false);
            return;
        }

        try {
            const newJob = {
                company: formData.company,
                companyLogoUrl: formData.companyLogoUrl,
                companyLogoDataUrl: formData.companyLogoDataUrl,
                companyWebsite: formData.companyWebsite,
                position: formData.position,
                postedAt: "Just now",
                contract: formData.contract,
                location: formData.location,
                applyUrl: formData.applyUrl,
                description: formData.description,
                requirements: {
                    content: formData.requirementsContent,
                    items: formData.requirementsItems.split("\n").map(i => i.trim()).filter(Boolean),
                },
                role: {
                    content: formData.roleContent,
                    items: formData.roleItems.split("\n").map(i => i.trim()).filter(Boolean),
                }
            };

            await createJob(newJob);
            navigate("/");
        } catch (err) {
            console.error(err);
            setError("Failed to create job. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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
                    <div className={styles.formCard}>
                        <h1 className={styles.pageTitle}>{mode === "create" ? "Create New Job" : "Edit Job"}</h1>

                        {error && <div className={styles.error}>{error}</div>}

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Basic Info</h2>

                                <div className={styles.formGroup}>
                                    <label htmlFor="company">Company Name</label>
                                    <div className={styles.inputWrap}>
                                        <Input id="company" name="company" value={formData.company} onChange={handleChange} required placeholder="e.g. Scoot" />
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="position">Position</label>
                                        <div className={styles.inputWrap}>
                                            <Input id="position" name="position" value={formData.position} onChange={handleChange} required placeholder="e.g. Senior Software Engineer" />
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="location">Location</label>
                                        <div className={styles.inputWrap}>
                                            <Input id="location" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. United Kingdom" />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="contract">Contract</label>
                                        <div className={styles.inputWrap}>
                                            <select id="contract" name="contract" value={formData.contract} onChange={handleChange} className={styles.select}>
                                                <option value="Full Time">Full Time</option>
                                                <option value="Part Time">Part Time</option>
                                                <option value="Freelance">Freelance</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label htmlFor="companyLogoUrl">Logo URL (Optional)</label>
                                        <div className={styles.inputWrap}>
                                            <Input id="companyLogoUrl" name="companyLogoUrl" value={formData.companyLogoUrl} onChange={handleChange} placeholder="https://..." />
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="logoFile">Upload Logo</label>
                                        <div className={styles.inputWrap}>
                                            <input type="file" id="logoFile" accept="image/*" onChange={handleFileChange} className={styles.fileInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Links</h2>
                                <div className={styles.row}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="companyWebsite">Company Website</label>
                                        <div className={styles.inputWrap}>
                                            <Input id="companyWebsite" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} placeholder="https://..." />
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="applyUrl">Apply URL</label>
                                        <div className={styles.inputWrap}>
                                            <Input id="applyUrl" name="applyUrl" value={formData.applyUrl} onChange={handleChange} placeholder="https://..." />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Details</h2>
                                <div className={styles.formGroup}>
                                    <label htmlFor="description">Description</label>
                                    <div className={styles.inputWrap}>
                                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required className={styles.textarea} rows={4} placeholder="Main job description..." />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>Requirements</h2>
                                <div className={styles.formGroup}>
                                    <label htmlFor="requirementsContent">Requirements Intro</label>
                                    <div className={styles.inputWrap}>
                                        <textarea id="requirementsContent" name="requirementsContent" value={formData.requirementsContent} onChange={handleChange} className={styles.textarea} rows={2} placeholder="Intro text for requirements..." />
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="requirementsItems">Requirements List (One per line)</label>
                                    <div className={styles.inputWrap}>
                                        <textarea id="requirementsItems" name="requirementsItems" value={formData.requirementsItems} onChange={handleChange} className={styles.textarea} rows={4} placeholder="- 5+ years experience&#10;- React framework" />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.section}>
                                <h2 className={styles.sectionTitle}>What You Will Do</h2>
                                <div className={styles.formGroup}>
                                    <label htmlFor="roleContent">Role Intro</label>
                                    <div className={styles.inputWrap}>
                                        <textarea id="roleContent" name="roleContent" value={formData.roleContent} onChange={handleChange} className={styles.textarea} rows={2} placeholder="Intro text for role..." />
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <label htmlFor="roleItems">Role List (One per line)</label>
                                    <div className={styles.inputWrap}>
                                        <textarea id="roleItems" name="roleItems" value={formData.roleItems} onChange={handleChange} className={styles.textarea} rows={4} placeholder="- Design architecture&#10;- Write code" />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.formActions}>
                                <Button type="button" variant="ghost" onClick={() => navigate(-1)}>Cancel</Button>
                                <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Job"}</Button>
                            </div>
                        </form>
                    </div>
                </Container>
            </main>
        </div>
    );
}
