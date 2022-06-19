import { Icons } from 'config';

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
}
