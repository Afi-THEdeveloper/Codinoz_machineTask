import React from "react";

const ErrorMsg = ({ error }) => {
  return <p className="text-sm text-red-400">{error}</p>;
};

export default ErrorMsg;
