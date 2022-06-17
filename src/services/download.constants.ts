import RNFetchBlob from 'rn-fetch-blob';

export const downloadPath = RNFetchBlob.fs.dirs.DocumentDir;

export const defaulDownloadParams = { fileCache: true, appendExt: 'mp3' };

export enum SoundFileNames {
  RAIN = 'rain',
  THUNDER = 'thunder',
  FOREST = 'forest',
  WAVE = 'wave',
}

export const downloadLinks = {
  rain: 'https://cdn.freesound.org/sounds/507/507902-819d5219-fe2a-4b8c-91ce-c875c169bcfb?filename=507902__inuetc__heavy-rain-sound-inu-etc.mp3',
};
