import { useEffect, useState } from 'react';
import Sound from 'react-native-sound';
import { downloadMP3 } from 'services/download-mp3';
import { SoundFileNames } from 'services/download.constants';
import genericError from 'utils/generic-error';
import { getLocalData } from 'utils/local-storage';
import useTryCatch from './useTryCatch';

export default function useSoundPlayer({
  fileName,
  downloadLink,
  loaderFunction,
}: {
  fileName: SoundFileNames;
  downloadLink: string;
  loaderFunction: Function;
}) {
  const [sourcePath, setSourcePath] = useState<string | null>(null);

  const checkForMP3File = async () => {
    const filePathInLocalStorage = await getLocalData(fileName);
    if (filePathInLocalStorage) {
      setSourcePath(filePathInLocalStorage);
      return;
    }

    const downloadPath = await loaderFunction({
      callbackFunction: downloadMP3,
      params: {
        fileName,
        downloadLink,
      },
    });
    setSourcePath(downloadPath);
  };

  useEffect(() => {
    checkForMP3File();
  }, []);

  if (sourcePath) {
    const whoosh = new Sound(sourcePath, '', (error) => {
      if (error) {
        genericError();
        return;
      }
    });

    function playSound() {
      useTryCatch(() => {
        whoosh.setNumberOfLoops(-1);
        whoosh.play();
      });
    }

    function stopSound() {
      useTryCatch(() => whoosh.stop());
    }

    function setSoundVolume() {
      useTryCatch(() => whoosh.setVolume(0.5));
    }

    return {
      playSound,
      stopSound,
      setSoundVolume,
    };
  }
  return {
    playSound: () => {},
    stopSound: () => {},
    setSoundVolume: () => {},
  };
}
