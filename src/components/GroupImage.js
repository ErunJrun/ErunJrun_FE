import React, { Fragment, useState } from "react";
import styled from "styled-components";
import { Image, Grid, Text } from "../elements";
import ImageUpload from "../assets/ImageUpload.png";

const GroupImage = () => {
  const [imgFile, setImgFile] = useState(null);
  // const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [showImages, setShowImages] = useState([]);
  console.log(showImages);
  console.log(imgFile);

  // const handleChangeFile = (event) => {
  //   let reader = new FileReader();
  //   reader.onloadend = () => {
  //     const base64 = reader.result;
  //     if (base64) {
  //       setImgBase64(base64.toString());
  //     }
  //   };

  //   if (event.target.files[0]) {
  //     reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
  //     setImgFile(event.target.files[0]);
  //   }
  // };

  //이미지 미리보기
  const handleChangeFile = (event) => {
    const imageLists = event.target.files;
    let imageUrlLists = [...showImages];
    let reader = new FileReader();

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
      // window.URL.revokeObjectURL(currentImageUrl);
    }

    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
    }

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(event.target.files);
    }

    setShowImages(imageUrlLists);
  };

  //이미지 미리보기 x버튼 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  return (
    <>
      <Grid margin="30px auto" border="1px solid blue" padding="5px">
        <Grid>
          <Text border="1px solid red" bold size="20px">
            그룹러닝 등록하기
          </Text>
        </Grid>
        <Grid>
          <Text border="1px solid red" display="inline" bold size="15px">
            Step 2. 이미지 업로드
          </Text>
          <Text
            border="1px solid red"
            display="inline"
            margin="0 10px"
            size="13px"
          >
            그룹 러닝 썸네일에 들어갈 대표 이미지와 관련 상세 이미지를
            업로드해주세요.
          </Text>
        </Grid>

        <Grid display="flex">
          <Grid width="500px">
            <Text border="1px solid red" bold size="15px">
              업로드 된 이미지 2/3
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
          {showImages.map((image, id) => (
            <Fragment key={id}>
              <Image shape="imgBtn" height="300px" width="300px" src={image} />
              <div onClick={() => handleDeleteImage(id)}>x버튼</div>
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
    </>
  );
};

const ImageInput = styled.input`
  display: none;
`;

export default GroupImage;
