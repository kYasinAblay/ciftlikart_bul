import React from "react";
import Squares from "./Squares";
import { useState } from "react";
import Timer from "./Timer";

export default function Game(props) {
  const [clickCount, setClickCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState("");
  const [IsStopTimer, setTimerStop] = useState(false);
 

  var handleClickCountCallBack = (clickValue) => {
    setClickCount(clickValue);
  };
  var GetTimeCallback = (timelapsed) => {
    setTimeElapsed(timelapsed);
  };
  const handleStopButtonClick = () => {
    setTimerStop(true);
  };
  var FinishedGame = () => {
    //stoptimer
    handleStopButtonClick();
     
    setTimeout(() => {
      alert("Geçen süre: " + timeElapsed);
      props.NewAgain(window.confirm("Yeniden Oynamak İstermisiniz"));
    }, 250);
  };

  return (
    <div className="game-board">
      <div className="counter-timer">
        <span className="click-count">Tık Sayınız: {clickCount}</span>
        <Timer IsStopTimer={IsStopTimer} GetTimeCallback={GetTimeCallback} />
      </div>
      <Squares
        maxValue={3}
        onFinish={() => FinishedGame()}
        handleClickCount={handleClickCountCallBack}
      />
    </div>
  );
}
