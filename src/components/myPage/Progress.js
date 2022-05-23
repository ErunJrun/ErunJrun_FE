/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import { VscTriangleDown } from "react-icons/vsc";
import { Text, Grid } from "../../elements"
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";
import "./Progress.css"

const Progress = (props) => {
    const isMobile = useMediaQuery({
      query: "(max-width:820px)",
    });

    const [style, setStyle] = useState({})
    const [run, setRun] = useState({})

  
    useEffect(() => {
        setTimeout(() => {
            const newStyle = {
                opacity: 1,
                width: `${props.done}%`
            }
            setStyle(newStyle);

            const newRun = {
                opacity: 1,
                width: `${props.done}%`
            }
            setRun(newRun);
        }, 400)
    },[props])

    if(isMobile) {
        return ( 
          <Grid 
            width="375px" 
            margin="35px 0 50px 0" 
            >
            <Grid
              width= "342px"
              height= "0px"
              bg="transparent"  
              margin="0 0 0 20px"              
            >
              <div className="running" style={run}>
                <Img src="https://ifh.cc/g/zqy9Pt.png"/>             
              </div>
            </Grid>
            <Grid
              width= "342px"
              height="18px"
              bg="#d8d8d8"
              borderRadius="20px"
              margin="0 0 0 20px"
            >
              <div className="progress-done" style={style}></div>
            </Grid>
            <Bar/>
            <_Bar/>
            <Grid
              display="flex"
              justifyContent="space-between"
              width="355px" 
              margin="10px 0 0 0" 
            >
              <Text 
                regular
                size="11px"
                color="#7b7b7b"
                margin="0 0 0 20px"
              >
                 0 km
              </Text>
              <Text 
                regular
                size="11px"
                color="#7b7b7b"
                margin="0 0 0 20px"
              >
                출발점 50 km
              </Text>
              <Text
                regular
                size="11px"
                color="#7b7b7b"
                margin="0 0 0 20px"
              >
                100 km
              </Text>
            </Grid>
            <Box>
              <VscTriangleDown size="10"/>  
              <_Img src='https://ifh.cc/g/g1rV2c.png' /> 
            </Box>    
          </Grid>   
        );
      }

    return (
        <>
            <div className="box">  
                <div className="progress">
                    <div className="running" style={run}>
                        <div className="running-box">
                            {props.done} km                     
                        </div> 
                        <div className="e">    
                            <img  className="lee" src="https://ifh.cc/g/zqy9Pt.png" />
                        </div> 
                    </div>
                </div>
                <div className="progress1">
                    <div className="progress-done" style={style}></div>
                </div>
                <div className="Bar">
                </div>
                <div className="bar">
                </div>
                <div className="km">
                    <Text size="14px">
                        0 km
                    </Text>
                    <Text size="14px">
                        첫 시작점 50 km
                    </Text>
                    <Text size="14px">
                        100 km
                    </Text>
                    </div>
                </div>
                <div className="img">
                    <img src='https://ifh.cc/g/g1rV2c.png' />
                </div>
                <div className="icon">
                <VscTriangleDown size="20"/>
            </div>
        </>
    );
};


const Img = styled.img`
  height: 28px;
  width: 20px;
  z-index: 0;
  margin-top: -20px;
`;

const _Img = styled.img`
  height: 20px;
  width: 17px;
  margin-left: 150px;
`;

const Bar = styled.div`
  height: 2px;
  width: 342px;
  background-color: #fff;
  margin-top: -13px;
  margin-left: 20px;
  z-index: 1;
`;

const _Bar = styled.div`
  height: 2px;
  width: 342px;
  background-color: #fff;
  margin-top: 4px;
  margin-left: 20px;
  z-index: 1;
`;

const Box = styled.div`
  text-align: end;
  margin: -55px 0 0 15px;
  width: 350px;
`;
export default Progress;