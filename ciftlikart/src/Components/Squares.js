import React, { Component } from "react";
import Shuffle from "./Utils/Shuffle";

//Bu dosya React Class Component'ten React Hook'a dönüştürülebilir
//useState ve useEffect kullanılarak yeniden yazılabilir
function Squares(props) {
  const [click, setClick] = React.useState(0);
  const [arr, setArr] = React.useState([]);
  const [pair, setPair] = React.useState([]);
  const [history, setHistory] = React.useState([]);

  const buttonClicked = (event) => {
    setClick(prevClick => {
      const newClick = prevClick + 1;
      props.handleClickCount(newClick);
      return newClick;
    });
  };

  const ArrayGenerator = () => {
    var arr = [];
    
    if (props.maxValue > 10) {
      throw new Error(
        "You cannot give bigger than 10, this causes infinitive looping"
      );
    }
    while (arr.length < props.maxValue) {
      var r = Math.floor(Math.random() * 10) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
        return [...Shuffle(arr), ...arr];
  };

  React.useEffect(() => {
    setArr(ArrayGenerator());
  }, []);

  const doWork = (subject, callback) => {
    setTimeout(callback, 1500);
    //console.log("doing my job:", subject);
  };

  const ComparisonSquares = (sq1, sq2) => {
    if (sq1.spanElement.textContent === sq2.spanElement.textContent)
      return true;
    return false;
  };

  const CheckFinish = () => {
    if (history.length === props.maxValue)
      props.onFinish();
  };

  const pairAdd = (spanElement, callback) => {
    if(spanElement.nodeName!=="#text"){
      setPair(prevPair => {
        const newPair = [...prevPair, { spanElement }];
        callback();
        //console.log(newPair);
        return newPair;
      });
      buttonClicked(null);
    }
  };

  const ShowNumber = (event) => {
    var spanElement = event.target.firstChild;
    spanElement.className = "visible";
    
    pairAdd(spanElement, () => {
      if (pair.length > 1) {
        const equalSquare = ComparisonSquares(pair[0], pair[1]);

        if (!equalSquare) {
          for (let item of pair) {
            doWork(
              "Slowmotion invisible job",
              () => (item.spanElement.className = "invisible")
            );
          }
        } else {
          setHistory(prevHistory => {
            const newHistory = [...prevHistory, { pair }];
            CheckFinish();
            return newHistory;
          });
        }
        
        setPair([]);
      }
    });
  };

  const Squares = () => {
    console.log("Squares",arr);
    var squaresDiv = arr.map((value, index) => {
      return (
        <div
          key={index}
          className="square"
          onClick={async (e) => await ShowNumber(e)}
        >
          <span key={index} className="invisible">
            {value}
          </span>
        </div>
      );
    });
    return squaresDiv;
  };

  return <div className="container">{Squares()}</div>;
}

export default Squares;
