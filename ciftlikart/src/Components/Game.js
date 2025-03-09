import React, { useCallback } from "react";
import Squares from "./Squares";
import { useState, useRef, useMemo } from "react";
import Timer from "./Timer";

const sleep = (milliseconds) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(resolve, milliseconds);
    } catch (error) {
      reject(error);
    }
  });
};

export default function Game(props) {
  const [clickCount, setClickCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState("");
  const [IsStopTimer, setTimerStop] = useState(false);
  const [dismount, setDismount] = useState(false);
  
  var timerRef = useRef(null);

  var handleClickCountCallBack = useCallback((clickValue) => {
    setClickCount(clickValue);
  }, []);

  var FinishedGame = (stopTimer) => {
  
    var elapsed = timerRef.current.getTime();
   
    setTimeout(() => {
      alert("Geçen süre: " + elapsed);
      props.NewAgain(window.confirm("Yeniden Oynamak İstermisiniz"));

      stopTimer();
      setDismount(true);
    }, 250);
    
    props.setScore(prev=> [
      ...prev,
      {
        gamer: "Gamer",
        clickCount: clickCount,
        score: elapsed,
        dateTime: Date.UTC.toString(),
      }
    ]);
    sleep(3000).then(() => setDismount(false));
  };

  const MemoizedTimer = useMemo(() => (
    <Timer
      ref={timerRef}
      IsStopTimer={IsStopTimer}
    />
  ), [IsStopTimer,FinishedGame]);

  const MemoizedSquares = useMemo(() => (<Squares
        maxValue={5}
        onFinish={() => FinishedGame(timerRef.current.resetValues)}
        handleClickCount={handleClickCountCallBack}
      />
    
  ), [handleClickCountCallBack,FinishedGame]);

  return !dismount ? (
    <div className="game-board">
      <div className="counter-timer">
        <div className="click-count">Tık Sayınız: {clickCount}</div>
        {MemoizedTimer}
      </div>
      {MemoizedSquares}
      
    </div>
  ) : (
    <div className="loading">Loading...</div>
  );
}
