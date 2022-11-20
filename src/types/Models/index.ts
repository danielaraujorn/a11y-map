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

export enum BarrierLevelEnum {
  BAD = 0,
  DIFFICULT = 5,
  GOOD = 10,
}

export type PlaceModelType = {
  description: string;
  id: string;
  barrier_level: number;
  image: null;
  inserted_at: string;
  latitude: number;
  longitude: number;
  status: StatusEnum;
  updated_at: string;
  validator_comments?: string;
  deficiencies: DeficiencyType[];
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
