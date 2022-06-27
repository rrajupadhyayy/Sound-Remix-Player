import { Icons } from 'config';
import { SoundStatusChangeProps } from 'hooks/useSoundPlayStatus';

export enum SoundFileNames {
  RAIN = 'rain',
  WIND = 'wind',
  THUNDER = 'thunder',
  LEAVES = 'leaves',
}

export interface SoundButtonProps {
  fileName: SoundFileNames;
  downloadLink: string;
  distanceFromLeft: number;
  iconName: Icons;
  soundPlayStatus: Record<string, boolean>;
  setSoundStatusToTrue: ({
    fileName,
    setYStartCords,
  }: SoundStatusChangeProps) => void;
  setSoundStatusToFalse: ({
    fileName,
    setYStartCords,
  }: SoundStatusChangeProps) => void;
  isSoundPlaying: boolean;
}
