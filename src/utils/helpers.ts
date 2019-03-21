import { Can, imageData } from '../state/modules/cans/types';
import diacritics from '../constants/diacritics';

const If = (props: any) => {
  const condition = props.condition || false;
  const positive = props.then || null;
  const negative = props.else || null;

  return condition ? positive : negative;
};

const accentFold = (s: string): string => {
  if (!s) {
    return '';
  }
  let folded = '';
  for (let i = 0; i < s.length; i++) {
    folded += diacritics[s.charAt(i)] || s.charAt(i);
  }
  return folded;
};

const clearDescription = (catalogue: imageData[]): imageData[] => {
  catalogue.forEach(can => {
    can.description = can.description.split('Album:')[0];
  });
  return catalogue;
};

const extractDetails = (canData: imageData): Can => {
  let can = {} as Can;
  const attributes = canData.description.split(';');
  can.brand = attributes[0].split('Brand:')[1];
  can.origin = attributes[1].split('Country of Origin:')[1];
  can.bought = attributes[2].split('Bought in:')[1];
  can.info = attributes[3].split('Description:')[1];
  can.color = attributes[4].split('Color:')[1];
  can.quantity = attributes[5].split('Quantity:')[1];
  can.ownership = attributes[6].split('Ownership:')[1];
  can.description = canData.description;
  can.link = canData.link;
  can.title = canData.title;
  return can;
};

const filterCans = (filter: string, data: imageData[]): imageData[] => {
  return data.filter(can => accentFold(can.title.toLowerCase()).includes(filter.toLowerCase()));
};

export { If, filterCans, accentFold, clearDescription, extractDetails };
