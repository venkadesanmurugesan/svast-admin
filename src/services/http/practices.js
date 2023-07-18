import fetchRequests from "./Fetch";

const practicesCRUD = {
  getPractices: () => {
    return fetchRequests.get("/api/admin/practices/");
  },
  getPractice: (id) => {
    return fetchRequests.get(`/api/admin/practices/${id}`);
  },
  createPractice: (body) => {
    return fetchRequests.post("/api/admin/practices/", body);
  },
  getPracticeBasicDetails: (id) => {
    return fetchRequests.get(`/api/admin/practices/${id}/basicdetails/`);
  },
  updatePracticeBasicDetails: (id, body) => {
    return fetchRequests.put(`/api/admin/practices/${id}/basicdetails/`, body);
  },
  getPracticeContactDetails: (id) => {
    return fetchRequests.get(`/api/admin/practices/${id}/contactdetails/`);
  },
  updatePracticeContactDetails: (id, body) => {
    return fetchRequests.put(
      `/api/admin/practices/${id}/contactdetails/`,
      body
    );
  },
  getPracticeLicenseDetails: (id) => {
    return fetchRequests.get(`/api/admin/practices/${id}/licenses/`);
  },
  updatePracticeLicenseDetails: (id, body) => {
    return fetchRequests.put(`/api/admin/practices/${id}/licenses/`, body);
  },

  getPracticeEnrollmentDetails: (id) => {
    return fetchRequests.get(`/api/admin/practices/${id}/enrollments/`);
  },
  updatePracticeEnrollmentDetails: (id, body) => {
    return fetchRequests.put(`/api/admin/practices/${id}/enrollments/`, body);
  },

  getPracticePortalLoginDetails: (id) => {
    return fetchRequests.get(`/api/admin/practices/${id}/portallogins/`);
  },
  updatePracticePortalLoginDetails: (id, body) => {
    return fetchRequests.put(`/api/admin/practices/${id}/portallogins/`, body);
  },
};

export default practicesCRUD;
