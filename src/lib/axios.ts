/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_HOST } from '$env/static/public';
import { isJSObject } from './ts-utils';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export const BASE_URL = `${PUBLIC_HOST}/api` as const;

const BASE_CONFIG: AxiosRequestConfig<any> = { withCredentials: true };

type AxiosRequestParamsBase = {
  uri: string;
  config?: AxiosRequestConfig<any> | undefined;
};

export const baseGetQuery = async <T>(args: AxiosRequestParamsBase) => {
  const { uri, config } = args;
  const getUri = `${BASE_URL}${uri.startsWith('/') ? uri : `/${uri}`}`;
  let data: T | undefined = undefined;
  let errorMessage = '';
  let statusCode = 400;
  try {
    const res = await axios.get<T>(getUri, {
      ...BASE_CONFIG,
      ...config
    });
    statusCode = res.status;
    const statusOK = `${statusCode}`.startsWith('2');
    if (statusOK) {
      data = res.data;
    } else {
      if (
        isJSObject(data) &&
        Object.prototype.hasOwnProperty.call(data, 'detail') &&
        typeof (data as any).detail === 'string'
      ) {
        errorMessage = (data as any).detail;
      } else {
        errorMessage = `Network response was not ok with status ${statusCode} (${res.statusText})`;
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // data = error.response.data;
        statusCode = error.response.status;
        if (!errorMessage) {
          if (
            isJSObject(error.response.data) &&
            Object.prototype.hasOwnProperty.call(error.response.data, 'detail') &&
            typeof error.response.data.detail === 'string'
          ) {
            errorMessage = error.response.data.detail;
          } else {
            errorMessage = error.message;
          }
        }
      }
    }
    console.error(error);
  }
  return {
    statusCode,
    errorMessage,
    data
  };
};

export const basePostQuery = async <T>(
  args: AxiosRequestParamsBase & {
    useFormData?: boolean;
    payload: any;
  }
) => {
  const { uri, payload, config, useFormData = false } = args;
  const postUri = `${BASE_URL}${uri.startsWith('/') ? uri : `/${uri}`}`;
  let final_payload: any = payload;
  if (useFormData && isJSObject(payload)) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(payload)) {
      formData.append(key, value as string | Blob);
    }
    final_payload = formData;
  }
  let data: T | undefined = undefined;
  let errorMessage = '';
  let statusCode = 400;
  try {
    const res = await axios.post<T>(postUri, final_payload, {
      ...BASE_CONFIG,
      ...config
    });
    statusCode = res.status;
    const statusOK = `${statusCode}`.startsWith('2');
    if (statusOK) {
      data = res.data;
    } else {
      if (
        isJSObject(data) &&
        Object.prototype.hasOwnProperty.call(data, 'detail') &&
        typeof (data as any).detail === 'string'
      ) {
        errorMessage = (data as any).detail;
      } else {
        errorMessage = `Network response was not ok with status ${statusCode} (${res.statusText})`;
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // data = error.response.data;
        statusCode = error.response.status;
        if (!errorMessage) {
          if (
            isJSObject(error.response.data) &&
            Object.prototype.hasOwnProperty.call(error.response.data, 'detail') &&
            typeof error.response.data.detail === 'string'
          ) {
            errorMessage = error.response.data.detail;
          } else {
            errorMessage = error.message;
          }
        }
      }
    }
    console.error(error);
  }
  return {
    statusCode,
    errorMessage,
    data
  };
};
