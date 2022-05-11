import React, { useEffect, Fragment, useState } from "react";
import styled from "styled-components";
import { Image, Grid, Text } from "../../elements";
import ImageIcon from "../../assets/ImageIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { imgActions } from "../../redux/modules/image";

const ImagesUpload = (props) => {
  const dispatch = useDispatch();
  const [hide, setHide] = useState(false);
  const [showImages, setShowImages] = useState([]);
  const totalImage = useSelector((state) => state.image.files);
  console.log(totalImage);

  // useEffect(() => {
  //   props.setImage(imgFile);
  // }, [imgFile]);

  // useEffect(() => {
  //   let editPree = [];
  //   // 서버에서 받은 URL을 PreView에 넣어줌
  //   for (let i = 0; i < eddit.length; i++) {
  //     editPree.push(eddit[i]);
  //   }
  //   setShowImages(editPree);
  //   // 리덕스에 files 인덱스를 맞추기 위해 URL도 같이 넣우줌
  //   dispatch(imgActions.setPre(editPree));
  // }, [eddit]);

  //이미지 저장 및 미리보기
  const handleChangeFile = (event) => {
    const imageLists = event.target.files;
    const maxImageCnt = 3;
    let imageUrlLists = [...showImages];

    if (imageLists.length > maxImageCnt) {
      window.alert("첨부 파일은 최대 3개까지 가능합니다.");
    }

    if (totalImage.length + imageLists.length > 3) {
      window.alert("첨부 파일은 최대 3개까지 가능합니다.");
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

      if (imageUrlLists.length > 3) {
        imageUrlLists = imageUrlLists.slice(0, 3);
      }
      setShowImages(imageUrlLists);

      dispatch(imgActions.setPre(imgList));
    }
  };

  //첨부파일 검증
  //   const validation = (obj) => {
  //     const fileTypes = ['image/svg', 'image/gif', 'image/jpg','image/gif', 'image/jpeg', 'image/png', 'image/bmp', 'image/tif'];
  //     if (obj.name.length > 100) {
  //         alert("파일명이 100자 이상인 파일은 제외되었습니다.");
  //         return false;
  //     } else if (obj.size > (100 * 1024 * 1024)) {
  //         alert("최대 파일 용량인 100MB를 초과한 파일은 제외되었습니다.");
  //         return false;
  //     } else if (obj.name.lastIndexOf('.') == -1) {
  //         alert("확장자가 없는 파일은 제외되었습니다.");
  //         return false;
  //     } else if (!fileTypes.includes(obj.type)) {
  //         alert("첨부가 불가능한 파일은 제외되었습니다.");
  //         return false;
  //     } else {
  //         return true;
  //     }
  // }

  //이미지 삭제
  const handleDeleteImage = (x, idx) => {
    // 서버에서 준 URL 버킷 이름을 기준으로 찾아

    // 리덕스에 files 삭제
    dispatch(imgActions.deletePre(idx));

    // 프리뷰 삭제
    setShowImages(showImages.filter((p, index) => index !== idx));
  };

  return (
    <>
      <Grid display="flex">
        <Grid>
          <label htmlFor="profile_image">
            <Grid
              width="280px"
              height="210px"
              border="1px solid #7B7B7B"
              borderRadius="3px"
              bg="#F0F0F0"
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              cursor="pointer"
              margin="0 0 32px 0"
            >
              <UploadIcon src={ImageIcon} />
              <Text>눌러서 이미지 업로드하기</Text>
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
        <MidHr />

        <Grid display="flex" margin="0 0 32px 0">
          {showImages.map((image, idx) => (
            <Fragment key={idx}>
              <Grid display="relative" width="auto">
                <Text
                  zindex
                  position="absolute"
                  width="120px"
                  height="40px"
                  bg="rgba(255, 255, 255, 0.3)"
                  border="1px solid #FFFFFF"
                  borderRadius="3px"
                  _onClick={() => handleDeleteImage(image, idx)}
                  margin="85px 80px"
                  display="flex"
                  justifycontent="center"
                  color="white"
                  alignItems="center"
                  cursor="pointer"
                >
                  삭제하기
                </Text>
                <ImagePreview src={image} />
              </Grid>
            </Fragment>
          ))}
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
        <Text margin="0" bold size="14px">
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

const ImageInput = styled.input`
  display: none;
`;

const UploadIcon = styled.img`
  width: 90px;
  height: 90px;
`;

const ImagePreview = styled.img`
  height: 210px;
  width: 280px;
  position: relative;
  margin: 0 4px;
`;
const MidHr = styled.hr`
  width: 100%;
  height: 0px;
  background: #cbcbcb;
  border: 1px solid #cbcbcb;
  transform: rotate(180deg);
  margin-bottom: 32px;
`;

export default ImagesUpload;
