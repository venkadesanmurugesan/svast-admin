import fetchRequests from "./Fetch";

const ticketsCRUD = {
  getTickets: () => {
    return fetchRequests.get("/api/admin/tickets/");
  },
  createTicket: (body) => {
    return fetchRequests.post("/api/admin/tickets/", body);
  },
  updateTicket: (id, body) => {
    return fetchRequests.put(`/api/admin/tickets/${id}`, body);
  },
  createComment: (id, body) => {
    return fetchRequests.post(`/api/admin/tickets/${id}/comments`, body);
  },
  getComments: (id) => {
    return fetchRequests.get(`/api/admin/tickets/${id}/comments`);
  },
};

export default ticketsCRUD;
