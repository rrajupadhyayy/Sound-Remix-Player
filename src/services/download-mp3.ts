import genericError from 'utils/generic-error';
import RNFetchBlob from 'rn-fetch-blob';
import { getLocalData, storeLocalData } from 'utils/local-storage';
import {
  defaulDownloadParams,
  downloadPath,
  SoundFileNames,
} from './download.constants';

export function getFileNamWithExtension(fileName: string) {
  return `/${fileName}.mp3`;
}
export async function downloadMP3({
  fileName,
  downloadLink,
  setLoadingPercentage,
}: {
  fileName: SoundFileNames;
  downloadLink: string;
  setLoadingPercentage: Function;
}) {
  const filePathInLocalStorage = await getLocalData(fileName);
  if (filePathInLocalStorage) {
    setLoadingPercentage(100);
    return filePathInLocalStorage;
  }
  return await RNFetchBlob.config({
    ...defaulDownloadParams,
    path: downloadPath + getFileNamWithExtension(fileName),
  })
    .fetch('GET', downloadLink, {})
    .progress((received, total) => {
      setLoadingPercentage(Math.round(100 * (received / total)));
    })
    .then(async (res) => {
      setLoadingPercentage(100);
      await storeLocalData(fileName, res.path());
      return res.path();
    })
    .catch((_error) => {
      genericError();
      return null;
    });
}
