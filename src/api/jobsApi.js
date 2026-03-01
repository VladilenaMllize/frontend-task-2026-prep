import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:4000"
});

export async function getJobs(params) {
  const res = await http.get("/jobs", { params });
  return res.data;
}

export async function getJob(id) {
  const res = await http.get(`/jobs/${id}`);
  return res.data;
}

export async function createJob(payload) {
  const res = await http.post("/jobs", payload);
  return res.data;
}

export async function updateJob(id, payload) {
  const res = await http.put(`/jobs/${id}`, payload);
  return res.data;
}

export async function deleteJob(id) {
  await http.delete(`/jobs/${id}`);
}