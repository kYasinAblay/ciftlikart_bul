import React, { useState, useEffect } from 'react';


function Timer(props) {
    const [time, setTime] = useState("");
    const [seconds, setSeconds] = useState(0);
    
    let interval;

   const stopTimer = () => {
    alert("stoptimere girdim");
        clearInterval(interval);
      };
     

    useEffect(() => {
        interval = setInterval(() => {
            setSeconds(second => second + 1);

            var minutes = Math.floor(seconds / 60);
            var second = seconds % 60;
            var strSecond = second < 10 ? `0${second}` : second;
            const time = `${minutes}:${strSecond}`;

            setTime(time);
            props.GetTimeCallback(time);
        }, 1000);

        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <div className="timer" style={{ fontSize: "3rem", display: "block" }}>
            {time}
        </div>
    );
};

export default Timer;