import axios, { AxiosResponse } from 'axios';
import * as QueryString from 'query-string';
import { envs } from './constants';
import { getCookie, removeAllCookies } from './cookies';

export const forceLogout = () => {
  removeAllCookies();
  location.href = '/';
};

const Axios = axios.create({
  baseURL: envs.apiUrl,
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
  },
});

Axios.interceptors.request.use(
  async (config) => {
    const token = getCookie('acs_tkn');
    if (token) {
      if (config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject(error);
    }
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (error.response.data && error.response.data.error === 'invalid_token') {
        forceLogout();
      }
    }

    throw error;
  }
);

export const PostRequest = async ({
  url,
  body,
}: {
  url: string;
  body: object;
}): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(Axios.post(url, body));
    } catch (error) {
      reject(error);
    }
  });
};

export const PutRequest = async ({
  url,
  body,
}: {
  url: string;
  body: object;
}): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    try {
      resolve(Axios.put(url, body));
    } catch (error) {
      reject(error);
    }
  });
};

export const GetRequest = async ({
  url,
  queries,
}: {
  url: string;
  queries?: object;
}): Promise<AxiosResponse> => {
  return new Promise((resolve, reject) => {
    try {
      let urlQueries = url;
      if (queries) {
        urlQueries += `?${QueryString.stringify(queries)}`;
      }
      resolve(Axios.get(urlQueries));
    } catch (error) {
      reject(error);
    }
  });
};

export default Axios;
