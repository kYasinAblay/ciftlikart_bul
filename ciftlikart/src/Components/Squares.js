import React, { useEffect, useCallback } from "react";
import Shuffle from "./Utils/Shuffle";

function Squares(props) {
  const [click, setClick] = React.useState(1);
  const [arr, setArr] = React.useState(() => {
    const initialArr = [];
    if (props.maxValue > 10) {
      throw new Error(
        "You cannot give bigger than 10, this causes infinitive looping"
      );
    }
    while (initialArr.length < props.maxValue) {
      var r = Math.floor(Math.random() * 10) + 1;
      if (initialArr.indexOf(r) === -1) initialArr.push(r);
    }
    return [...initialArr, ...initialArr];
  });

  const [pair, setPair] = React.useState([]);
  const [history, setHistory] = React.useState([]);

  const buttonClicked = useCallback((event) => {
    setClick(prevClick => prevClick + 1);
    props.handleClickCount(click);
  }, [click, props]);

  const doWork = useCallback((subject, callback) => {
    setTimeout(callback, 1000);
  }, []);

  const [shouldCheckFinish, setShouldCheckFinish] = React.useState(false);

  useEffect(() => {
    if (shouldCheckFinish) {
      props.onFinish();
      setClick(0);
      props.handleClickCount(0);
      setShouldCheckFinish(false);
    }
  }, [shouldCheckFinish, setClick]);

  const CheckFinish = useCallback(() => {
    setShouldCheckFinish(true);
  }, []);

  const ComparisonSquares = useCallback((newPair) => {
    if (newPair.length > 1) {
      const equalSquare = newPair[0].spanElement.textContent === newPair[1].spanElement.textContent;

      if (!equalSquare) {
        newPair.forEach(item => {
          doWork(
            "Slowmotion invisible job",
            () => (item.spanElement.className = "invisible")
          );
        });
      } else {
        setHistory(prevHistory => {
          const newHistory = [...prevHistory, { newPair }];
          if (newHistory.length === props.maxValue)
            CheckFinish();
          return newHistory;
        });
      }
    }
  }, [doWork, props.maxValue, CheckFinish]);

  const pairAdd = useCallback((spanElement) => {
    if(spanElement.nodeName !== "#text"){
      setPair(prevPair => {
        let newPair = [...prevPair, { spanElement }];
        if(newPair.length > 1) {
          ComparisonSquares(newPair);
          newPair = [];
        }
        return newPair;
      });
    }
  }, [ComparisonSquares]);

  const ShowNumber = useCallback((event) => {
    var spanElement = event.target.firstChild;
    spanElement.className = "visible";
    pairAdd(spanElement);
  }, [pairAdd]);

  const Squares = useCallback(() => {
    console.log("Squares",arr);
    var squaresDiv = arr.map((value, index) => {
      return (
        <div
          key={index}
          className="square"
          onClick={(e) => {ShowNumber(e); buttonClicked(e);}}
        >
          <span key={index} className="invisible">
            {value}
          </span>
        </div>
      );
    });
    return squaresDiv;
  }, [arr, ShowNumber, buttonClicked]);

  return <div className="container">{Squares()}</div>;
}

export default Squares;
