import { useEffect, useRef, useState } from 'react';
import Sound from 'react-native-sound';
import { downloadMP3 } from 'services/download-mp3';
import { SoundFileNames } from 'services/download.constants';
import { errorWithRetry } from 'utils/generic-error';
import { getLocalData, storeLocalData } from 'utils/local-storage';
import useTryCatch from './useTryCatch';

async function clearSoundFromLocal({
  fileName,
  functionToReRender,
}: {
  fileName: SoundFileNames;
  functionToReRender: Function;
}) {
  await storeLocalData(fileName, '');
  functionToReRender(true);
}

export function loadSound({
  fileName,
  downloadLink,
  loaderFunction,
}: {
  fileName: SoundFileNames;
  downloadLink: string;
  loaderFunction: Function;
}) {
  const [whoosh, setSoundRef] = useState<any>(null);
  const [reRender, forceReRender] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  console.log({ loadingPercentage });
  const checkForMP3File = async () => {
    const filePathInLocalStorage = await getLocalData(fileName);
    const downloadPath =
      filePathInLocalStorage ||
      (await loaderFunction({
        callbackFunction: downloadMP3,
        params: {
          fileName,
          downloadLink,
          setLoadingPercentage,
        },
      }));
    const whoosh = new Sound(downloadPath, '', async (error: any) => {
      if (error) {
        errorWithRetry({
          callback: () =>
            clearSoundFromLocal({
              fileName,
              functionToReRender: () => forceReRender(true),
            }),
        });
      }
    });
    setSoundRef(whoosh);
  };

  useEffect(() => {
    checkForMP3File();
  }, [reRender]);

  return whoosh;
}

export const useSoundPlayer = (whoosh: any) => {
  const playSound = () => {
    useTryCatch(() => {
      whoosh.setNumberOfLoops(-1);
      whoosh.play();
      whoosh.setVolume(0.1);
    });
  };

  function stopSound() {
    useTryCatch(() => whoosh.pause());
  }

  function setSoundVolume(volume: number) {
    useTryCatch(() => {
      const currentVolume = whoosh.getVolume();
      if (currentVolume !== volume) {
        whoosh.setVolume(volume);
      }
    });
  }

  return {
    playSound,
    stopSound,
    setSoundVolume,
  };
};
