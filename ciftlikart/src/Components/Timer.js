import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback
} from "react";


function Timer({IsStopTimer}, ref) {
  const [time, setTime] = useState("0:00");
  const [second, setSeconds] = useState(0);

  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  }, []);

  const resetValues = useCallback(() => {
    setTime("0:00");
    setSeconds(0);
  }, []);

  
  useImperativeHandle(ref, () => ({
    resetValues,
    getTime:() => time
  }));

  const updateTimer = useCallback(() => {
    if (!IsStopTimer) {
      setSeconds(prevSeconds => {
        const newSeconds = prevSeconds + 1;
        const newTime = formatTime(newSeconds);
        setTime(newTime);
       
        return newSeconds;
      });
    }
  }, [IsStopTimer, formatTime]);

  

  useEffect(() => {
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [updateTimer]);


  return (
    <div className="timer" style={{ fontSize: "3rem", display: "block" }}>
      {time}
    </div>
  );
}

export default forwardRef(Timer);
