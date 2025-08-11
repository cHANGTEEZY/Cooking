import { createAuthenticatedApiClient } from "./apiClient";

export interface CreateUserRequest {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface CreateUserResponse {
  id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  statusCode: string;
}

export const createUser = async (
  userData: CreateUserRequest,
  token: string | null
): Promise<CreateUserResponse> => {
  const client = createAuthenticatedApiClient(token);
  const response = await client.post<CreateUserResponse>(
    "/api/users",
    userData
  );
  return response.data;
};

const api = {
  get: async <T>(
    url: string,
    params?: object,
    token?: string | null
  ): Promise<T> => {
    const client = createAuthenticatedApiClient(token || null);
    const res = await client.get(url, {
      params,
    });
    return res.data;
  },

  post: async <T>(
    url: string,
    data?: object,
    token?: string | null
  ): Promise<T> => {
    const client = createAuthenticatedApiClient(token || null);
    const res = await client.post(url, data);
    return res.data;
  },

  put: async <T>(
    url: string,
    data?: object,
    token?: string | null
  ): Promise<T> => {
    const client = createAuthenticatedApiClient(token || null);
    const res = await client.put(url, data);
    return res.data;
  },

  patch: async <T>(
    url: string,
    data?: object,
    token?: string | null
  ): Promise<T> => {
    const client = createAuthenticatedApiClient(token || null);
    const res = await client.patch(url, data);
    return res.data;
  },

  delete: async <T>(url: string, token?: string | null): Promise<T> => {
    const client = createAuthenticatedApiClient(token || null);
    const res = await client.delete(url);
    return res.data;
  },
};

export default api;
