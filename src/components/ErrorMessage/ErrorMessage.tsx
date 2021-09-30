import React from "react";

import { Alert } from "antd";

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <Alert
      type="error"
      message={message ? message : "Что-то пошло не так :("}
      banner
      showIcon
    />
  );
};

export default ErrorMessage;
