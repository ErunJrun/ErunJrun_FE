import React from 'react';
import Attend from './Attend';
import Make from './Make';
import Recommend from './Recommend';
import Bookmark from './Bookmark';
import styled from "styled-components";

const RunningBox = () => {
    return (
        <Box>
            <Category>
                <CategoryBox>
                    <Attend/>
                </CategoryBox>
                <CategoryBox>
                    <Recommend/>
                </CategoryBox>  
                <CategoryBox>
                    <Make/> 
                </CategoryBox>  
                <CategoryBox>
                    <Bookmark/>
                </CategoryBox>
            </Category>
        </Box>
    );
};

const Box = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  width: 82%;
  height: 400px;
  margin-top: 30px;
`;

const Category = styled.div`
  display: felx;
  justify-content: flex-start;
  padding: 2.5%;
  margin-right: 10px;
`;

const CategoryBox = styled.div`
  margin-right: 20px;
`;

export default RunningBox;