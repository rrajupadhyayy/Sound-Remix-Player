// loadSound is the main hook used to download and initialize mp3
// useSoundPlayer used to trigger react-native-sound function
import { SoundFileNames } from 'components/SoundButton/SoundButton.types';
import { useEffect, useState } from 'react';
import Sound from 'react-native-sound';
import { downloadMP3 } from 'services/download';
import { emptyFunction, errorWithRetry } from 'utils/error-handling';
import { getLocalData, storeLocalData } from 'utils/local-storage';
import useTryCatch from './useTryCatch';

// On simulator, once the node server is closed the downloaded files are cleared
// This function is called to clear the files from asyncstorage and reload the file
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
  const [soundRef, setSoundRef] = useState<any>(null);
  const [reRender, forceReRender] = useState<boolean>(false);
  const [loadingPercentage, setLoadingPercentage] = useState<number>(0);

  // function to check if file exists in local storage and download/load accordingly
  const checkForMP3File = async () => {
    const filePathInLocalStorage = await getLocalData(fileName);
    if (loadingPercentage > 0 && !filePathInLocalStorage) {
      setLoadingPercentage(0);
    }

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
    //  take file from local storage if it exists or download the file

    const soundRef = new Sound(downloadPath, '', async (error: any) => {
      // initialize the sound that just loaded
      if (error) {
        errorWithRetry({
          callback: () =>
            clearSoundFromLocal({
              fileName,
              functionToReRender: () => forceReRender(true),
            }),
        });
        // If there is some error during loading, trigger state reRender to clear storage and redownload
      }
    });
    setSoundRef(soundRef);
  };

  // executes only once unless rerender due to load error
  useEffect(() => {
    checkForMP3File();
  }, [reRender]);

  return { soundRef, loadingPercentage, setLoadingPercentage };
}

// function to access the sound functions directly
export const useSoundPlayer = (soundRef: any) => {
  if (soundRef) {
    const playSound = () => {
      useTryCatch(() => {
        // to keep infinite loop
        soundRef.setNumberOfLoops(-1);
        soundRef.play();
      });
    };

    function stopSound() {
      useTryCatch(() => soundRef.pause());
    }

    function setSoundVolume(volume: number) {
      useTryCatch(() => {
        const currentVolume = soundRef.getVolume();
        console.log({ currentVolume });
        if (currentVolume !== volume) {
          // update volume only when current volume and volume updated from drag are different
          soundRef.setVolume(volume);
        }
      });
    }

    return {
      playSound,
      stopSound,
      setSoundVolume,
    };
  }

  return {
    playSound: emptyFunction,
    stopSound: emptyFunction,
    setSoundVolume: emptyFunction,
  };
};
