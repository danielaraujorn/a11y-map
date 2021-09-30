import { TextField } from "@mui/material";
import { Rules } from "../../types/Rules";
import { InputController } from "../InputController";

export const Input = ({
  ...props
}: {
  name: string;
  label: string;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  rules?: Rules;
}) => {
  return <InputController<typeof TextField> component={TextField} {...props} />;
};
