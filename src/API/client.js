import client from ".";
import { METHODS } from "../constants";

export const api = {
  USERS: {
    getAll: ({ data, ...config }) => client({ url: "/users", data, ...config }),
    get: ({ id, data, ...config }) =>
      client({ url: `/users/${id}`, data, ...config }),
    create: ({ data, ...config }) =>
      client({ method: METHODS.POST, url: "/users", data, ...config }),
    update: ({ id, data, ...config }) =>
      client({ method: METHODS.PUT, url: `/users/${id}`, data, ...config }),
    patch: ({ id, data, ...config }) =>
      client({ method: METHODS.PATCH, url: `/users/${id}`, data, ...config }),
    delete: ({ id, ...config }) =>
      client({ method: METHODS.DELETE, url: `/users/${id}`, ...config }),
  },
  TASKS: {
    getAll: ({ data, ...config }) => client({ url: "/tasks", data, ...config }),
    get: ({ id, data, ...config }) =>
      client({ url: `/tasks/${id}`, data, ...config }),
    create: ({ data, ...config }) =>
      client({ method: METHODS.POST, url: "/tasks", data, ...config }),
    update: ({ id, data, ...config }) =>
      client({ method: METHODS.PUT, url: `/tasks/${id}`, data, ...config }),
    patch: ({ id, data, ...config }) =>
      client({ method: METHODS.PATCH, url: `/tasks/${id}`, data, ...config }),
    delete: ({ id, ...config }) =>
      client({ method: METHODS.DELETE, url: `/tasks/${id}`, ...config }),
  },
};
