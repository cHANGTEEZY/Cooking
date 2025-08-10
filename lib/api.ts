import apiClient from "./apiClient";

const api = {
  get: async <T>(url: string, params?: object): Promise<T> => {
    const res = await apiClient.get(url, {
      params,
    });
    return res.data;
  },

  post: async <T>(url: string, data?: object): Promise<T> => {
    const res = await apiClient.post(url, data);
    return res.data;
  },

  put: async <T>(url: string, data?: object): Promise<T> => {
    const res = await apiClient.put(url, data);
    return res.data;
  },

  patch: async <T>(url: string, data?: object): Promise<T> => {
    const res = await apiClient.patch(url, data);
    return res.data;
  },

  delete: async <T>(url: string): Promise<T> => {
    const res = await apiClient.delete(url);
    return res.data;
  },
};

export default api;
