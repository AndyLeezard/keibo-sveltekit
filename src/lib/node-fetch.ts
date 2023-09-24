/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_HOST } from '$env/static/public';
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { isJSObject } from './ts-utils';

declare global {
  type TGenericFetchResponse<T> = {
    statusCode: number;
    /** Data if things went south */
    errorMessage: null | string;
    /** Data if things went alright */
    data: T | null;
  };
}

export const BASE_URL = `${PUBLIC_HOST}/api` as const;
export const REQUEST_INIT: RequestInit = {
  credentials: 'include'
  // mode: 'cors'
};
type ResDataType = Extract<keyof Body, 'json' | 'arrayBuffer' | 'text' | 'blob' | 'formData'>;
export const baseFetchQuery = async <T, DT extends ResDataType = 'json'>(args: {
  uri: string;
  init?: RequestInit;
  resDataType?: DT;
}): Promise<TGenericFetchResponse<T>> => {
  const { uri, init, resDataType = 'json' } = args;
  let statusCode = 0;
  let errorMessage = null;
  let data = null;
  try {
    const response = await fetch(uri, init);
    statusCode = response.status;
    const as_data = (await response[resDataType]()) as Awaited<ReturnType<Body[DT]>>;
    if (!response.ok) {
      if (
        typeof as_data === 'object' &&
        'detail' in as_data &&
        typeof as_data.detail === 'string'
      ) {
        errorMessage = as_data.detail as string;
      } else {
        errorMessage = `Network response was not ok with status ${statusCode} (${response.statusText})`;
      }
      throw new Error(errorMessage);
    } else {
      data = as_data;
    }
  } catch (error) {
    console.error(error);
  }
  return {
    statusCode,
    errorMessage,
    data
  };
};
