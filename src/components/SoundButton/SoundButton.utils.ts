import { getScreenHeight } from 'utils/screen-size';

export const generateAudioRanges = () => {
  const maximumRange = getScreenHeight(60);
  const minimumRange = getScreenHeight(6);
  const rangeArray = [];
  for (let index = 1; index < 10; index++) {
    const element = {
      volume: Number(`0.${index}`),
      minLimit: minimumRange * (index - 1),
      maxLimit: minimumRange * index,
    };
    rangeArray.push(element);
  }
  rangeArray.push({
    volume: 1,
    minLimit: maximumRange - minimumRange,
    maxLimit: maximumRange + getScreenHeight(10),
  });
  return rangeArray;
};
