/* eslint-disable react/jsx-pascal-case */
import React, { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInformation,editProfileDB, numberCheckMiddleware, getNumberCheckMiddleware, deleteUserDB } from "../../redux/modules/mypage"
import { history } from "../../redux/configureStore";
import { Text, Grid } from "../../elements";
import styled from "styled-components";
import LevelBox from "../groupDetail/LevelBox";
import LevelShoes from "../LevelShoes";


const Edit = (props) => {

  const dispatch = useDispatch(); 
  const fileInput = useRef();
  const userId = localStorage.getItem("userId");
  const isLogin = useSelector((state) => state.user.isLogin);
  
  const [nickname, setNickname] = useState(props.profile.nickname);
  const [image, setImage] = useState(props.profile.profileUrl);
  const [imgBase, setImgBase] = useState(props.profile.profileUrl);
  const [bio, setBio] = useState(props.profile.bio);
  const [likeLocation, setLikeLocation] = useState(props.profile.likeLocation);
  const [likeDistance, setLikeDistance] = useState(props.profile.likeDistance);
  const [userLevel, setUserLevel] = useState(props?.profile.userLevel);
  const [phone, setPhone] = useState(props.profile.phone);
  const [agreeSMS, setAgreeSMS] = useState(props.profile.agreeSMS);
  const [numberCK, setNumderCK] = useState("");
  const [textLength, setTextLength] = useState(0);

  const certPhone = props.profile.certPhone;
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
    "잘 모르겠어요",
    "5km미만",
    `    5km 이상 
    10km 미만`,
    `   10km 이상
    15km 미만`,
    "15km 이상",
  ]);

  const [runExp, setRunExp] = useState([
    "오렌지",
    "퍼플",
    "블루",
    "레드",
    "블랙",
  ]);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  };

  const changeName = (e) => { 
    if(e.target.value.length >= 8) {
      window.alert("8자 이상 작성할 수 없습니다.");
    }
    setNickname(e.target.value)
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
    if(e.target.value.length >= 50) {
      window.alert("50자 이상 작성할 수 없습니다.");
    }
    setBio(e.target.value)
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

 {/* useEffect(() => {
    if (!isLogin) {
      window.alert("비정상적인 접근입니다.");
      history.push("/");
    }
  }, []);
*/}

  useEffect(() => {
    console.log("실행");
    setNickname(props.profile.nickname);
    setImage(props.profile.profileUrl);
    setImgBase(props.profile.profileUrl);
    setBio(props.profile.bio);
    setLikeLocation(props.profile.likeLocation);
    setLikeDistance(props.profile.likeDistance);
    setUserLevel(props?.profile.userLevel);
    setPhone(props.profile.phone);
    setAgreeSMS(props.profile.agreeSMS);
  }, [props]);
  

  return (
    <>
      <Grid maxWidth="800px" margin="68px auto" justify="center">
        <Grid>
          <Text bold size="20px">
            회원정보 수정
          </Text>
          <Hrr/>
          
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
              accept=".jpg, .jpeg, .png"
              ref={fileInput}/>
        </Grid>

        <Text bold size="16px">닉네임</Text>
            <Input 
            value={nickname} 
            onChange={changeName} 
            type="text" 
            placeholder="닉네임을 입력해주세요!"
            maxLength={8} />
            <Text margin="0" size="14px">
             
            </Text>
        <Text bold size="16px">자기소개</Text>
            <Input value={bio} onChange={changeContent} type="text" 
            placeholder="예: 일주일에 7일 러닝하는 불꽃러너!" 
            maxLength={50} />

            <Hr style={{margin: "63px 0 80px 0"}}></Hr>

        <Text bold size="20px">
          휴대폰인증
        </Text>
        <Hrr/>

        <Text bold size="16px">핸드폰 번호</Text>
            <Grid display="felx">
                <Inp value={phone} onChange={ Number } type="text" 
                placeholder="010-1234-5678"  maxLength={20} />
            </Grid>
                
            { certPhone === false ? 
            <>
            <_Box>
              <Button
                onClick={()=>{
                dispatch(numberCheckMiddleware(phone));
                }}
              >
                인증요청
              </Button>
            </_Box>
              <Grid display="felx">      
                  <Inp value={numberCK} onChange={ NumderCK } type="text" 
                  placeholder="인증번호를 입력해주세요!"  maxLength={20} />
                  <Button
                    onClick={()=>{
                      dispatch(getNumberCheckMiddleware(phone,numberCK));
                    }}
                  >인증</Button>
              </Grid>
              </>
            : 
              null
            }
            <input checked={agreeSMS} value={agreeSMS} onChange={agree} type='checkbox'/>
              개인정보사용 동의 및 알림수신에 동의합니다.
        <hr style={{margin: "58px 0 80px 0"}}/>

        <Text 
        bold 
        size="20px"
        margin="90px 0 18px 0"
        >나의 러닝스타일</Text>
        <Hrr/>
        <Grid margin="0 0 84px 0" display="flex" flexDirection="column">
            <Text 
            margin="40px 0 16px 0"
            bold size="18px">
              Step 1. 선호하는 러닝 지역을 선택해주세요!
            </Text>

          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
            {runRegion.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <Label >
                    <input 
                    onClick={() => {
                      choiceRegion(idx+1); 
                      console.log(idx+1);
                    }}
                      type="radio"
                      name="runRegion"                    
                      value={e}
                      checked={runRegion[likeLocation-1] === e ? e : ""}
                    ></input>
                    <Text bold>{e}</Text>
                  </Label>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>

        <Grid margin="70px 0 0 0" display="flex" flexDirection="column">
          <Text 
          margin="0 0 18px 0" 
          bold 
          size="18px">
            Step 1. 선호하는 러닝 거리를 선택해주세요!
          </Text>

          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
            {runDistance.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <LabelDistance>
                    <input
                      onClick={() => {
                        choiceDistance(idx); 
                        console.log(idx)
                      }}
                      type="radio"
                      name="runDistance"
                      checked={runDistance[likeDistance] === e ? e : ""}
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
           <Text 
           margin="0 0 18px 0"
           bold 
           size="18px">
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
                      checked={ userLevel === e ? e : ""}
                      value={e}
                    ></input>
                    <Text bold>{e}</Text>
                  </LabelExp>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>
        <hr style={{margin: "70px 0 0 0"}}/>
        <Text 
        bold size="16px" 
        color="#7b7b7b"
        _onClick={toggleModal}
        >
          회원 탈퇴
        </Text>

        {modal&&(
            <Overlay  onClick = {toggleModal}>  
              <Wrap>
              <>
                <Text 
                size="18" 
                textalign="center"
                padding="35px 0 0 0"
                >
                  탈퇴하실 경우, 
                  <span style={{fontWeight: "900"}}>
                    모든 데이터가 삭제되며 복구가 불가능
                  </span>
                  합니다.<br/>
                  안내 사항을 모두 확인하였으며, 이에 동의하십니까? <br/>
                </Text>
                  <Btn
                  onClick={() => {
                    dispatch(deleteUserDB());
                  }}
                  >동의 및 탈퇴하기
                  </Btn>
                  <_Btn
                  onClick = {toggleModal}
                  >돌아가기
                  </_Btn>
              </>
              </Wrap>
            </Overlay>
            )}
        
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


const MyImage = styled.img`
  height: 160px;
  width: 160px;
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

const _Box = styled.div`
  margin: -74px 0 20px 340px ;
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

const Hrr = styled.div`
  width: 800px;
  height: 2px;
  background-color: #000;
  margin: -8px 0 20px 0;
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

const Wrap = styled.div`
  z-index: 0;
  position: absolute;
  left:30%;
  top: 210px;
  margin: 0;
  padding: 24px 10px;
  width: 642px;
  height: 222px;
  background: #ffffff;
  box-shadow: 3px 8px 17px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
`;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: rgba(49,49,49,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Btn = styled.button`
  width: 245px;
  height: 46px;
  text-align: center;
  border: none;
  border-radius: 3px;
  background-color: #ff2d55;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  margin: 30px 30px 0 60px;
  :hover{
    background-color: #F10D43;
  }
`;

const _Btn = styled.button`
  width: 245px;
  height: 46px;
  text-align: center;
  border: none;
  border-radius: 3px;
  background-color: #ddd;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  :hover{
    background-color: #bbb;
  }
`;

export default Edit;
