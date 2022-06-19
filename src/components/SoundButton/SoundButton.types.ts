import { Icons } from 'config';

export enum SoundFileNames {
  RAIN = 'rain',
  WIND = 'wind',
  THUNDER = 'thunder',
  LEAVES = 'leafs',
}

export interface SoundButtonProps {
  fileName: SoundFileNames;
  downloadLink: string;
  distanceFromLeft: number;
  iconName: Icons;
}
