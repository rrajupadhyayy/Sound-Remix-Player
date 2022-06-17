import { useState } from 'react';

export enum LoadingState {
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
  DEFAULT = 'default',
}

export default function useLoader(initialState?: LoadingState) {
  const [loadingStatus, setLoadingStatus] = useState<LoadingState>(
    initialState || LoadingState.DEFAULT,
  );

  async function loaderFunction({
    callbackFunction,
    params,
  }: {
    callbackFunction: Function;
    params: any;
  }) {
    setLoadingStatus(LoadingState.LOADING);
    const response = await callbackFunction(params);
    const statusChange = response ? LoadingState.SUCCESS : LoadingState.ERROR;
    setLoadingStatus(statusChange);
    return response;
  }

  return {
    loadingStatus,
    setLoadingStatus,
    loaderFunction,
  };
}
