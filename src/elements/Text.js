import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const {
    display,
    children,
    size,
    color,
    bold,
    margin,
    width,
    height,
    wordbreak,
    padding,
    position,
    top,
    left,
    textalign,
    _onClick,
    cursor,
    minWidth,
    is_flex,
    zindex,
    justifycontent,
    fontFamily,
    bg,
    border,
    borderRadius,
    text_decoration,
    marginTop,
    marginLeft,
  } = props;
  const styles = {
    display,
    size,
    color,
    bold,
    margin,
    width,
    height,
    wordbreak,
    padding,
    position,
    top,
    left,
    textalign,
    cursor,
    minWidth,
    is_flex,
    zindex,
    justifycontent,
    fontFamily,
    bg,
    border,
    borderRadius,
    text_decoration,
    marginTop,
    marginLeft,
  };
  return (
    <React.Fragment>
      <P {...styles} onClick={_onClick}>
        {children}
      </P>
    </React.Fragment>
  );
};

Text.defaultProps = {
  display: null,
  size: null,
  bold: false,
  color: "#000000",
  margin: null,
  width: null,
  height: null,
  wordbreak: false,
  padding: null,
  position: null,
  top: null,
  left: null,
  textalign: false,
  justifycontent: false,
  _onClick: () => {},
  cursor: "default",
  minWidth: null,
  is_flex: false,
  zindex: false,
  fontFamily: null,
  bg: null,
  border: null,
  borderRadius: null,
  text_decoration: null,
  marginTop: null,
  marginLeft: null,
};
const P = styled.p`
  ${(props) => `font-family : ${props.fontFamily};`};
  display: ${(props) => props.display};
  border-radius: ${(props) => props.borderRadius};
  background-color: ${(props) => props.bg};
  border: ${(props) => props.border};
  z-index: ${(props) => (props.zindex ? `1;` : null)};
  ${(props) => (props.bold ? `font-weight: 600;` : `font-weight: 350;`)};
  ${(props) => (props.text_decoration ? `text-decoration: underline;` : null)};
  ${(props) => `color : ${props.color};`};
  ${(props) => `font-size: ${props.size};`};
  ${(props) => `margin : ${props.margin};`};
  ${(props) => `width : ${props.width};`};
  ${(props) => `height : ${props.height};`};
  ${(props) => `padding : ${props.padding};`};
  ${(props) => `position : ${props.position};`};
  ${(props) => `top : ${props.top};`};
  ${(props) => `left : ${props.left};`};
  ${(props) => (props.textalign ? `text-align: center;` : null)};
  ${(props) => (props.justifycontent ? `justify-content: center;` : null)};
  ${(props) => (props.marginTop ? `margin-top: 30px;` : null)};
  ${(props) => (props.marginLeft ? `margin-left: 20px;` : null)};
  cursor: ${(props) => props.cursor};
  white-space: pre-wrap;
  min-width: ${(props) => props.minWidth}; // 최소 width 값 지정
  ${(props) =>
    props.is_flex
      ? `display: flex; align-tiems: center; justify-content: space-between;`
      : ""}
`;

export default Text;
