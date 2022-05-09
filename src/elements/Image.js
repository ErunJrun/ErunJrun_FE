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

  // 로고 이미지 쓸때
  if (imageType === "logo") {
    return <ImageLogo {...styles} onClick={_onClick}></ImageLogo>;
  }

  // 원형 이미지 : 프로필 사진, 스토리 사진 쓸때
  if (imageType === "circle") {
    return <ImageCircle {...styles} onClick={_onClick}></ImageCircle>;
  }

  // 게시물 이미지 쓸때
  if (imageType === "rectangle") {
    return (
      <React.Fragment>
        <OutBox>
          <InBox {...styles} />
        </OutBox>
      </React.Fragment>
    );
  }

  // 게시물 작성시 미리보기 프리뷰
  if (shape === "myIcon") {
    return <MyProfile {...styles} onClick={_onClick} />;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter {...styles}>
        <AspectInner {...styles} />
      </AspectOutter>
    );
  }

  if (shape === "imgBtn") {
    return (
      <AspectOutter>
        <ImgBtn {...styles} onClick={_onClick} />
      </AspectOutter>
    );
  }

  if (imageType === "preview") {
    return <ImageRectangle {...styles}></ImageRectangle>;
  }

  // 마이페이지 프로필 커스텀
  if (imageType === "mypage_profile") {
    return <MyImageCC {...styles}></MyImageCC>;
  }

  // 마이페이지 게시물 커스텀
  if (imageType === "mypage_post") {
    return <MyImageRT {...styles} onClick={_onClick}></MyImageRT>;
  }

  //test
  if (imageType === "test") {
    return <ImgBtn {...styles} onClick={_onClick}></ImgBtn>;
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
};

const AspectOutter = styled.div`
  width: ${(props) => props.width};
  min-width: 250px;
`;

const AspectInner = styled.div`
  position: relative;
  overflow: hidden;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  ${(props) => (props.src ? `background-image: url(${props.src});` : "")}
  background-size: cover;
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

//사각형 이미지일때 스타일
const ImageRectangle = styled.div`
  max-width: ${(props) => props.maxWidth};
  max-height: ${(props) => props.maxHeight};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-size: ${(props) => props.bgsize};
  background-image: url("${(props) => props.src}");
`;

//로고 이미지 일때 스타일
const ImageLogo = styled.div`
  cursor: ${(props) => props.cursor};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-size: ${(props) => props.bgsize};
  background-image: url("${(props) => props.src}");
`;

//반응형
const OutBox = styled.div`
  width: 100%;
`;

//비율 맞추기
const InBox = styled.div`
  position: relative;
  padding-top: 100%;
  // 요소내의 컨텐츠가 너무 커서 요소내에 모두 보여주기 힘들때 hidden 하면 넘치는 부분은 잘림
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: ${(props) => props.bgsize};
`;

// 원형 이미지일때 스타일
// --size 변수 쓸때 var(--size) 고고
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
`;

// 마이페이지 프로필 커스텀
const MyImageCC = styled.div`
  --size: ${(props) => props.size}px;
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);
  min-width: 150px;
  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: ${(props) => props.margin};
`;

//마이페이지 게시글 커스텀
const MyImageRT = styled.div`
  float: ${(props) => props.float};
  ${(props) =>
    props.image_auto
      ? `background-repeat: no-repeat; background-position: center; background-size: cover;`
      : ""}
  display: ${(props) => props.display};
  max-width: ${(props) => props.maxWidth};
  max-height: ${(props) => props.maxHeight};
  min-width: ${(props) => props.minWidth};
  min-height: ${(props) => props.minHeight};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
  background-size: ${(props) => props.bgsize};
  background-image: url("${(props) => props.src}");
`;

//test

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
