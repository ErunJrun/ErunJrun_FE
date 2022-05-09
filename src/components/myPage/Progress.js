import React, { useEffect, useState } from 'react';
import { Text } from "../../elements"
import { FaCaretUp } from "react-icons/fa";
import "./Progress.css"

const Progress = (props) => {

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
    },[])

    return (
        <div className="box">  
            <div className="progress">
              <div className="running" style={run}>
                  <div className="running-box">
                       {props.done}km                     
                  </div>      
                  <img src="https://ifh.cc/g/jY802x.png"/>
              </div>
            </div>
            <div className="progress1">
               <div className="progress-done" style={style}></div>
            </div>
            <div className="km">
                <Text size="16px">
                    0 km
                </Text>
                <Text size="16px">
                    <FaCaretUp/>첫 시작점 50 km
                </Text>
                <Text size="16px">
                    100 km
                </Text>
            </div>
        </div>
    );
};

export default Progress;