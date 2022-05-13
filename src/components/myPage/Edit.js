import React, { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfileDB, numberCheckMiddleware, getNumberCheckMiddleware } from "../../redux/modules/mypage"
import { history } from "../../redux/configureStore";
import { Text, Grid } from "../../elements";
import styled from "styled-components";

const Edit = (props) => {
  console.log(props);
  const dispatch = useDispatch(); 
  const fileInput = useRef();
  const userId = localStorage.getItem("userId");
  
  const [nickname, setNickname] = useState(props.profile.nickname);
  const [image, setImage] = useState(props.profile.image);
  const [imgBase, setImgBase] = useState("");
  const [bio, setBio] = useState(props.profile.bio);
  const [likeLocation, setLikeLocation] = useState(props.profile.likeLocation);
  const [likeDistance, setLikeDistance] = useState(props.profile.likeDistance);
  const [userLevel, setUserLevel] = useState(props.profile.userLevel);
  const [phone, setPhone] = useState(props.profile.phone);

  const [agreeSMS, setAgreeSMS] = useState(props.profile.agreeSMS);
  const [numberCK, setNumderCK] = useState("");
console.log(agreeSMS);
  const [runRegion, setRunRegion] = useState([
    "서울특별시",
    "경기도",
    "강원도",
    "인천광역시",
    "충청도 / 세종특별자치시 / 대전광역시",
    "경상북도 / 대구광역시",
    "경상남도 / 부산광역시 / 울산광역시",
    "전라 도 / 광주광역시",
    "제주특별자치시",
  ]);

  const [runDistance, setRunDistance] = useState([
    "잘 모르겠어요",
    `    5km 이상 
    10km 미만`,
    `   10km 이상
    15km 미만`,
    "15km 이상",
    "5km미만",
  ]);

  const [runExp, setRunExp] = useState([
    "런린이",
    "퍼플",
    "블루",
    "레드",
    "블랙",
  ]);

  const changeName = (e) => {
    setNickname(e.target.value);
  };

  const changeImage = (event) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase(base64.toString());
      }
    };

    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]); 
      setImage(event.target.files[0]);
    }
  };

  const changeContent = (e) => {
    setBio(e.target.value);
  };

  const Number = (e) => {
    setPhone(e.target.value);
  };

  const agree = (e) => {
    setAgreeSMS(!agreeSMS);
  };
  const NumderCK = (e) => {
    setNumderCK(e.target.value);
  };
  const choiceRegion = (idx) => {
    setLikeLocation(idx);
  };

  const choiceDistance = (idx) => {
    setLikeDistance(idx);
  };

  const choiceExp = (e) => {
    setUserLevel(e);
  };

  const edit = () => {
    console.log("아아");
    dispatch(editProfileDB(userId, nickname, image, bio, likeLocation, likeDistance, userLevel, phone, agreeSMS));
    
  
  };


  return (
    <>
      <Grid maxWidth="800px" margin="68px auto" justify="center">
        <Grid>
          <Text bold size="20px">
            회원정보 수정
          </Text>
          
          <Text bold size="16px">프로필 사진</Text>
          <MyImage src={
            imgBase
            ? imgBase
            : "https://ifh.cc/g/1cYtTJ.png"
          }/>
          <input
              cursor="pointer"
              type="file"
              name="file"
              id="input-file"
              encType="multipart/form-data"
              onChange={changeImage}
              ref={fileInput}/>
        </Grid>

        <Text bold size="16px">닉네임</Text>
            <Input value={nickname} onChange={changeName} type="text" 
            placeholder="닉네임을 입력해주세요!" />
        <Text bold size="16px">자기소개</Text>
            <Input value={bio} onChange={changeContent} type="text" 
            placeholder="예: 일주일에 7일 러닝하는 불꽃러너!"  />

            <Hr></Hr>

        <Text bold size="16px">핸드폰 번호</Text>
            <Grid display="felx">
                <Inp value={phone} onChange={ Number } type="text" 
                placeholder="010-1234-5678"  maxLength={20} />
                <Button
                onClick={()=>{
                  dispatch(numberCheckMiddleware(phone));
                }}
                >인증요청</Button>
            </Grid>
                
            <Grid display="felx">
                <Inp value={numberCK} onChange={ NumderCK } type="text" 
                placeholder="인증번호를 입력해주세요!"  maxLength={20} />
                <Button
                  onClick={()=>{
                    dispatch(getNumberCheckMiddleware(phone,numberCK));
                  }}
                >인증</Button>
            </Grid>

            <input checked={agreeSMS} value={agreeSMS} onChange={agree} type='checkbox'/>개인정보사용 동의 및 알림수신에 동의합니다.
        <hr/>

        <Text bold size="20px">나의 러닝스타일</Text>
        <Grid margin="70px 0 0 0" display="flex" flexDirection="column">
          <Text margin="0" bold size="18px">
            선호지역
          </Text>
          <Text margin="0" size="16px">
            주로 활동하시는 지역을 선택해주세요.
          </Text>
          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
            {runRegion.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <Label checked={likeLocation}>
                    <input onClick={() => {choiceRegion(idx); }}
                      type="radio"
                      name="runRegion"
                      value={e}
                    ></input>
                    <Text bold>{e}</Text>
                  </Label>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>

        <Grid margin="70px 0 0 0" display="flex" flexDirection="column">
          <Text margin="0" bold size="18px">
            선호 거리
          </Text>

          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
            {runDistance.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <LabelDistance checked={likeDistance}>
                    <input
                      onClick={() => {choiceDistance(idx); }}
                      type="radio"
                      name="runDistance"
                      value={e}
                    ></input>
                    <Text bold>{e}</Text>
                  </LabelDistance>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>

        <Grid margin="70px 0 0 0" display="flex" flexDirection="column">
          <Text margin="0" bold size="18px">
            러닝 경험
          </Text>
          <Text margin="0" size="16px">
            1달 기준의 러닝 횟수를 선택해주세요.
          </Text>

          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
            {runExp.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <LabelExp checked={userLevel}>
                    <input
                      onClick={() => {
                        choiceExp(e);
                      }}
                      type="radio"
                      name="runExp"
                      value={e}
                    ></input>
                    <Text bold>{e}</Text>
                  </LabelExp>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>
        <hr/>
        {/* <Text bold size="16px" color="#7b7b7b">회원 탈퇴</Text> */}
        {/* <Box>회원을 탈퇴할 시, 현재 '굿러너 레벨'과 작성했던 게시물, 북마크한 코스 추천 게시물들이 초기화됩니다.<br/>
             정말로 탈퇴하시겠습니까?
             <button>탈퇴하기</button>
        </Box> */}
        <Grid margin="70px 0 0 450px">
            <Button
            onClick={() => {
              history.push("/mypage")
            }}>수정취소</Button>
            <Button
            onClick={() => {
              edit();
            }}>저장하기</Button>
        </Grid>
      </Grid>
    </>
  );
};



const Box = styled.div`
  height: 66px;
  background: #ddd;
  color: #000;
  padding: 30px;
`;

const MyImage = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%
`;

const Button = styled.button`
  width: 156px;
  height: 55px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border: solid 1px #030c37;
  background-color: #030c37;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin-left: 16px;
  :hover {font-size: 17px;}
`;

const Input= styled.input`
  width: 767px;
  height: 55px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 3px;
  border: solid 1px #cbcbcb;
  padding-left: 32px;
  font-size: 16px;
  font-weight: 500;
`;

const Inp= styled.input`
  width: 302px;
  height: 55px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 3px;
  border: solid 1px #cbcbcb;
  padding-left: 32px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
`;

const Hr = styled.div`
  width: 800px;
  height: 1px;
  background-color: #cbcbcb;
`;

const LabelExp = styled.label`
  input {
    display: none;
  }
  input + p {
    margin: 10px;
    width: 180px;
    height: 50px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 11px auto;
    border-radius: 3px;
    border: solid 1px #000;
    cursor: pointer;
    box-sizing: border-box;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #000;
  }
`;

const LabelDistance = styled.label`
  input {
    display: none;
  }
  input + p {
    margin: 10px;
    width: 180px;
    height: 74px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 11px auto;
    border-radius: 3px;
    border: solid 1px #000;
    cursor: pointer;
    box-sizing: border-box;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #000;
  }
`;

const Label = styled.label`
  input {
    display: none;
  }
  input + p {
    margin: 10px 5px;
    width: 316px;
    height: 74px;
    flex-grow: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 24px auto;
    border-radius: 3px;
    border: solid 1px #000;
    cursor: pointer;
    box-sizing: border-box;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #000;
  }
`;

export default Edit;
