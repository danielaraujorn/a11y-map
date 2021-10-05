import { useMemo } from "react";
import { useIntl } from "react-intl";
import { Rules } from "../../types/Rules";
import { useErrorMessages } from "../useErrorMessages";

export const useInputHelper = ({
  labelMessage,
  rules,
  errors,
  errorMessages
}: {
  labelMessage: string;
  rules?: Rules;
  errors: { type: string };
  errorMessages: { [key: string]: string };
}) => {
  const { formatMessage } = useIntl();
  const getErrorMessage = useErrorMessages(errorMessages);
  const isRequired = useMemo(() => rules?.required, [rules]);
  const helperText = useMemo(
    () => getErrorMessage(errors?.type),
    [errors, getErrorMessage]
  );
  const formatedLabel = useMemo(
    () => formatMessage({ id: labelMessage }) + (isRequired ? " *" : ""),
    [labelMessage, formatMessage, isRequired]
  );
  const error = useMemo(() => Boolean(errors), [errors]);

  return { label: formatedLabel, helperText, error };
};
