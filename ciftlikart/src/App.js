import logo from './logo.svg';
import './App.css';
import Squares from './Components/Squares';
import { useEffect, useState, useRef } from 'react';
import Timer from './Components/Timer';

function App() {
  const [clickCount, setClickCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState("");
  const timerRef = useRef();


  var handleClickCountCallBack = (clickValue) => {
    setClickCount(clickValue);
  }
  var GetTimeCallback = (timelapsed) => {
    setTimeElapsed(timelapsed);
  }
  const handleStopButtonClick = () => {
    debugger;
    if (timerRef) {
      timerRef?.current?.stopTimer();
    }
  }
  var FinishedGame = () => {
    //stoptimer
    handleStopButtonClick();
    setTimeout(() => {
      alert("Geçen süre: " + timeElapsed);
    }, 250);
  }

  return (
    <div className="App">
      <div className='counter-timer'>
        <span className="click-count">Tık Sayınız: {clickCount}</span>
        <Timer ref={timerRef} GetTimeCallback={GetTimeCallback} />
      </div>
      <Squares maxValue={4} onFinish={() => FinishedGame()} handleClickCount={handleClickCountCallBack} />
    </div>
  );
}

export default App;
