import fetchRequests from "./Fetch";

const providersCRUD = {
  getProviders: (id) => {
    return fetchRequests.get(`/api/admin/practices/${id}/providers/`);
  },
  createProvider: (id, body) => {
    return fetchRequests.post(`/api/admin/practices/${id}/providers/`, body);
  },

  getProviderBasicDetails: (practiceId, providerId) => {
    return fetchRequests.get(
      `/api/admin/practices/${practiceId}/providers/${providerId}/basicdetails/`
    );
  },
  updateProviderBasicDetails: (practiceId, providerId, body) => {
    return fetchRequests.put(
      `/api/admin/practices/${practiceId}/providers/${providerId}/basicdetails/`,
      body
    );
  },

  getProviderContactDetails: (practiceId, providerId) => {
    return fetchRequests.get(
      `/api/admin/practices/${practiceId}/providers/${providerId}/contactdetails/`
    );
  },
  updateProviderContactDetails: (practiceId, providerId, body) => {
    return fetchRequests.put(
      `/api/admin/practices/${practiceId}/providers/${providerId}/contactdetails/`,
      body
    );
  },

  getProviderLicenses: (practiceId, providerId) => {
    return fetchRequests.get(
      `/api/admin/practices/${practiceId}/providers/${providerId}/licenses/`
    );
  },
  updateProviderLicenses: (practiceId, providerId, body) => {
    return fetchRequests.put(
      `/api/admin/practices/${practiceId}/providers/${providerId}/licenses/`,
      body
    );
  },

  getProviderPortalLogins: (practiceId, providerId) => {
    return fetchRequests.get(
      `/api/admin/practices/${practiceId}/providers/${providerId}/portallogins/`
    );
  },
  updateProviderPortalLogins: (practiceId, providerId, body) => {
    return fetchRequests.put(
      `/api/admin/practices/${practiceId}/providers/${providerId}/portallogins/`,
      body
    );
  },

  getProviderEnrollments: (practiceId, providerId) => {
    return fetchRequests.get(
      `/api/admin/practices/${practiceId}/providers/${providerId}/enrollments/`
    );
  },
  updateProviderEnrollments: (practiceId, providerId, body) => {
    return fetchRequests.put(
      `/api/admin/practices/${practiceId}/providers/${providerId}/enrollments/`,
      body
    );
  },
};

export default providersCRUD;
