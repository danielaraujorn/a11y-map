export enum StatusEnum {
  IN_PROGRESS = 'inProgress',
  VALIDATED = 'validated',
  NEED_CHANGES = 'needChanges',
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
  validatorComments?: string;
};
