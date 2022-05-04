import React, { useEffect, useState } from 'react';
import { FaChild } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { FaRegFlag } from "react-icons/fa";
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
        }, 1000)
    },[])

    return (
        <div>
            
            <div className="progress">
              <div className="running" style={run}>
                   {props.done}km
                   <FaChild size="30" color='orange'/>
                   <FaRegFlag size="25"/>
              </div>
            </div>
            <div className="progress1">
               <div className="progress-done" style={style}></div>
            </div>
            <FaCaretUp/>첫 시작점 50km 100km
        </div>
    );
};

export default Progress;