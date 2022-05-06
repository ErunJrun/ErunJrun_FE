import React, { useEffect, Fragment, useState } from "react";
import styled from "styled-components";
import { Image, Grid, Text } from "../../elements";
import ImageUpload from "../../assets/ImageUpload.png";
import { useDispatch, useSelector } from "react-redux";
import { imgActions } from "../../redux/modules/image";
import { editGroupDB } from "../../redux/modules/feed";
import { useParams } from "react-router-dom";

const EditImages = (props) => {
  const dispatch = useDispatch();
  const params = useParams();
  const groupId = params.groupId;
  const [showImages, setShowImages] = useState([]);
  const totalImage = useSelector((state) => state.image.files);
  const editContents = useSelector((state) => state.feed.detail);
  console.log(totalImage);

  const goBack1 = () => {
    props.setIsLoad1(false);
    props.setIsLoad2(true);
    // setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const editGroupPost = () => {
    dispatch(editGroupDB(groupId, editContents, totalImage));
    dispatch(imgActions.resetFile());
    // history.replace("/groupfeed");
  };

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

  //이미지 삭제
  const handleDeleteImage = (x, idx) => {
    // 서버에서 준 URL 버킷 이름을 기준으로 찾아
    if (x.indexOf("hyemco-butket") !== -1) {
      dispatch(imgActions.editUrl(x));
      // URL을 따로 저장
      dispatch(imgActions.deletePre(idx));
      // 리덕스 files에 있는 URL 삭제 (배열을 맞추기 위함)
    } else {
      // 리덕스에 files 삭제
      dispatch(imgActions.deletePre(idx));
    }
    // 프리뷰 삭제
    setShowImages(showImages.filter((p, index) => index !== idx));
  };

  return (
    <>
      <Grid margin="30px auto" padding="5px">
        <Grid>
          <Text bold size="20px">
            그룹러닝 등록하기
          </Text>
        </Grid>
        <Grid>
          <Text display="inline" bold size="15px">
            Step 2. 이미지 업로드
          </Text>
          <Text display="inline" margin="0 10px" size="13px">
            그룹 러닝 썸네일에 들어갈 대표 이미지와 관련 상세 이미지를
            업로드해주세요.
          </Text>
        </Grid>

        <Grid display="flex">
          <Grid width="500px">
            <Text bold size="15px">
              {`업로드 된 이미지 ${totalImage.length}/3`}
            </Text>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="auto"
        margin="30px 0"
      >
        <Grid width="300px" margin="0px 10px">
          <label htmlFor="profile_image">
            <Image
              shape="imgBtn"
              height="300px"
              width="300px"
              src={ImageUpload}
            />

            <ImageInput
              type="file"
              multiple="multiple"
              id="profile_image"
              onChange={handleChangeFile}
              accept=".jpg, .jpeg, .png"
            ></ImageInput>
          </label>
        </Grid>
        <Grid display="flex" margin="0px 10px">
          {showImages.map((image, idx) => (
            <Fragment key={idx}>
              <Image shape="imgBtn" height="300px" width="300px" src={image} />
              <div onClick={() => handleDeleteImage(image, idx)}>x버튼</div>
            </Fragment>
          ))}
        </Grid>
      </Grid>
      <Grid>
        <Text bold size="15px" bg="#EAEAEA" padding="10px" color="black">
          <li>
            업로드 가능한 이미지 최대 용량은 30MB 입니다. 1000px*1000px 사이즈의
          </li>
          <li>
            이미지 크기를 권장합니다. 가로길이 100px, 세로길이 100px 아하 크기의
          </li>
          <li>
            이미지 경우 화질이 깨질 수도 있습니다. 지나치게 선정적이나 폭력적인
          </li>
          <li>이미지를 업로드할 경우 제제가 있을 수도 있습니다.</li>
        </Text>
      </Grid>

      <StepBtn onClick={goBack1}>이전단계</StepBtn>
      <StepBtn
        onClick={() => {
          editGroupPost();
        }}
      >
        작성완료
      </StepBtn>
    </>
  );
};

const ImageInput = styled.input`
  display: none;
`;

const StepBtn = styled.button`
  width: 184px;
  height: 40px;
  background: #cecece;
  border: 1px solid #4e4e4e;
  border-radius: 5px;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  align-items: center;
  color: #000000;
  margin: 10px;
`;

export default EditImages;
