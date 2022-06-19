// Hook to manage loading state
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
  // App handled on 4 states defined on enum LoadingState
  // Using single state to avoid multiple redundant state management (isLoading/isSuccessful/isError)

  async function loaderFunction({
    callbackFunction,
    params,
  }: {
    callbackFunction: Function;
    params: any;
  }) {
    // common loader function that takes a function and params as its input
    // once it completes execution the loadingStatus state is updated accordingly
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
