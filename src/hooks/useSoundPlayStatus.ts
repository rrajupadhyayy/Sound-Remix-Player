import { SoundFileNames } from 'components/SoundButton/SoundButton.types';
import { useMemo, useState } from 'react';
import { getScreenHeight } from 'utils/screen-size';

export interface SoundStatusChangeProps {
  fileName: SoundFileNames;
  setYStartCords: (value: number) => void;
}

const maxVolumePosition = getScreenHeight(10);
const halfVolumePosition = getScreenHeight(40);
export function useSoundPlayStatus() {
  const [soundPlayStatus, setSoundPlayStatus] = useState<
    Record<string, boolean>
  >({
    [SoundFileNames.RAIN]: false,
    [SoundFileNames.WIND]: false,
    [SoundFileNames.THUNDER]: false,
    [SoundFileNames.LEAVES]: false,
  });

  const isSoundPlaying = useMemo(
    () =>
      Object.keys(soundPlayStatus).some(
        (item) => soundPlayStatus[item] === true,
      ),
    [soundPlayStatus],
  );

  function setSoundStatusToTrue({
    fileName,
    setYStartCords,
  }: SoundStatusChangeProps) {
    if (!isSoundPlaying) {
      setSoundPlayStatus({
        ...soundPlayStatus,
        [fileName]: true,
      });
      setYStartCords(maxVolumePosition);
    } else {
      setYStartCords(halfVolumePosition);
    }
  }
  
  function setSoundStatusToFalse({
    fileName,
    setYStartCords,
  }: SoundStatusChangeProps) {
    setSoundPlayStatus({
      ...soundPlayStatus,
      [fileName]: false,
    });
    setYStartCords(maxVolumePosition);
  }

  return {
    isSoundPlaying,
    soundPlayStatus,
    setSoundStatusToTrue,
    setSoundStatusToFalse,
  };
}
