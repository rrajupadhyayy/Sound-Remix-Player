import RNFetchBlob from 'rn-fetch-blob';
import { defaulDownloadParams, downloadPath } from './download.constants';

export function getFileNamWithExtension(fileName: string) {
  return `/${fileName}.mp3`;
}
export async function downloadMP3({
  fileName,
  downloadLink,
}: {
  fileName: string;
  downloadLink: string;
}) {
  return await RNFetchBlob.config({
    ...defaulDownloadParams,
    path: downloadPath + getFileNamWithExtension(fileName),
  })
    .fetch('GET', downloadLink, {})
    .then((res) => {
      return res.path();
    })
    .catch((_error) => {
      return null;
    });
}
