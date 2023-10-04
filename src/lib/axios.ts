/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_HOST } from '$env/static/public';
import { isJSObject } from './ts-utils';
import type { AxiosRequestConfig } from 'axios';
import { language } from '@inlang/sdk-js';
import axios from 'axios';

export const BASE_URL = `${PUBLIC_HOST}/api` as const;

const BASE_CONFIG: AxiosRequestConfig<any> = { withCredentials: true };

const constructErrorMessage = (data: any, fallback_error_message: string) => {
  if (!isJSObject(data)) {
    return fallback_error_message;
  } else if (
    Object.prototype.hasOwnProperty.call(data, 'detail') &&
    typeof data.detail === 'string'
  ) {
    return data.detail;
  } else if (
    Object.prototype.hasOwnProperty.call(data, 'non_field_errors') &&
    typeof data.non_field_errors === 'object' &&
    Array.isArray(data.non_field_errors)
  ) {
    return data.non_field_errors.join(' ');
  } else {
    return fallback_error_message;
  }
};

type AxiosRequestParamsBase = {
  uri: string;
  server?: 'sveltekit' | 'django';
  config?: AxiosRequestConfig<any> | undefined;
};

export const baseGetQuery = async <T>(args: AxiosRequestParamsBase) => {
  const { uri, config, server = 'django' } = args;
  const pure_uri = `${uri.startsWith('/') ? uri : `/${uri}`}`;
  const getUri = server === 'django' ? `${BASE_URL}${pure_uri}` : `/${language}${pure_uri}`;
  console.log(getUri);
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
      const fallback_error_message = `Network response was not ok with status ${statusCode} (${res.statusText})`;
      errorMessage = constructErrorMessage(data, fallback_error_message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // data = error.response.data;
        statusCode = error.response.status;
        if (!errorMessage) {
          errorMessage = constructErrorMessage(error.response.data, error.message);
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
  const { uri, payload, config, useFormData = false, server = 'django' } = args;
  const pure_uri = `${uri.startsWith('/') ? uri : `/${uri}`}`;
  const postUri = server === 'django' ? `${BASE_URL}${pure_uri}` : `/${language}${pure_uri}`;
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
      const fallback_error_message = `Network response was not ok with status ${statusCode} (${res.statusText})`;
      errorMessage = constructErrorMessage(data, fallback_error_message);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // data = error.response.data;
        statusCode = error.response.status;
        if (!errorMessage) {
          errorMessage = constructErrorMessage(error.response.data, error.message);
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
