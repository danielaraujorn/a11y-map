import { ImageType, RoleEnum, StatusEnum } from '../Models';

export type SignUpParamsType = {
  email: string;
  password: string;
  deficiencies: string[];
};

export type LoginParamsType = {
  email: string;
  password: string;
};

export type NewPlaceParamsType = {
  validator_comments?: string;
  barrier_level: number;
  description?: string;
  status: StatusEnum;
  latitude: number;
  longitude: number;
  deficiencies: string[];
  image?: Blob[] | ImageType;
};

export type NewValidatorParamsType = {
  email: string;
  role: RoleEnum;
};

export type ForgotPasswordParamsType = {
  email: string;
};

export type NewPasswordParamsType = {
  new_password: string;
  new_password_confirmation: string;
};

export type NewDeficiencyParamsType = {
  name: string;
  description?: string;
};
