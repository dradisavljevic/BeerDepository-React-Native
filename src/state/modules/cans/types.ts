export type GetCansRequest = {
  clientID: string;
  albumID: string;
};

export type GetImagesRequest = {
  clientID: string;
  albumID: string;
  componentID: string;
  title: string;
};

export type GetSpecificCanRequest = {
  clientID: string;
  imageID: string;
};

export type imageData = {
  id: string;
  title: string;
  description: string;
  datetime: number;
  type: string;
  animated: boolean;
  width: number;
  height: number;
  size: number;
  views: number;
  bandwidth: number;
  vote: any;
  favorite: boolean;
  nsfw: any;
  section: any;
  account_url: any;
  account_id: any;
  is_ad: boolean;
  in_most_viral: boolean;
  has_sound: boolean;
  tags: any;
  ad_type: number;
  ad_url: string;
  edited: string;
  in_gallery: boolean;
  link: string;
  album: string;
};

export type imageArray = {
  data: imageData[];
};

export type CanState = {
  can: Can;
  loading: boolean;
  catalogue: imageData[];
  error: string;
  data: imageData[];
  albumImages: object[];
};

export type Can = {
  id: string;
  title: string;
  brand: string;
  quantity: string;
  ownership: string;
  description: string;
  info: string;
  origin: string;
  bought: string;
  color: string;
  album: string;
  link: string;
};

export enum GetCansActionTypes {
  GET_CANS = '@@cans/GET_CANS_REQUEST',
  GET_CANS_SUCCESS = '@@cans/GET_CANS_SUCCESS',
  GET_CANS_FAILURE = '@@cans/GET_CANS_FAILURE'
}

export enum GetAlbumImagesActionTypes {
  GET_ALBUM_IMAGES = '@@cans/GET_ALBUM_IMAGES_REQUEST',
  GET_ALBUM_IMAGES_SUCCESS = '@@cans/GET_ALBUM_IMAGES_SUCCESS',
  GET_ALBUM_IMAGES_FAILURE = '@@cans/GET_ALBUM_IMAGES_FAILURE'
}

export enum GetSpecificCanActionTypes {
  GET_SPECIFIC_CAN = '@@cans/GET_SPECIFIC_CAN_REQUEST',
  GET_SPECIFIC_CAN_SUCCESS = '@@cans/GET_SPECIFIC_CAN_SUCCESS',
  GET_SPECIFIC_CAN_FAILURE = '@@cans/GET_SPECIFIC_CAN_FAILURE'
}

export const SearchCansActionType: string = '@@cans/SEARCH_CANS';

export const RemoveSearchCansActionType: string = '@@cans/REMOVE_SEARCH_CANS';

export const ExtractCanDetailsActionType: string = '@@cans/EXTRACT_DETAILS';
