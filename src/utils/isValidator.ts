import { RoleEnum } from '../types/Models';

export const isValidator = (role?: RoleEnum) =>
  role && [RoleEnum.ADMIN, RoleEnum.VALIDATOR].includes(role);
