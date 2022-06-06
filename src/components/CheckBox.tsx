import React from "react";

interface CheckBoxProps {
  prefName: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ prefName, ...rest }) => {
  return (
    <div {...rest}>
      <input type="checkbox" />
      <label>{prefName}</label>
    </div>
  );
};
