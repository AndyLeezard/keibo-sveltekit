/* eslint-disable @typescript-eslint/no-explicit-any */
import { PUBLIC_HOST } from '$env/static/public';

declare global {
  type TGenericFetchResponse<T> = {
    statusCode: number;
    /** Data if things went south */
    errorMessage: null | string;
    /** Data if things went alright */
    data: T | null;
  };
  type TGenericFetchArg<DT> = {
    uri: string;
    resDataType?: DT;
    noContentExpected?: boolean;
  };
}

export const BASE_URL = `${PUBLIC_HOST}/api` as const;
export const REQUEST_INIT: RequestInit = {
  credentials: 'include'
  // mode: 'cors'
};
type ResDataType = Extract<keyof Body, 'json' | 'arrayBuffer' | 'text' | 'blob' | 'formData'>;
export const baseFetchQuery = async <T, DT extends ResDataType = 'json'>(
  args: TGenericFetchArg<DT> & {
    init?: RequestInit;
  }
): Promise<TGenericFetchResponse<T>> => {
  const { uri, init, noContentExpected = false, resDataType = 'json' } = args;
  let statusCode = 0;
  let errorMessage: string | null = null;
  let data = null;
  try {
    const response = await fetch(uri, init);
    statusCode = response.status;
    let parsed_data: any = null;
    if (!noContentExpected) {
      parsed_data = (await response[resDataType]()) as Awaited<ReturnType<Body[DT]>>;
    }
    if (!response.ok) {
      if (typeof parsed_data === 'object') {
        if ('detail' in parsed_data && typeof parsed_data.detail === 'string') {
          errorMessage = parsed_data.detail as string;
        }
        if ('non_field_errors' in parsed_data) {
          errorMessage = JSON.stringify(parsed_data.non_field_errors);
        }
      } else {
        errorMessage = `Network response was not ok with status ${statusCode} (${response.statusText})`;
      }
      throw new Error(`${errorMessage}`);
    } else {
      data = parsed_data;
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
export const fetchPostQuery = async <T, DT extends ResDataType = 'json'>(
  args: TGenericFetchArg<DT> & {
    payload: any;
  }
) => {
  const { uri, payload, resDataType, noContentExpected = false } = args;
  return await baseFetchQuery<T, DT>({
    uri,
    init: {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        credentials: 'include',
        'Content-Type': 'application/json'
      }
    },
    resDataType,
    noContentExpected
  });
};

export const fetchGetQuery = async <T, DT extends ResDataType = 'json'>(
  args: TGenericFetchArg<DT>
) => {
  const { uri, resDataType, noContentExpected = false } = args;
  return await baseFetchQuery<T, DT>({
    uri,
    init: {
      method: 'GET',
      headers: {
        credentials: 'include'
      }
    },
    resDataType,
    noContentExpected
  });
};
