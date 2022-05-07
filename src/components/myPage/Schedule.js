import React from 'react';
import Text from '../../elements/Text';
import styled from "styled-components";
import { FiChevronRight } from "react-icons/fi";

const Schedule = () => {
    return (
        <Box>
            <GroupBox>
                <MyImage src="https://t1.daumcdn.net/cfile/blog/16570350515A293918"/>
                <div>
                    <Text>D-2</Text>
                    <Text>벛꽃과 야경 러닝 명소</Text>
                    <Text>2022.05.30 (토) 10:00 (소요시간 : 2h 30min)</Text>
                    <Text>신청인원 2/8</Text>
                    <div>고양시</div>
                    <div>10km</div>
                </div>
                <FiChevronRight size="40"/>
            </GroupBox>
            <hr/>
            <Text>D-3 봄에 뛰기 좋은 코스  |  고양시  |  10km</Text>
            <Text>D-12 야경이 이쁜 코스  |  서울특별시  |  3km</Text>
            <Text>D-24 50명이서 뛰는 대규모 러닝  |  성남시  |  12km</Text>
            <button>+4개의 그룹러닝</button>
        </Box>
    );
};

const Box = styled.div`
  width: 1200px;
  height: 258px;
  margin: 24px auto 64px auto;
  padding: 24px 38px 32px 32px;
  border-radius: 6px;
  background-color: #f5f5f5;
`;

const MyImage = styled.img`
  width: 234px;
  height: 180px;
  margin: 10px 20px 10px 20px;
  border-radius: 3px
`;

const GroupBox = styled.div`
  display: felx;
`;
export default Schedule;