import { useMemo } from "react";
import { Rules } from "../../types/Rules";
import { useErrorMessages } from "../useErrorMessages";

export const useInputHelper = ({
  label,
  rules,
  errors,
  errorMessages
}: {
  label: string;
  rules?: Rules;
  errors: { type: string };
  errorMessages: { [key: string]: string };
}) => {
  const getErrorMessage = useErrorMessages(errorMessages);
  const isRequired = useMemo(() => rules?.required, [rules]);
  const helperText = useMemo(
    () => getErrorMessage(errors?.type),
    [errors, getErrorMessage]
  );
  const formatedLabel = useMemo(
    () => label + (isRequired ? " *" : ""),
    [label, isRequired]
  );
  const error = useMemo(() => Boolean(errors), [errors]);

  return { label: formatedLabel, helperText, error };
};
