import React, { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfileDB, numberCheckMiddleware, getNumberCheckMiddleware, deleteUserDB } from "../../redux/modules/mypage"
import { history } from "../../redux/configureStore";
import { Text, Grid } from "../../elements";
import styled from "styled-components";
import LevelBox from "../groupDetail/LevelBox";
import LevelShoes from "../LevelShoes";


const Edit = (props) => {
  console.log(props);
  const dispatch = useDispatch(); 
  const fileInput = useRef();
  const userId = localStorage.getItem("userId");
  
  const [nickname, setNickname] = useState(props.profile.nickname);
  const [image, setImage] = useState(props.profile.profileUrl);
  const [imgBase, setImgBase] = useState(props.profile.profileUrl);
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
    "인천광역시",
    "강원도",
    "충청도 / 세종특별자치시 / 대전광역시",
    "경상북도 / 대구광역시",
    "경상남도 / 부산광역시 / 울산광역시",
    "전라 도 / 광주광역시",
    "제주특별자치시",
  ]);

  const [runDistance, setRunDistance] = useState([
    "5km미만",
    `    5km 이상 
    10km 미만`,
    `   10km 이상
    15km 미만`,
    "15km 이상",
    "잘 모르겠어요",
  ]);

  const [runExp, setRunExp] = useState([
    "오렌지",
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
    console.log("나와라");
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
            : 
            "https://ifh.cc/g/1cYtTJ.png"
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

                { phone === null ?  
                 <Button
                    onClick={()=>{
                    dispatch(numberCheckMiddleware(phone));
                  }}
                >
                  인증요청
                  </Button>
                : 
                  null
                }
               
            </Grid>
                
            { phone === null ? 
              <Grid display="felx">
                  <Inp value={numberCK} onChange={ NumderCK } type="text" 
                  placeholder="인증번호를 입력해주세요!"  maxLength={20} />
                  <Button
                    onClick={()=>{
                      dispatch(getNumberCheckMiddleware(phone,numberCK));
                    }}
                  >인증</Button>
              </Grid>
            : 
              null
            }
            

            <input checked={agreeSMS} value={agreeSMS} onChange={agree} type='checkbox'/>
              개인정보사용 동의 및 알림수신에 동의합니다.
        <hr/>

        <Text bold size="20px">나의 러닝스타일</Text>
        <Grid margin="0 0 84px 0" display="flex" flexDirection="column">
            <Text margin="0 0 16px 0" bold size="18px">
              Step 1. 선호하는 러닝 지역을 선택해주세요!
            </Text>
            <Hr />

          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
            {runRegion.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <Label checked={likeLocation}>
                    <input onClick={() => {choiceRegion(idx+1); }}
                      type="radio"
                      name="runRegion"
                      //checked={likeLocation}
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
            Step 1. 선호하는 러닝 거리를 선택해주세요!
          </Text>

          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
            {runDistance.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <LabelDistance checked={likeDistance}>
                    <input
                      onClick={() => {choiceDistance(idx + 1); }}
                      type="radio"
                      name="runDistance"
                      //checked={likeDistance}
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
          Step 3. (1달 기준) 러닝 횟수를 선택해주세요!
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
                      //checked={userLevel}
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
        <Text bold size="16px" color="#7b7b7b">회원 탈퇴</Text>
        <Box>탈퇴하실 경우, 모든 데이터가 삭제되며 복구가 불가능합니다.<br/>
          안내 사항을 모두 확인하였으며, 이에 동의하십니까? <br/>
             <button
             onClick={() => {
              dispatch(deleteUserDB());
              window.alert("회원탈퇴에 성공하였습니다");
              history.push("/login");
            }}
             >동의 및 탈퇴하기</button>
             <button>돌아가기</button>
        </Box>
        <Grid margin="70px 0 0 450px">
            <Button
            onClick={() => {
              history.push(`/mypage/${userId}`)
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
  margin-left: 10px; 
  input {
    display: none;
  }
  input + p {
    width: 147px;
    height: 64px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px auto;
    border-radius: 100px;
    cursor: pointer;
    background-color: #f0f0f0;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #030c37;
  }
  `;

const LabelDistance = styled.label`
  margin-left: 10px; 
  input {
    display: none;
  }
  input + p {
    width: 147px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    border-radius: 100px;
    cursor: pointer;
    box-sizing: border-box;
    background-color: #f0f0f0;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #030c37;
  }
  `;

const Label = styled.label`
  margin-left: 10px; 
  input {
    display: none;
  }
  input + p {
    width: 256px;
    height: 56px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px auto;
    border-radius: 100px;
    cursor: pointer;
    box-sizing: border-box;
    background-color: #f0f0f0;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #030c37;
  }
  `;

export default Edit;
