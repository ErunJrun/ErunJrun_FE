import React from "react";
import styled from "styled-components";

const Image = (props) => {
  const {
    imageType,
    src,
    size,
    bgsize,
    width,
    height,
    margin,
    padding,
    _onClick,
    cursor,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    image_auto,
    display,
    float,
    shape,
    className,
    radius,
    preview,
    borderRadius,
    border,
  } = props;

  const styles = {
    imageType,
    src,
    size,
    bgsize,
    width,
    height,
    margin,
    padding,
    cursor,
    maxWidth,
    maxHeight,
    minWidth,
    minHeight,
    image_auto,
    display,
    float,
    shape,
    className,
    _onClick,
    radius,
    preview,
    borderRadius,
    border,
  };

  if (imageType === "circle") {
    return <ImageCircle {...styles} onClick={_onClick}></ImageCircle>;
  }

  if (shape === "imgBtn") {
    return (
      <AspectOutter>
        <ImgBtn {...styles} onClick={_onClick} />
      </AspectOutter>
    );
  }

  return (
    <>
      <React.Fragment>
        <MyProfile {...styles} onClick={_onClick} />
      </React.Fragment>
    </>
  );
};

Image.defaultProps = {
  imageType: "myIcon",
  src: "https://www.snsboom.co.kr/common/img/default_profile.png",
  size: 40,
  bgsize: "cover",
  _onClick: () => {},
  cursor: null,
  maxWidth: null,
  maxHeight: null,
  image_auto: false,
  float: null,
  border: null,
  padding: null,
};

const AspectOutter = styled.div`
  width: ${(props) => props.width};
  min-width: 250px;
`;

const MyProfile = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  ${(props) => (props.src ? `background-image: url(${props.src});` : "")}
  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

const ImageCircle = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: 100%;
  border: ${(props) => props.border};
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: ${(props) => props.margin};
  cursor: ${(props) => props.cursor};
  display: ${(props) => props.display};
  padding: ${(props) => props.padding};
`;

const ImgBtn = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${(props) => props.borderRadius};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  ${(props) => (props.src ? `background-image: url(${props.src});` : "")}
  background-size: cover;
  &:hover {
    opacity: 0.9;
  }
`;

export default Image;
