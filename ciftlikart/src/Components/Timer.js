import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef
} from "react";

function Timer(props,ref) {
  useImperativeHandle(ref, () => ({
    resetValues() {
      setTime("0:00");
      setSeconds(0);
      //console.log("child component values was reset.");
    }
  }));

  const [time, setTime] = useState("0:00");
  const [seconds, setSeconds] = useState(0);

  function start(){
    let IsStopTimer = props.IsStopTimer;
    let interval = setInterval(() => {
      if (!IsStopTimer) setSeconds((second) => second + 1);

      var minutes = Math.floor(seconds / 60);
      var second = seconds % 60;
      var strSecond = second < 10 ? `0${second}` : second;
      const time = `${minutes}:${strSecond}`;
      setTime(time);
      // console.log(time);
      props.GetTimeCallback(time);
    }, 1000);

    return interval;
  }

  useEffect(() => {
    const interval= start();

    return () =>{
      clearInterval(interval);
    };
  });

  return (
    <div className="timer" style={{ fontSize: "3rem", display: "block" }}>
      {time}
    </div>
  );
}

export default forwardRef(Timer);
