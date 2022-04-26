import React from "react";
import styled from "styled-components";
import { Text, Grid } from "./index";

const Input = (props) => {
  const {
    label,
    placeholder,
    _onChange,
    type,
    multiLine,
    margin,
    defaultValue,
  } = props;
  if (multiLine) {
    return (
      <>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
          defaultValue={defaultValue}
        />
      </>
    );
  }
  return (
    <>
      {label && <Text margin="0px">{label}</Text>}
      <ElInput
        type={type}
        placeholder={placeholder}
        onChange={_onChange}
        defaultValue={defaultValue}
      />
    </>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요",
  _onChange: () => {},
  type: "text",
  margin: null,
  defaultValue: null,
};

const ElTextarea = styled.textarea`
  border: none;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  ${(props) => (props.margin ? `margin:${props.margin};` : "")}
  &:focus {
    outline: none;
  }
`;
const ElInput = styled.input`
  border: none;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  ${(props) => (props.margin ? `margin:${props.margin};` : "")}
  &:focus {
    outline: none;
  }
`;

export default Input;
