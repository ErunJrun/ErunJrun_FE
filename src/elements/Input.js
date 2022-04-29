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
    border,
    width,
    value,
    multiple,
    groupPost,
    onFocus,
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

  if (groupPost) {
    return (
      <>
        {label && <Text margin="0px">{label}</Text>}
        <GroupInput
          type={type}
          placeholder={placeholder}
          onChange={_onChange}
          defaultValue={defaultValue}
          onFocus={onFocus}
        />
      </>
    );
  }

  return (
    <>
      {label && <Text margin="0px">{label}</Text>}
      <ElInput type={type} placeholder={placeholder} onChange={_onChange} />
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
  defaultValue: "",
  border: null,
  width: null,
  height: null,
  value: "",
};

const ElTextarea = styled.textarea`
  border: 1px solid #4e4e4e;
  min-height: 300px;
  min-width: 800px;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
  ${(props) => (props.margin ? `margin:${props.margin};` : "")}
  &:focus {
    outline: none;
  }
`;
const ElInput = styled.input`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  border: 1px solid #4e4e4e;
  box-sizing: border-box;
  border-radius: 5px;
  width: 400px;
  height: 40px;
  text-align: center;
  outline: none;
`;

const GroupInput = styled.input`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  border: 1px solid #4e4e4e;
  box-sizing: border-box;
  border-radius: 5px;
  width: 160px;
  height: 40px;
  text-align: center;
  outline: none;
`;

export default Input;
