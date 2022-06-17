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
}: {
  fileName: SoundFileNames;
  downloadLink: string;
}) {
  const filePathInLocalStorage = await getLocalData(fileName);
  if (filePathInLocalStorage) {
    return filePathInLocalStorage;
  }
  return await RNFetchBlob.config({
    ...defaulDownloadParams,
    path: downloadPath + getFileNamWithExtension(fileName),
  })
    .fetch('GET', downloadLink, {})
    .then(async (res) => {
      await storeLocalData(fileName, res.path());
      return res.path();
    })
    .catch((_error) => {
      return null;
    });
}
