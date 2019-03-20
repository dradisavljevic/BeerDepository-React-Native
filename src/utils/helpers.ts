import { imageData } from '../state/modules/cans/types';
import diacritics from '../constants/diacritics';

const If = (props: any) => {
  const condition = props.condition || false;
  const positive = props.then || null;
  const negative = props.else || null;

  return condition ? positive : negative;
};

const accentFold = (s: string) => {
  if (!s) {
    return '';
  }
  let folded = '';
  for (let i = 0; i < s.length; i++) {
    folded += diacritics[s.charAt(i)] || s.charAt(i);
  }
  return folded;
};

const filterCans = (filter: string, data: imageData[]): imageData[] => {
  return data.filter(can => accentFold(can.title.toLowerCase()).includes(filter.toLowerCase()));
};

export { If, filterCans, accentFold };
