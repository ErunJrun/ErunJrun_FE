import React, { useEffect, Fragment, useState } from "react";
import styled from "styled-components";
import { Image, Grid, Text } from "../../elements";
import ImageIcon from "../../assets/groupUpload/imageCamera.png";
import { useDispatch, useSelector } from "react-redux";
import { imgActions } from "../../redux/modules/image";
import swal from "sweetalert";

const ImagesUpload = (props) => {
  const dispatch = useDispatch();
  const totalImage = useSelector((state) => state.image.files);
  const showImages = useSelector((state) => state.image.show);

  //이미지 저장 및 미리보기
  const handleChangeFile = (event) => {
    const imageLists = event.target.files;
    const maxImageCnt = 3;
    let imageUrlLists = [];

    if (imageLists.length > maxImageCnt) {
      swal("첨부 파일은 최대 3개까지 가능합니다.");
    }

    if (totalImage.length + imageLists.length > 3) {
      swal("첨부 파일은 최대 3개까지 가능합니다.");
    } else {
      let imgList = [];

      // 파일들을 꺼내 배열안에 넣어줌
      for (const key in imageLists) {
        if (Object.hasOwnProperty.call(imageLists, key)) {
          imgList.push(imageLists[key]);
        }
      }

      for (let i = 0; i < Math.min(imageLists.length, maxImageCnt); i++) {
        const currentImageUrl = URL.createObjectURL(imageLists[i]);
        imageUrlLists.push(currentImageUrl);
      }

      dispatch(imgActions.setShow(imageUrlLists));
      dispatch(imgActions.setPre(imgList));
    }
  };

  //이미지 삭제
  const handleDeleteImage = (x, idx) => {
    // 서버에서 준 URL 버킷 이름을 기준으로 찾아

    // 리덕스에 files 삭제
    dispatch(imgActions.deletePre(idx));

    // 프리뷰 삭제
    dispatch(imgActions.deleteShow(idx));
    // setShowImages(showImages.filter((p, index) => index !== idx));
  };

  if (props.isMobile) {
    return (
      <>
        <Grid display="flex" width="343px" margin="0 auto">
          <Grid width="166px" margin="0 auto 0 0">
            <label style={{ width: "166px" }} htmlFor="profile_image">
              <Grid
                width="166px"
                height="100px"
                border="1px solid #7B7B7B"
                bg="#FFFFFF"
                borderRadius="3px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                cursor="pointer"
                margin="0"
              >
                <UploadIconMob src={ImageIcon} />
                <Text margin="9.82px 0 0 0" color="#7B7B7B" size="11px" regular>
                  눌러서 이미지 업로드하기
                </Text>
              </Grid>
              <ImageInput
                type="file"
                multiple="multiple"
                id="profile_image"
                onChange={handleChangeFile}
                accept=".jpg, .jpeg, .png"
              ></ImageInput>
            </label>
          </Grid>

          <Grid
            display="flex"
            margin="0 0 16px 0"
            justifyContent="space-between"
          >
            {showImages.map((image, idx) => {
              if (idx === 0) {
                return (
                  <Fragment key={idx}>
                    <Grid position="relative" width="auto">
                      <ThumbnailMob>대표</ThumbnailMob>
                      <Text
                        zindex
                        position="absolute"
                        width="50px"
                        height="20px"
                        bg="rgba(255, 255, 255, 0.3)"
                        border="1px solid #FFFFFF"
                        borderRadius="3px"
                        _onClick={() => handleDeleteImage(image, idx)}
                        margin="65px 60px"
                        display="flex"
                        justifycontent="center"
                        color="white"
                        alignItems="center"
                        cursor="pointer"
                        size="11px"
                        hover="background-color:rgba(255, 255, 255, 0.9); color:black;"
                      >
                        삭제하기
                      </Text>
                      <ImagePreviewMob src={image} />
                    </Grid>
                  </Fragment>
                );
              } else {
                return (
                  <Fragment key={idx}>
                    <Grid display="relative" width="auto">
                      <Text
                        zindex
                        position="absolute"
                        width="50px"
                        height="20px"
                        bg="rgba(255, 255, 255, 0.3)"
                        border="1px solid #FFFFFF"
                        borderRadius="3px"
                        _onClick={() => handleDeleteImage(image, idx)}
                        margin="65px 60px"
                        display="flex"
                        justifycontent="center"
                        color="white"
                        alignItems="center"
                        cursor="pointer"
                        size="11px"
                        hover="background-color:rgba(255, 255, 255, 0.9); color:black;"
                      >
                        삭제하기
                      </Text>
                      <ImagePreviewMob src={image} />
                    </Grid>
                  </Fragment>
                );
              }
            })}
          </Grid>
        </Grid>

        <MidHrMob />
        <Grid
          bg="#F0F0F0"
          padding="16px"
          height="146px"
          display="flex"
          width="343px"
          flexDirection="column"
          justifyContent="center"
          margin="0 auto"
        >
          <Text margin="0" size="10px" regular>
            <li style={{ marginBottom: "10px" }}>
              업로드 가능한 이미지 최대 용량은 30MB 입니다.
            </li>
            <li style={{ marginBottom: "10px" }}>
              504px*378px 사이즈의 이미지 크기를 권장합니다.
            </li>
            <li style={{ marginBottom: "10px" }}>
              가로길이 504px, 세로길이 378px 아하 크기의 이미지 경우 화질이{" "}
              <br></br>
              {"        "}깨질 수도 있습니다.
            </li>
            <li>
              지나치게 선정적이나 폭력적인 이미지를 업로드할 경우 제재가
              <br></br>
              {"        "}있을 수도 있습니다.
            </li>
          </Text>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid display="flex" width="865px">
        <Grid>
          <label htmlFor="profile_image">
            <Grid
              width="280px"
              height="169px"
              border="1px solid #7B7B7B"
              bg="#FFFFFF"
              borderRadius="3px"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              cursor="pointer"
              margin="0"
            >
              <UploadIcon src={ImageIcon} />
              <Text margin="16px 0 0 0" color="#7B7B7B" size="14px">
                눌러서 이미지 업로드하기
              </Text>
            </Grid>
            <ImageInput
              type="file"
              multiple="multiple"
              id="profile_image"
              onChange={handleChangeFile}
              accept=".jpg, .jpeg, .png"
            ></ImageInput>
          </label>
        </Grid>

        <Grid display="flex" margin="0 0 32px 0">
          {showImages.map((image, idx) => {
            if (idx === 0) {
              return (
                <Fragment key={idx}>
                  <Grid position="relative" width="auto">
                    <Thumbnail>대표</Thumbnail>
                    <Text
                      zindex
                      position="absolute"
                      width="100px"
                      height="30px"
                      bg="rgba(255, 255, 255, 0.3)"
                      border="1px solid #FFFFFF"
                      borderRadius="3px"
                      _onClick={() => handleDeleteImage(image, idx)}
                      margin="92px 90px"
                      display="flex"
                      justifycontent="center"
                      color="white"
                      alignItems="center"
                      cursor="pointer"
                      size="14px"
                      hover="background-color:rgba(255, 255, 255, 0.9); color:black;"
                    >
                      삭제하기
                    </Text>
                    <ImagePreview onMouseOver={() => {}} src={image} />
                  </Grid>
                </Fragment>
              );
            } else {
              return (
                <Fragment key={idx}>
                  <Grid display="relative" width="auto">
                    <Text
                      zindex
                      position="absolute"
                      width="100px"
                      height="30px"
                      bg="rgba(255, 255, 255, 0.3)"
                      border="1px solid #FFFFFF"
                      borderRadius="3px"
                      _onClick={() => handleDeleteImage(image, idx)}
                      margin="92px 90px"
                      display="flex"
                      justifycontent="center"
                      color="white"
                      alignItems="center"
                      cursor="pointer"
                      size="14px"
                      hover="background-color:rgba(255, 255, 255, 0.9); color:black;"
                    >
                      삭제하기
                    </Text>
                    <ImagePreview onMouseOver={() => {}} src={image} />
                  </Grid>
                </Fragment>
              );
            }
          })}
        </Grid>
      </Grid>

      <MidHr />
      <Grid
        bg="#F0F0F0"
        padding="16px 24px"
        height="136px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Text margin="0" size="14px">
          <li style={{ marginBottom: "10px" }}>
            업로드 가능한 이미지 최대 용량은 30MB 입니다.
          </li>
          <li style={{ marginBottom: "10px" }}>
            504px*378px 사이즈의 이미지 크기를 권장합니다.
          </li>
          <li style={{ marginBottom: "10px" }}>
            가로길이 504px, 세로길이 378px 아하 크기의 이미지 경우 화질이 깨질
            수도 있습니다.
          </li>
          <li>
            지나치게 선정적이나 폭력적인 이미지를 업로드할 경우 제재가 있을 수도
            있습니다.
          </li>
        </Text>
      </Grid>
    </>
  );
};

const Thumbnail = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 40px;
  right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 47px;
  height: 19px;
  z-index: 4;
  background: rgba(3, 12, 55, 0.5);
  border-radius: 1px;
  font-size: 12px;
  font-weight: 700;
  color: white;
`;

const ThumbnailMob = styled.div`
  position: absolute;
  box-sizing: border-box;
  top: 32px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 37px;
  height: 17px;
  z-index: 4;
  background: rgba(3, 12, 55, 0.5);
  border-radius: 2px;
  font-size: 9px;
  font-weight: 700;
  color: white;
`;

const ImageInput = styled.input`
  display: none;
`;

const UploadIcon = styled.img`
  width: 61px;
  height: auto;
`;

const UploadIconMob = styled.img`
  width: 37px;
  height: auto;
`;

const ImagePreview = styled.img`
  height: 169px;
  width: 280px;
  position: relative;
  margin: 32px 8px 0 0;
  object-fit: cover;
`;

const ImagePreviewMob = styled.img`
  height: 100px;
  width: 166px;
  position: relative;
  margin: 24px 0 0 0;
  object-fit: cover;
`;

const MidHr = styled.hr`
  width: 100%;
  height: 0px;
  background: #cbcbcb;
  border-top: 1px solid #cbcbcb;
  transform: rotate(180deg);
  margin-bottom: 32px;
`;

const MidHrMob = styled.hr`
  width: 343px;
  height: 0px;
  background: #cbcbcb;
  border-top: 1px solid #dddddd;
  transform: rotate(180deg);
  margin-bottom: 16px;
`;

export default ImagesUpload;
