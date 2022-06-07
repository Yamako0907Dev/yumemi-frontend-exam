/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import { Prefectures } from "../App";
type CheckBoxProps = {
  prefecture: Prefectures;
  onCheck: (
    event: React.ChangeEvent<HTMLInputElement>,
    prefecture: Prefectures
  ) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  prefecture,
  onCheck,
  ...rest
}) => {
  const { prefName } = prefecture;
  return (
    <div
      {...rest}
      css={css({ marginRight: "12px", display: "flex", alignItems: "center" })}
    >
      <input type="checkbox" onChange={(event) => onCheck(event, prefecture)} />
      <label css={{ width: 80 }}>{prefName}</label>
    </div>
  );
};
