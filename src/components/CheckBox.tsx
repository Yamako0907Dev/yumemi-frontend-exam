/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
interface CheckBoxProps {
  prefName: string;
}

export const CheckBox: React.FC<CheckBoxProps> = ({ prefName, ...rest }) => {
  return (
    <div
      {...rest}
      css={css({ marginRight: "12px", display: "flex", alignItems: "center" })}
    >
      <input type="checkbox" />
      <label css={{ width: 80 }}>{prefName}</label>
    </div>
  );
};
