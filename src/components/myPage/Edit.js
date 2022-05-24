import React, { Fragment, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getInformation,
  editProfileDB,
  numberCheckMiddleware,
  getNumberCheckMiddleware,
  deleteUserDB,
} from "../../redux/modules/mypage";
import { history } from "../../redux/configureStore";
import { Text, Grid } from "../../elements";
import styled from "styled-components";
import LevelBox from "../groupDetail/LevelBox";
import LevelShoes from "../LevelShoes";
import { useMediaQuery } from "react-responsive";
import backBtn from "../../assets/groupFeed/backBtn.svg";
import swal from "sweetalert";
import { loginCheckDB } from "../../redux/modules/user";

const Edit = (props) => {
  const isMobile = useMediaQuery({
    query: "(max-width:820px)",
  });

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
  const [userLevel, setUserLevel] = useState(props.profile.userLevel);
  const [phone, setPhone] = useState(props.profile.phone);
  const [agreeSMS, setAgreeSMS] = useState(props.profile.agreeSMS);
  const [numberCK, setNumderCK] = useState("");
  const [certPhone, setCertPhone] = useState(props.profile.certPhone);
  const [ck, setCk] = useState(false);

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

  const [runRegionMob, setRunRegionMob] = useState([
    "서울",
    "경기",
    "인천",
    "강원",
    "충청 / 세종 / 대전",
    "경북 / 대구",
    "경남 / 부산 / 울산",
    "전라 / 광주",
    "제주",
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

  const [runDistanceMob, setRunDistanceMob] = useState([
    "잘 모르겠어요",
    "5km미만",
    "5km 이상 10km 미만",
    "10km 이상 15km 미만",
    "15km 이상",
  ]);

  const [runExp, setRunExp] = useState([
    "오렌지",
    "퍼플",
    "블루",
    "레드",
    "블랙",
  ]);

  const [runExpComment, setRunExpComment] = useState([
    "처음이에요",
    `5회 미만`,
    `5회 이상 10회 미만`,
    `10회 이상 15회 미만`,
    `15회 이상`,
  ]);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const changeName = (e) => {
    if (e.target.value.length >= 8) {
      swal("8자 이상 작성할 수 없습니다.");
    }
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
    if (e.target.value.length >= 50) {
      swal("50자 이상 작성할 수 없습니다.");
    }
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

  const CK = (e) => {
    setCk(true);
  };

  const edit = () => {
    console.log("나와라");
    dispatch(
      editProfileDB(
        userId,
        nickname,
        image,
        bio,
        likeLocation,
        likeDistance,
        runExp[userLevel],
        phone,
        agreeSMS
      )
    );
  };

  useEffect(() => {
    console.log("실행");
    setNickname(props.profile.nickname);
    setImage(props.profile.profileUrl);
    setImgBase(props.profile.profileUrl);
    setBio(props.profile.bio);
    setLikeLocation(props.profile.likeLocation);
    setLikeDistance(props.profile.likeDistance);
    setUserLevel(props.profile.userLevel);
    setPhone(props.profile.phone);
    setAgreeSMS(props.profile.agreeSMS);
    setCertPhone(props.profile.certPhone);
  }, [props]);

  if( bio === null ) {
    setBio("")
  }

  if (isMobile) {
    return (
      <>
        <Grid
          zIndex="3"
          bg="#ffffff"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="54px"
          display="flex"
          padding="10px 10px"
          margin="0 auto"
        >
          <Grid
            display="flex"
            width="375px"
            justifyContent="left"
            alignItems="center"
          >
            <img
              style={{ width: "10px", margin: "0 10px" }}
              src={backBtn}
              onClick={() => {
                history.go(-1);
              }}
            />
            <Text margin="0 0 0 130px" bold size="16px">
              계정설정
            </Text>
          </Grid>
        </Grid>
        <Grid
          display="flex"
          justifyContent="center"
          width="343px"
          margin="70px auto "
        >
          <Grid>
            <Text bold size="14px">
              회원정보 수정
            </Text>
            <_Hr />
            <Text size="13px">프로필 사진</Text>
            <Grid textAlign="center" width="100%">
              <_MyImage
                src={imgBase ? imgBase : "https://ifh.cc/g/1cYtTJ.png"}
              />
            </Grid>
            <Grid textAlign="center" width="100%" margin="15px 0 0 0">
              <_ProfileLabel htmlFor="input-file">사진 변경</_ProfileLabel>
              <ProfileInput
                cursor="pointer"
                type="file"
                name="file"
                id="input-file"
                encType="multipart/form-data"
                onChange={changeImage}
                accept=".jpg, .jpeg, .png"
                ref={fileInput}
              />
            </Grid>

            <Text size="13px" margin="35px 0 16px 0">
              닉네임
            </Text>
            <_Input
              value={nickname}
              onChange={changeName}
              type="text"
              placeholder="닉네임을 입력해주세요!"
              maxLength={8}
            />
            <Text size="13px" margin="22px 0 16px 0">
              자기소개
            </Text>

              <_Input
                value={bio}
                onChange={changeContent}
                type="text"
                placeholder="예: 일주일에 7일 러닝하는 불꽃러너!"
                maxLength={50}
              />
  
          </Grid>

          <Grid>
            <Text bold size="14px" margin="60px 0 16px 0">
              휴대폰 인증
            </Text>
            <_Hr />
            <Text size="13px">휴대폰 번호</Text>
            <Grid display="felx">
              <_Inp
                value={phone}
                onChange={Number}
                type="text"
                placeholder="010-1234-5678"
                maxLength={20}
              />
            </Grid>

            {certPhone === false ? (
              <>
                <_Box>
                  <Btn_
                    onClick={() => {
                      dispatch(numberCheckMiddleware(phone));
                    }}
                  >
                    인증요청
                  </Btn_>
                </_Box>
                <Grid display="felx">
                  <_Inp
                    value={numberCK}
                    onChange={NumderCK}
                    type="text"
                    placeholder="인증번호 입력"
                    maxLength={20}
                  />
                  <Btn__
                    onClick={() => {
                      dispatch(getNumberCheckMiddleware(phone, numberCK));
                      CK();
                    }}
                  >
                    확인
                  </Btn__>
                </Grid>

                {ck === false ? (
                  <>
                    <input
                      disabled
                      checked
                      value={agreeSMS}
                      onChange={agree}
                      type="checkbox"
                    />
                    개인정보사용 동의 및 알림수신에 동의합니다.
                  </>
                ) : (
                  <>
                    <input
                      checked={agreeSMS}
                      value={agreeSMS}
                      onChange={agree}
                      type="checkbox"
                    />
                    개인정보사용 동의 및 알림수신에 동의합니다.
                  </>
                )}
              </>
            ) : (
              <>
                <input
                  checked={agreeSMS}
                  value={agreeSMS}
                  onChange={agree}
                  type="checkbox"
                />
                개인정보사용 동의 및 알림수신에 동의합니다.
              </>
            )}
          </Grid>
          <Grid>
            <Text bold size="14px" textAlign="left" margin="60px 0 16px 0">
              나의 러닝 스타일
            </Text>
            <_Hr />
            <Text margin="22px 0 16px 0" size="13px" textAlign="left">
              선호하는 러닝 지역
            </Text>
            <Grid
              width="343px"
              height="122px"
              margin="0 auto"
              display="flex"
              justifyContent="space-between"
            >
              {runRegionMob.map((e, idx) => {
                return (
                  <Fragment key={idx}>
                    <LabelMob>
                      <input
                        onChange={() => {
                          choiceRegion(idx + 1);
                          console.log(idx + 1);
                        }}
                        type="radio"
                        name="runRegion"
                        value={e}
                        checked={runRegionMob[likeLocation - 1] === e ? e : ""}
                      ></input>
                      <Text margin="0" regular size="11px">
                        {e}
                      </Text>
                    </LabelMob>
                  </Fragment>
                );
              })}
            </Grid>

            <Text margin="37px 0 16px 0" size="13px" textAlign="left">
              선호하는 러닝 거리
            </Text>
            <Grid
              width="343px"
              height="218px"
              margin="0 auto"
              display="flex"
              justifyContent="center"
            >
              {runDistanceMob.map((e, idx) => {
                return (
                  <Fragment key={idx}>
                    <LabelDistanceMob>
                      <input
                        onChange={() => {
                          choiceDistance(idx);
                          console.log(idx);
                        }}
                        type="radio"
                        name="runDistance"
                        checked={runDistanceMob[likeDistance] === e ? e : ""}
                        value={e}
                      ></input>
                      <Text margin="0" regular size="11px">
                        {e}
                      </Text>
                    </LabelDistanceMob>
                  </Fragment>
                );
              })}
            </Grid>

            <Text margin="37px 0 16px 0" size="13px" textAlign="left">
              러닝 횟수(1달 기준)
            </Text>
            <Grid
              width="343px"
              height="218px"
              margin="0 auto 32px auto"
              display="flex"
              justifyContent="center"
            >
              {runExpComment.map((e, idx) => {
                return (
                  <Fragment key={idx}>
                    <LabelExpMob checkLevel={userLevel} checked={userLevel}>
                      <input
                        onChange={() => {
                          choiceExp(idx);
                          console.log(idx);
                          console.log(e);
                          console.log(userLevel);
                        }}
                        type="radio"
                        name="runExp"
                        checked={runExpComment[userLevel] === e ? e : ""}
                        value={e}
                      ></input>
                      <Text margin="0" regular size="11px">
                        {e}
                      </Text>
                    </LabelExpMob>
                  </Fragment>
                );
              })}
            </Grid>
          </Grid>
          <Grid
            height="auto"
            display="flex"
            justifyContent="center"
            alignItems="center"
            margin="0 0 80px 0"
          >
            {userLevel >= 0 && userLevel !== "" ? (
              <>
                <LevelShoes userLevel={runExp[userLevel]} />
                <Text
                  display="flex"
                  alignItems="center"
                  size="12px"
                  margin="0 0 0 8px"
                >
                  당신의 러닝 레벨은
                  <LevelBox userLevel={runExp[userLevel]} />
                  입니다!
                </Text>
              </>
            ) : null}
          </Grid>
        </Grid>

        <Grid
          zIndex="3"
          bg="#fff"
          justifyContent="center"
          position="fixed"
          bottom="0"
          left="0"
          width="100%"
          height="75px"
          display="flex"
          padding="11px 13px"
          boxShadow="0px -4px 6px rgba(227, 227, 227, 0.4);"
        >
          <Grid
            width="375px"
            display="flex"
            justifyContent="center"
            height="59px"
          >
            <_Button
              onClick={() => {
                history.push(`/mypage/${userId}`);
              }}
            >
              취소
            </_Button>
            <__Button
              onClick={() => {
                edit();
              }}
            >
              저장하기
            </__Button>
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <>
      <Grid maxWidth="800px" margin="68px auto" justify="center">
        <Grid>
          <Text bold size="20px">
            회원정보 수정
          </Text>
          <Hrr />

          <Text bold size="16px">
            프로필 사진
          </Text>
          <Grid display="flex" alignItems="center">
            <MyImage src={imgBase ? imgBase : "https://ifh.cc/g/1cYtTJ.png"} />
            <ProfileLabel htmlFor="input-file">사진 변경</ProfileLabel>
            <ProfileInput
              cursor="pointer"
              type="file"
              name="file"
              id="input-file"
              encType="multipart/form-data"
              onChange={changeImage}
              accept=".jpg, .jpeg, .png"
              ref={fileInput}
            />
          </Grid>
        </Grid>

        <Text bold size="16px">
          닉네임
        </Text>
        <Input
          value={nickname}
          onChange={changeName}
          type="text"
          placeholder="닉네임을 입력해주세요!"
          maxLength={8}
        />
        <Text bold size="16px">
          자기소개
        </Text>

          <Input
            value={bio}
            onChange={changeContent}
            type="text"
            placeholder="예: 일주일에 7일 러닝하는 불꽃러너!"
            maxLength={50}
          />

        <Hr style={{ margin: "63px 0 80px 0" }} />
        <Text bold size="20px">
          휴대폰인증
        </Text>
        <Hrr />

        <Text bold size="16px">
          핸드폰 번호
        </Text>
        <Grid display="felx">
          <Inp
            value={phone}
            onChange={Number}
            type="text"
            placeholder="010-1234-5678"
            maxLength={20}
          />
        </Grid>

        {certPhone === false ? (
          <>
            <_Box>
              <Button
                onClick={() => {
                  dispatch(numberCheckMiddleware(phone));
                }}
              >
                인증요청
              </Button>
            </_Box>
            <Grid display="felx">
              <Inp
                value={numberCK}
                onChange={NumderCK}
                type="text"
                placeholder="인증번호 입력"
                maxLength={20}
              />
              <Button
                onClick={() => {
                  dispatch(getNumberCheckMiddleware(phone, numberCK));
                  CK();
                }}
              >
                인증
              </Button>
            </Grid>

            {ck === false ? (
              <>
                <input
                  disabled
                  checked
                  value={agreeSMS}
                  onChange={agree}
                  type="checkbox"
                />
                개인정보사용 동의 및 알림수신에 동의합니다.
              </>
            ) : (
              <>
                <input
                  checked={agreeSMS}
                  value={agreeSMS}
                  onChange={agree}
                  type="checkbox"
                />
                개인정보사용 동의 및 알림수신에 동의합니다.
              </>
            )}
          </>
        ) : (
          <>
            <input
              checked={agreeSMS}
              value={agreeSMS}
              onChange={agree}
              type="checkbox"
            />
            개인정보사용 동의 및 알림수신에 동의합니다.
          </>
        )}

        <hr style={{ margin: "58px 0 80px 0" }} />
        <Text bold size="20px" margin="90px 0 18px 0">
          나의 러닝스타일
        </Text>
        <Hrr />
        <Grid margin="0 0 84px 0" display="flex" flexDirection="column">
          <Text margin="40px 0 16px 0" bold size="18px">
            선호하는 러닝 지역
          </Text>

          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
            {runRegion.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <Label>
                    <input
                      onChange={() => {
                        choiceRegion(idx + 1);
                        console.log(idx + 1);
                      }}
                      type="radio"
                      name="runRegion"
                      value={e}
                      checked={runRegion[likeLocation - 1] === e ? e : ""}
                    ></input>
                    <Text bold>{e}</Text>
                  </Label>
                </Fragment>
              );
            })}
          </Grid>
        </Grid>

        <Grid margin="70px 0 0 0" display="flex" flexDirection="column">
          <Text margin="0 0 18px 0" bold size="18px">
            선호하는 러닝 거리
          </Text>

          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
            {runDistance.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <LabelDistance>
                    <input
                      onChange={() => {
                        choiceDistance(idx);
                        console.log(idx);
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
          <Text margin="0 0 18px 0" bold size="18px">
            러닝 횟수(1달 기준)
          </Text>

          <Grid flexWrap="Wrap" maxWidth="1000px" width="100%" display="flex">
            {runExpComment.map((e, idx) => {
              return (
                <Fragment key={idx}>
                  <LabelExp checkLevel={userLevel} checked={userLevel}>
                    <input
                      onChange={() => {
                        choiceExp(idx);
                        console.log(idx);
                      }}
                      type="radio"
                      name="runExp"
                      checked={runExpComment[userLevel] === e ? e : ""}
                      value={e}
                    ></input>
                    <Text bold>{e}</Text>
                  </LabelExp>
                </Fragment>
              );
            })}
          </Grid>

          <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            margin="20px 0 0 0 "
          >
            {userLevel >= 0 && userLevel !== "" ? (
              <>
                <LevelShoes userLevel={runExp[userLevel]} />
                <Text
                  display="flex"
                  alignItems="center"
                  size="18px"
                  bold
                  margin="15px 0 10px 8px"
                >
                  당신의 러닝 레벨은
                  <LevelBox userLevel={runExp[userLevel]} />
                  입니다.
                </Text>
              </>
            ) : null}
          </Grid>
        </Grid>
        <hr style={{ margin: "70px 0 0 0" }} />
        <Text bold size="16px" color="#7b7b7b" _onClick={toggleModal}>
          회원 탈퇴
        </Text>

        {modal && (
          <Overlay onClick={toggleModal}>
            <Wrap>
              <>
                <Text size="18" textalign="center" padding="35px 0 0 0">
                  탈퇴하실 경우,
                  <span style={{ fontWeight: "900" }}>
                    모든 데이터가 삭제되며 복구가 불가능
                  </span>
                  합니다.
                  <br />
                  안내 사항을 모두 확인하였으며, 이에 동의하십니까? <br />
                </Text>
                <Btn
                  onClick={() => {
                    dispatch(deleteUserDB());
                  }}
                >
                  동의 및 탈퇴하기
                </Btn>
                <_Btn onClick={toggleModal}>돌아가기</_Btn>
              </>
            </Wrap>
          </Overlay>
        )}

        <Grid margin="70px 0 0 450px">
          <Button
            onClick={() => {
              history.push(`/mypage/${userId}`);
            }}
          >
            수정취소
          </Button>
          <Button
            onClick={() => {
              edit();
            }}
          >
            저장하기
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const MyImage = styled.img`
  height: 160px;
  width: 160px;
  border-radius: 50%;
`;

const _MyImage = styled.img`
  height: 96px;
  width: 96px;
  border-radius: 50%;
  text-align: center;
`;

const ProfileLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  border: solid 1px #030c37;
  color: #030c37;
  cursor: pointer;
  border-radius: 3px;
  padding: 6px 20px;
  margin-left: 32px;
`;

const _ProfileLabel = styled.label`
  width: 83px;
  height: 26px;
  font-size: 11px;
  font-weight: bold;
  border: solid 1px #030c37;
  color: #030c37;
  cursor: pointer;
  border-radius: 3px;
  padding: 6px 20px;
`;

const ProfileInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
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
  :hover {
    font-size: 17px;
  }
`;

const Btn_ = styled.button`
  width: 88px;
  height: 50px;
  border: solid 1px #030c37;
  background-color: #030c37;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  margin: 8px 0 0 -94px;
`;

const Btn__ = styled.button`
  width: 88px;
  height: 50px;
  border: solid 1px #030c37;
  background-color: #030c37;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  margin: -3px 0px;
`;

const _Button = styled.div`
  width: 164px;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px auto;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  box-sizing: border-box;
  margin: 0;
  border: solid 1px #030c37;
  margin: 0px 4px;
`;

const __Button = styled.div`
  width: 164px;
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px auto;
  cursor: pointer;
  border-radius: 3px;
  background-color: #030c37;
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  margin: 0px 4px;
`;

const _Box = styled.div`
  margin: -74px 0 20px 340px;
`;

const Input = styled.input`
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

const _Input = styled.input`
  width: 300px;
  height: 44px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 3px;
  border: solid 1px #cbcbcb;
  padding-left: 32px;
  font-size: 13px;
  font-weight: 500;
`;

const Inp = styled.input`
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

const _Inp = styled.input`
  width: 210px;
  height: 44px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 3px;
  border: solid 1px #cbcbcb;
  padding-left: 32px;
  font-size: 13px;
  font-weight: normal;
  margin-bottom: 16px;
`;

const Hr = styled.div`
  width: 800px;
  height: 1px;
  background-color: #cbcbcb;
`;

const _Hr = styled.div`
  width: 343px;
  height: 1px;
  background-color: #000;
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

const LabelExpMob = styled.label`
  input {
    display: none;
  }

  input + p {
    width: 343px;
    height: 34px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px auto;
    border-radius: 35px;
    cursor: pointer;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #b8b8b8;
    gap: 8px;
    color: #000;
  }
  input:checked + p {
    background-color: #68f99e;
    color: #030c37;
    font-weight: 500;
  }
`;

{/*const LabelExpMob = styled.label`
  input {
    display: none;
  }

  input + p {
    width: 343px;
    height: 34px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px auto;
    border-radius: 35px;
    cursor: pointer;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #b8b8b8;
    gap: 8px;
    color: #000;
  }
  input:checked + p {
    ${(props) =>
      props.checkLevel === 0
        ? "background-color:  #FF823B;"
        : props.checkLevel === 1
        ? "background-color:  #BD6AFF;"
        : props.checkLevel === 2
        ? "background-color:  #4248C4;"
        : props.checkLevel === 3
        ? "background-color: #EE4343;"
        : props.checkLevel === 4
        ? "background-color:  #303030;"
        : null}
    ${(props) => (props.checkLevel === 4 ? "color:  white;" : "color: black;")}
    font-weight: 500;
  }
`;*/}

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
  left: 30%;
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
  background: rgba(49, 49, 49, 0.8);
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
  :hover {
    background-color: #f10d43;
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
  :hover {
    background-color: #bbb;
  }
`;

const LabelMob = styled.label`
  input {
    display: none;
  }
  input + p {
    width: 110px;
    height: 34px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px auto;
    border-radius: 35px;
    cursor: pointer;
    box-sizing: border-box;
    margin: 0 0 12px 0;
    border: solid 1px #b8b8b8;
    gap: 8px;
  }

  input:checked + p {
    background-color: #68f99e;
    color: black;
    border: #68f99e;
    font-weight: 500;
  }
`;

const LabelDistanceMob = styled.label`
  input {
    display: none;
  }

  input + p {
    width: 343px;
    height: 34px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px auto;
    border-radius: 35px;
    cursor: pointer;
    box-sizing: border-box;
    margin: 0;
    border: solid 1px #b8b8b8;
    gap: 8px;
  }
  input:checked + p {
    background-color: #68f99e;
    color: black;
    border: 1px solid #68f99e;
    font-weight: 500;
  }
`;
export default Edit;
