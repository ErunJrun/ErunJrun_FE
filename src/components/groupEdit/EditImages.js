import React, { useEffect, Fragment, useState } from "react";
import styled from "styled-components";
import { Image, Grid, Text } from "../../elements";
import { useDispatch, useSelector } from "react-redux";
import { imgActions } from "../../redux/modules/image";
import { editGroupDB } from "../../redux/modules/feed";
import { useParams } from "react-router-dom";
import ImageIcon from "../../assets/groupUpload/imageCamera.png";
import editStep2 from "../../assets/groupUpload/editStep2.png";
import groupLeftBtn from "../../assets/groupUpload/groupLeftBtn.png";
import swal from "sweetalert";

const EditImages = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;

  //기존 사진 url
  const detailImageUrl = [
    props.thumbnailUrl1,
    props.thumbnailUrl2,
    props.thumbnailUrl3,
  ];

  const [showImages, setShowImages] = useState([]);
  const totalImage = useSelector((state) => state.image.files);
  const editContents = useSelector((state) => state.feed.detail);

  const goBack1 = () => {
    props.setIsLoad1(false);
    props.setIsLoad2(true);
    dispatch(imgActions.resetFile());
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const editGroupPost = () => {
    dispatch(editGroupDB(groupId, editContents, editUrl, newFiles));
    dispatch(imgActions.resetFile());
    // history.replace("/groupfeed");
  };

  //이미지 저장 및 미리보기
  const handleChangeFile = (event) => {
    const imageLists = event.target.files;
    const maxImageCnt = 3;
    let imageUrlLists = [...showImages];

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

      if (imageUrlLists.length > 3) {
        imageUrlLists = imageUrlLists.slice(0, 3);
      }
      setShowImages(imageUrlLists);

      dispatch(imgActions.setPre(imgList));
    }
  };

  //이미지 삭제
  const handleDeleteImage = (x, idx) => {
    // 리덕스에 files 삭제
    dispatch(imgActions.deletePre(idx));
    // 프리뷰 삭제
    setShowImages(showImages.filter((p, index) => index !== idx));
  };

  //새로 올린 파일과 기존 사진 url을 분리
  let newFiles = [];
  let editUrl = [];
  totalImage.map((e, idx) => {
    if (e?.name) {
      newFiles.push(e);
    }
    if (!e?.name) {
      editUrl.push(e);
    }
  });

  useEffect(() => {
    let editPreview = [];
    // 서버에서 받은 URL을 PreView에 넣어줌
    detailImageUrl.map((e, idx) => {
      if (e !== null) {
        return editPreview.push(detailImageUrl[idx]);
      }
    });
    setShowImages(editPreview);
    // 리덕스에 files 인덱스를 맞추기 위해 URL도 같이 넣어줌
    dispatch(imgActions.setPre(editPreview));
  }, [props]);

  return (
    <>
      <Grid margin="80px 695px 0 auto" maxWidth="865px" width="100%">
        <Step1Img src={editStep2}></Step1Img>
        <Grid display="flex" margin="0 0 18px 0" alignItems="center">
          <Text margin="0" height="auto" display="inline" bold size="20px">
            추가 이미지
          </Text>
        </Grid>
        <Hr />

        <Grid display="flex" maring="0">
          <Text bold>{`업로드 된 이미지 (${totalImage.length}/3`})</Text>
        </Grid>
        <Grid display="flex">
          <Grid width="auto">
            <label htmlFor="profile_image">
              <Grid
                width="280px"
                height="169px"
                border="1px solid #7B7B7B"
                borderRadius="3px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                cursor="pointer"
                margin="0"
              >
                <UploadIcon src={ImageIcon} />
                <Text color="#7B7B7B" size="14px">
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
                        margin="92px 79px"
                        display="flex"
                        justifycontent="center"
                        color="white"
                        alignItems="center"
                        cursor="pointer"
                        size="14px"
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
                        margin="92px 79px"
                        display="flex"
                        justifycontent="center"
                        color="white"
                        alignItems="center"
                        cursor="pointer"
                        size="14px"
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
              지나치게 선정적이나 폭력적인 이미지를 업로드할 경우 제재가 있을
              수도 있습니다.
            </li>
          </Text>
        </Grid>

        <Grid
          display="flex"
          justifyContent="space-between"
          margin="160px 0 397px 0"
        >
          <StepBtn2 onClick={goBack1}>
            <img
              style={{ width: "8px", height: "auto", marginRight: "16px" }}
              src={groupLeftBtn}
            ></img>
            이전단계
          </StepBtn2>
          <StepBtn2
            onClick={() => {
              editGroupPost();
            }}
            style={{ color: "#68F99E" }}
          >
            작성완료
          </StepBtn2>
        </Grid>
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

const ImageInput = styled.input`
  display: none;
`;

const UploadIcon = styled.img`
  width: 61px;
  height: auto;
`;

const ImagePreview = styled.img`
  height: 169px;
  width: 280px;
  position: relative;
  margin: 32px 8px 0 0;
  object-fit: cover;
`;

const MidHr = styled.hr`
  width: 100%;
  height: 0px;
  background: #cbcbcb;
  border: 1px solid #cbcbcb;
  transform: rotate(180deg);
  margin-bottom: 32px;
`;

const Step1Img = styled.img`
  position: fixed;
  max-width: 295px;
  width: 100%;
  right: 360px;
  top: 170px;
`;

const Hr = styled.hr`
  width: 865px;
  height: 0px;
  margin: 0 0 48px 0;
  border: 1px solid #000000;
  transform: rotate(180deg);
`;

const StepBtn2 = styled.button`
  max-width: 173px;
  width: 100%;
  height: 45px;
  background: #030c37;
  border-radius: 3px;
  font-weight: 700;
  font-size: 18px;
  padding: 10px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  :hover {
    box-shadow: 0 0 3px #030c37;
  }
`;
export default EditImages;
