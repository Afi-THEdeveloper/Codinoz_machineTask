import React from "react";

const InputField = ({ ...props }) => {
  return (
    <div className="py-2">
      <input
        {...props}
        className="text-[#85ACEF] block w-full rounded-xl p-4 border-2"
      />
    </div>
  );
};

export default InputField;
