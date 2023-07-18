// import axios from "axios";

// const AxiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_SVAST_API_BASE_URL,
//   timeout: 500000,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// const responseBody = (response) => response.data;

// const axiosRequests = {
//   get: (url) => AxiosInstance.get(url).then(responseBody),

//   post: (url, body, headers) =>
//     AxiosInstance.post(url, body, headers).then(responseBody),

//   put: (url, body) => AxiosInstance.put(url, body).then(responseBody),
//   delete: (url, body) => AxiosInstance.delete(url, body).then(responseBody),
// };

// export default axiosRequests;

const baseUrl = import.meta.env.VITE_SVAST_API_BASE_URL;

const fetchRequests = {
  get: (url) => fetch(baseUrl + url).then((response) => response.json()),
  post: (url, body, headers) =>
    fetch(baseUrl + url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify(body),
    }).then((response) => response.json()),

  put: (url, body) =>
    fetch(baseUrl + url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => response.json()),

  delete: (url) =>
    fetch(baseUrl + url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((response) => response.json()),
};

export default fetchRequests;
