import React from "react";
import { Grid, Text, Input } from "../elements";
import styled from "styled-components";

const GroupContent = () => {
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
            Step 3. 그룹러닝 정보 입력
          </Text>
          <Text
            border="1px solid red"
            display="inline"
            margin="0 10px"
            size="13px"
          >
            그룹 러닝에 관한 상세 정보들을 입력해주세요.
          </Text>
        </Grid>
      </Grid>

      <Grid display="flex" flexDirection="column">
        <Grid>
          <Text border="1px solid red" bold size="15px">
            그룹러닝이름
          </Text>
          <Input placeholder="예: 봄바람 불 때 한강 달리기!"></Input>
        </Grid>

        <Grid display="flex" flexDirection="row">
          <Grid>
            <Text border="1px solid red" bold size="15px">
              스탠바이시간
            </Text>
            <Input
              type="time"
              value={new Date().toISOString().slice(11, 16)}
              groupPost
            ></Input>
          </Grid>

          <Grid>
            <Text border="1px solid red" bold size="15px">
              출발시간
            </Text>
            <Input
              type="time"
              value={new Date().toISOString().slice(11, 16)}
              groupPost
            ></Input>
          </Grid>

          <Grid>
            <Text border="1px solid red" bold size="15px">
              종료시간(예상)
            </Text>
            <Input
              type="time"
              value={new Date().toISOString().slice(11, 16)}
              groupPost
            ></Input>
          </Grid>
        </Grid>
        <Grid>
          <Text border="1px solid red" bold size="15px">
            모집인원
          </Text>
          <GroupSelect>
            <option>2명</option>
            <option>3명</option>
            <option>4명</option>
            <option>5명</option>
            <option>6명</option>
            <option>7명</option>
            <option>8명</option>
            <option>9명</option>
            <option>10명</option>
          </GroupSelect>
        </Grid>

        <Grid>
          <Text border="1px solid red" bold size="15px">
            러닝 날짜
          </Text>
          <Input
            type="date"
            value={new Date().toISOString().slice(0, 10)}
            groupPost
          ></Input>
        </Grid>

        <Grid>
          <Text border="1px solid red" bold size="15px">
            페이스
          </Text>
          <GroupSelect>
            <option>4'00" km/h</option>
            <option>4'30" km/h</option>
            <option>5'00" km/h</option>
            <option>5'30" km/h</option>
            <option>6'00" km/h</option>
            <option>6'30" km/h</option>
          </GroupSelect>
        </Grid>

        <Grid>
          <Text border="1px solid red" bold size="15px">
            주차방법(선택)
          </Text>
          <Input placeholder="예: 자라 IFC몰 주차장"></Input>
        </Grid>

        <Grid>
          <Text border="1px solid red" bold size="15px">
            짐보관방법(선택)
          </Text>
          <Input placeholder="예: 지하철 짐 보관함"></Input>
        </Grid>

        <Grid>
          <Text border="1px solid red" bold size="15px">
            그럽러닝에 대한 상세설명
          </Text>
          <Input
            multiLine
            placeholder="예 : 호수공원 러닝 참 좋아하는데요~ 함께 뛰면 두배로 즐거울 것 같아 그룹 러닝을 모집합니다!"
          ></Input>
        </Grid>
      </Grid>
    </>
  );
};

const GroupSelect = styled.select`
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
  border: 1px solid #4e4e4e;
  box-sizing: border-box;
  border-radius: 5px;
  width: 160px;
  height: 40px;
  text-align: center;
  outline: none;
`;

export default GroupContent;
