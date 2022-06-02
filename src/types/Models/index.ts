export enum StatusEnum {
  IN_PROGRESS = 'inProgress',
  VALIDATED = 'validated',
  NEED_CHANGES = 'needChanges',
  INVALIDATED = 'invalidated',
}

export enum RoleEnum {
  NORMAL = 'normal',
  ADMIN = 'admin',
  VALIDATOR = 'validator',
}

export type PlaceModelType = {
  description: string;
  id: string;
  image: null;
  inserted_at: string;
  latitude: number;
  longitude: number;
  status: StatusEnum;
  updated_at: string;
  validator_comments?: string;
};

export type UserType = {
  email: string;
  id: string;
  inserted_at: string;
  updated_at: string;
  role: RoleEnum;
};

export type DeficiencyType = {
  id: string;
  name: string;
  description: string;
};
