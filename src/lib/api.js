import axios from "axios";

/**
 * API helper functions. These wrappers around Axios demonstrate how the
 * frontend might communicate with a backend. In this demo implementation
 * the functions simply return resolved promises with dummy data.
 */
const client = axios.create({ baseURL: "https://api.mediscribe.ai/v1" });

export async function createSession(data) {
  // Replace this with: return client.post('/sessions', data);
  return Promise.resolve({ id: "sess_demo", ...data });
}

export async function getTranscript(sessionId) {
  // Replace this with: return client.get(`/sessions/${sessionId}/transcript`);
  return Promise.resolve({ transcript: [] });
}

export async function createSoap(sessionId) {
  // Replace this with: return client.post(`/sessions/${sessionId}/soap`);
  return Promise.resolve({
    soap: { subjective: "", objective: {}, assessment: "", plan: "" },
  });
}
