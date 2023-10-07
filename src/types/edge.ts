declare global {
  type AwaitedArrayData<T> = {
    metadata: {
      page_ended: boolean;
    };
    data: Array<T>;
  };
}

export type module = unknown;
