import React from 'react';
import styled from "styled-components";

const Bookmark = () => {
    return (
        <div>
            <Btn>북마크 추천 코스</Btn>
        </div>
    );
};

const Btn = styled.button`
  width: 150px;
  height: 40px;
  border: transparent;
  background-color: transparent;
  :hover{
     width: 150px;
     height: 40px;
     border-radius: 5px;
     background-color: black;
     color: white;
  }
`;
export default Bookmark;