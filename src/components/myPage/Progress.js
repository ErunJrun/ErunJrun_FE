import React, { useEffect, useState } from 'react';
import { VscTriangleDown } from "react-icons/vsc";
import { Text } from "../../elements"
import "./Progress.css"

const Progress = (props) => {
console.log(props);
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

    return (
        <>
            <div className="box">  
                <div className="progress">
                <div className="running" style={run}>
                    <div className="running-box">
                        {props.done} km                     
                    </div> 
                    <div className="e">    
                        <img src="https://ifh.cc/g/qaxVJd.png" />
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

export default Progress;