/* eslint-disable react/jsx-pascal-case */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Text, Grid } from "../../elements";
import styled from "styled-components";
import { FiChevronRight } from "react-icons/fi";
import { history } from "../../redux/configureStore";
import { AiOutlineClose } from "react-icons/ai";
//import "./Schedule.css"

const Schedule = () => {
  const [modal, setModal] = useState(false);
  const profile_list = useSelector((state) => state.mypage.list);
  console.log(profile_list);
  if (profile_list.length === 0) {
    return <></>;
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {profile_list.waiting.length === 0 ? null : (
        <Box>
          <Text bold size="18px" margin="0px 0px 32px 0px">
            참여예정 그룹 러닝
          </Text>

          <Text
            bold
            size="14px"
            color="#000"
            margin="-53px 0px 0px 1140px"
            _onClick={toggleModal}
            cursor="pointer"
          >
            전체보기
          </Text>

          <Grid
            display="flex"
            _onClick={() => {
              history.push(`/groupdetail/${profile_list.waiting[0]?.groupId}`);
            }}
          >
            <MyImage src={profile_list.waiting[0]?.thumbnailUrl} />
            <div>
              <Text
                bold
                size="16px"
                margin="45px 0 0 0"
                color="#68f99e"
                width="70px"
                height="24px"
                borderRadius="60px"
                bg="#030c37"
                textalign="center"
              >
                D-{profile_list.waiting[0]?.dDay}
              </Text>
              <Text bold size="16px" margin="8px 0 0 0" cursor="pointer">
                {profile_list.waiting[0]?.title}
              </Text>
              <Text
                size="14px"
                color="#000"
                margin="8px 0 0 0"
                cursor="pointer"
              >
                {profile_list.waiting[0]?.date} &nbsp; ( 소요시간 :{" "}
                {profile_list.waiting[0]?.totalTime} )
              </Text>
              <Grid display="flex" cursor="pointer">
                <TextBox>{profile_list.waiting[0]?.location}</TextBox>
                <TextBox>{profile_list.waiting[0]?.distance}</TextBox>
                <TextBox>{profile_list.waiting[0]?.thema}</TextBox>
              </Grid>
            </div>
            {/* <Grid  margin="-120px 0 0 570px">
                    <FiChevronRight  size="30" color='#AAA'/>
                </Grid>        */}
          </Grid>

          <Grid margin="-180px 0 0 0px">
            {profile_list.waiting?.map(
              (waiting, index) =>
                index > 0 &&
                4 > index && (
                  <div key={waiting.groupId}>
                    <Grid
                      _onClick={() => {
                        history.push(`/groupdetail/${waiting.groupId}`);
                      }}
                      display="flex"
                      justifyContent="space-between"
                      width="600px"
                      height="180px"
                      margin="-130px 0 0 650px"
                      cursor="pointer"
                    >
                      <Text
                        bold
                        size="16px"
                        margin="18px 0 0 0"
                        color="#68f99e"
                        width="70px"
                        height="24px"
                        borderRadius="60px"
                        bg="#030c37"
                        textalign="center"
                      >
                        D-{waiting.dDay}
                      </Text>
                      <_Text>{waiting.title}</_Text>
                      <div style={{ margin: "0 30px 0 0", display: "flex" }}>
                        <TextBox>{waiting.location}</TextBox>
                        <TextBox>{waiting.distance}</TextBox>
                        <TextBox>{waiting.thema}</TextBox>
                      </div>
                    </Grid>
                  </div>
                )
            )}
          </Grid>

          {modal && (
            <Overlay onClick={toggleModal}>
              <Wrap>
                <>
                  <Text margin="5px 0 10px 32px">참여예정 그룹 러닝</Text>

                  {profile_list.waiting?.map((waiting, index) => (
                    <div key={waiting.groupId}>
                      <Grid
                        display="flex"
                        alignItems="center"
                        _onClick={() => {
                          history.push(`/groupdetail/${waiting.groupId}`);
                        }}
                      >
                        <div>
                          <Image src={waiting?.thumbnailUrl} />
                        </div>
                        <div>
                          <Text
                            bold
                            size="16px"
                            margin="-1px 0 0 0"
                            color="#68f99e"
                            width="70px"
                            height="24px"
                            borderRadius="60px"
                            bg="#030c37"
                            textalign="center"
                          >
                            D-{waiting.dDay}
                          </Text>
                          <Text bold size="16px" margin="6px 0 0 0">
                            {waiting.title}
                          </Text>
                          <Text size="14px" color="#000" margin="6px 0 0 0">
                            {waiting?.date} &nbsp; ( 소요시간 :{" "}
                            {profile_list.waiting[0]?.totalTime} )
                          </Text>
                          <div
                            style={{ margin: "18px 30px 0 0", display: "flex" }}
                          >
                            <TextBox>{waiting.location}</TextBox>
                            <TextBox>{waiting.distance}</TextBox>
                            <TextBox>{waiting.thema}</TextBox>
                          </div>
                        </div>
                      </Grid>
                      <Hr />
                    </div>
                  ))}
                  <Button onClick={toggleModal}>
                    <AiOutlineClose color="#000" />
                  </Button>
                </>
              </Wrap>
            </Overlay>
          )}
          <Bar />
        </Box>
      )}
    </>
  );
};

const Box = styled.div`
  width: 1200px;
  height: 200px;
  margin: 24px auto 64px auto;
  padding: 24px 38px 32px 32px;
  border-radius: 6px;
  background-color: #f5f5f5;
`;

const Bar = styled.div`
  width: 1.8px;
  height: 140px;
  flex-grow: 0;
  margin: -183px 0px 0px 590px;
  background-color: #b8b8b8;
`;

const TextBox = styled.div`
  background-color: #dddddd;
  height: 24px;
  borderradius: 1px;
  font-size: 14px;
  text-align: center;
  padding: 2.5px 6px;
  margin: 20px 10px 0 0;
  :hover {
    background-color: #68f99e;
  }
`;

const MyImage = styled.img`
  width: 200px;
  height: 150px;
  margin: 35px 20px 0 0;
  :hover {
    opacity: 0.85;
  }
`;

const Image = styled.img`
  width: 200px;
  height: 150px;
  margin: 36px 24px 36px 32px;
  border-radius: 3px;
  :hover {
    opacity: 0.85;
  }
`;

const Hr = styled.div`
  width: 580px;
  height: 1px;
  background-color: #b8b8b8;
  margin: 0 42px 0 35px;
`;

const _Text = styled.div`
  width: 180px;
  height: 24px;
  font-weight: 900;
  font-size: 18px;
  text-align: left;
  color: #000;
  margin: 16px 55px 0 0;
  :hover {
    width: 180px;
    height: 24px;
    font-weight: 900;
    font-size: 18px;
    text-align: left;
    color: #666;
    margin: 16px 55px 0 0;
  }
`;

const Wrap = styled.div`
  z-index: 0;
  position: absolute;
  left: 30%;
  top: 210px;
  margin: 0;
  padding: 24px 10px;
  max-width: 664px;
  //box-sizing: border-box;
  width: 100%;
  height: 722px;
  background: #ffffff;
  box-shadow: 3px 8px 17px rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  overflow: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%;
    background-color: gray;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transition;
  }
`;

const Button = styled.button`
  position: absolute;
  top: 24px;
  right: 20px;
  padding: 5px 7px;
  border: none;
  background-color: transparent;
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
export default Schedule;
