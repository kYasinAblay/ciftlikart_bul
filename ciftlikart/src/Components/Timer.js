import React, {
  useState,
  useEffect,
  forwardRef,
} from "react";

function Timer(props) {
//   useImperativeHandle(ref, () => ({
//     childFunction1() {
//       stop();
//       console.log("child function 1 called");
//     },
//     childFunction2() {
//       console.log("child function 2 called");
//     },
//   }));

  const [time, setTime] = useState("");
  const [seconds, setSeconds] = useState(0);

  let interval;

  function stop() {
    alert("stop çalıştı");
    clearInterval(interval);
  }

  useEffect(() => {
    let IsStopTimer = props.IsStopTimer;
    let interval = setInterval(() => {
      if (!IsStopTimer) setSeconds((second) => second + 1);

      var minutes = Math.floor(seconds / 60);
      var second = seconds % 60;
      var strSecond = second < 10 ? `0${second}` : second;
      const time = `${minutes}:${strSecond}`;
      setTime(time);
    }, 1000);

    props.GetTimeCallback(time);

    return () => clearInterval(interval);
  }, [seconds]);

  return (
    <div className="timer" style={{ fontSize: "3rem", display: "block" }}>
      {time}
    </div>
  );
}

export default Timer;
