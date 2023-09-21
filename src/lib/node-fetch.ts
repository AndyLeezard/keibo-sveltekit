/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_HOST } from '$env/static/public';

declare global {
  type TGenericFetchResponse<T> = {
    statusCode: number;
    networkError: boolean;
    data: T | null;
  };
}

export const BASE_URL = `${PUBLIC_HOST}/api` as const;
export const REQUEST_INIT = {
  credentials: 'include',
  mode: 'cors'
} as const;
export const FIELD_ERROR: TGenericFetchResponse<null> = {
  statusCode: 0,
  networkError: true,
  data: null
};
export const baseFetchQuery = async <
  T,
  DT extends Extract<keyof Body, 'json' | 'arrayBuffer' | 'text' | 'blob' | 'formData'> = 'json'
>(args: {
  uri: string;
  statusCode?: number;
  networkError?: boolean;
  data?: any;
  init?: RequestInit;
  resDataType?: DT;
}): Promise<TGenericFetchResponse<T>> => {
  let { statusCode = 0, networkError = false, data = null } = args;
  const { uri, init, resDataType = 'json' } = args;
  try {
    const response = await fetch(uri, init);
    statusCode = response.status;
    if (!response.ok) {
      throw new Error(
        `Network response was not ok with status ${statusCode} - ${response.statusText}`
      );
    }
    const as_json = (await response[resDataType]()) as Awaited<ReturnType<Body[DT]>>;
    data = as_json;
  } catch (error) {
    console.error(error);
    if (!statusCode) {
      networkError = true;
    }
  }
  return {
    statusCode,
    networkError,
    data
  };
};
