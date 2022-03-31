export type Rules = {
  required?: boolean;
  minLength?: number;
  maxLenght?: number;
  pattern?: RegExp;
  validate?: (value: string) => boolean;
};
