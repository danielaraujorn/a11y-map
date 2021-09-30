import { useCallback } from "react";
import { useIntl } from "react-intl";

export const useErrorMessages = (messages: { [key: string]: string }) => {
  const { formatMessage } = useIntl();
  const getErrorMessage = useCallback(
    (errorKey: string): string => {
      const message = messages[errorKey];
      if (message) return formatMessage({ id: message });
      if (errorKey === "required")
        return formatMessage({ id: "requiredField" });
      return "";
    },
    [messages, formatMessage]
  );
  return getErrorMessage;
};
