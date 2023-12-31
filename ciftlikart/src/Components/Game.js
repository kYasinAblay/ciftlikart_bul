import React from "react";
import Squares from "./Squares";
import { useState, useRef } from "react";
import Timer from "./Timer";

const sleep = async (milliseconds) => {
  return await new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export default function Game(props) {
  const [clickCount, setClickCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState("");
  const [IsStopTimer, setTimerStop] = useState(false);
  const [dismount, setDismount] = useState(false);
  
  var timerRef = useRef(null);

  var handleClickCountCallBack = (clickValue) => {
    setClickCount(clickValue);
  };
  var GetTimeCallback = (timelapsed) => {
    setTimeElapsed(timelapsed);
  };

  var FinishedGame = (callback) => {
    setTimeout(() => {
      alert("Geçen süre: " + timeElapsed);
      props.NewAgain(window.confirm("Yeniden Oynamak İstermisiniz"));

      //stoptimer
      callback();
      setDismount(true);
    }, 250);
    
    props.setScore(prev=> [
      ...prev,
      {
        gamer: "Gamer",
        clickCount: clickCount,
        score: timeElapsed,
        dateTime: Date.UTC.toString(),
      }
    ]);
    sleep(3000).then(() => setDismount(false));
  };

  return !dismount ? (
    <div className="game-board">
      <div className="counter-timer">
        <div className="click-count">Tık Sayınız: {clickCount}</div>
        <Timer
          ref={timerRef}
          IsStopTimer={IsStopTimer}
          GetTimeCallback={GetTimeCallback}
        />
      </div>
      <Squares
        maxValue={5}
        onFinish={() => FinishedGame(timerRef.current.resetValues)}
        handleClickCount={handleClickCountCallBack}
      />
    </div>
  ) : (
    <div className="loading">Loading...</div>
  );
}
