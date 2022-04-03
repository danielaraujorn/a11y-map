import { StatusEnum } from '../Models';

export type SignUpParamsType = {
  email: string;
  password: string;
};

export type LoginParamsType = {
  email: string;
  password: string;
};

export type NewPlaceParamsType = {
  validator_comments: string;
  description?: string;
  status: StatusEnum;
  latitude: string;
  longitude: string;
};
