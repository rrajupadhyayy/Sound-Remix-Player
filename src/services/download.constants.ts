import RNFetchBlob from 'rn-fetch-blob';

export const downloadPath = RNFetchBlob.fs.dirs.DocumentDir;
export const defaulDownloadParams = { fileCache: true, appendExt: 'mp3' };
export const downloadLinks = {
  RAIN: 'https://cdn.freesound.org/sounds/507/507902-819d5219-fe2a-4b8c-91ce-c875c169bcfb?filename=507902__inuetc__heavy-rain-sound-inu-etc.mp3',
  WIND: 'https://cdn.freesound.org/sounds/138/138967-0c0497eb-a044-40f1-bf31-0862ef11d146?filename=138967__huggy13ear__wind-3.mp3',
  THUNDER: 'https://cdn.freesound.org/sounds/359/359151-85fa0ae6-42fb-47b9-b21d-02a8a61ed4a5?filename=359151__nimlos__rain-thunder.mp3',
  LEAVES: 'https://cdn.freesound.org/sounds/362/362253-c4709441-8bda-4136-9a43-ca33cd422676?filename=362253__dsoadigital__leaves.mp3'
};
