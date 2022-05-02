import React from 'react';
import Level from './Level';
import styled from "styled-components";

const Profile = () => {
    return (
        <Box>
            Profile
            <Level/>
        </Box>
    );
};

const Box = styled.div`
  border: 1px solid black;
  border-radius: 3px;
  width: 40%;
  height: 400px;
`;
export default Profile;