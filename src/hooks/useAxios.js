import { useCallback, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import  {authApi}  from '../api/authApi';
import {toast} from 'react-hot-toast'

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true
});

export const useAxios = () => {
  const { token, setToken } = useAuthContext();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const refreshToken = useCallback(
    async (config, cb) => {
      try {
        const response = await instance.request({
          method: 'POST',
          url: authApi.refresh
        });
        if (response?.data?.token) {
          setToken(response.data.token);
          try {
            const newConfig = {
              ...config,
              headers: {
                Authorization: `Bearer ${response.data.token}`
              }
            };
            const result = await instance.request(newConfig);
            if (result?.data && cb) {
              cb(result.data);
            }
          } catch (e) {
            // setError(e?.response?.data || e);
            toast.error(e.message);
          }
        }
      } catch (e) {
        toast.error(e.message);
      }
    },
    [setToken]
  );

  const sendRequest = useCallback(
    async (config, cb) => {
      setError(null);
      setIsLoading(true);

      try {
        if (token) {
          config.headers = {
            Authorization: `Bearer ${token}`
          };
        }
        const result = await instance.request(config);
        if (result?.data && cb) {
          cb(result.data);
        }
      } catch (e) {
        e?.response?.status === 403 ? refreshToken(config, cb) : setError(e?.response?.data || e);
      } finally {
        setIsLoading(false);
      }
    },
    [token, refreshToken]
  );

  return { error, isLoading, sendRequest };
};