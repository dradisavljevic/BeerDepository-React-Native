import {Can, imageData} from '../constants/types';
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';
import diacritics from '../constants/diacritics';

/**
 * File containing helper functions.
 */
const extractDetails = (canData: imageData): Can => {
  let can = {} as Can;
  const attributes = canData.description.split(';');
  can.brand = attributes[0].split('Brand:')[1].trim();
  can.origin = attributes[1].split('Country of Origin:')[1].trim();
  can.bought = attributes[2].split('Bought in:')[1].trim();
  can.info = attributes[3].split('Description:')[1].trim();
  can.color = attributes[4].split('Color:')[1].trim();
  can.quantity = attributes[5].split('Quantity:')[1].trim();
  can.ownership = attributes[6].split('Ownership:')[1].trim();
  can.album = canData.album;
  can.description = canData.description;
  can.link = canData.link;
  can.title = canData.title;
  can.id = canData.id;
  return can;
};

const extractImages = (album: imageData[]): IImageInfo[] => {
  let images = [] as IImageInfo[];
  album.forEach(can => {
    images.push({url: can.link});
  });
  return images;
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
    if (typeof can.description.split('Album:')[1] !== 'undefined') {
      can.album = can.description.split('Album:')[1].trim().replace(';', '');
    }
    can.description = can.description.split('Album:')[0];
  });
  return catalogue;
};

const filterCans = (filter: string, data: imageData[]): imageData[] => {
  return data.filter(can =>
    accentFold(can.title.toLowerCase()).includes(filter.toLowerCase()),
  );
};

export {
  filterCans,
  accentFold,
  clearDescription,
  extractDetails,
  extractImages,
};
