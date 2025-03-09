import React, { useEffect } from "react";
import Shuffle from "./Utils/Shuffle";

function Squares(props) {
  const [click, setClick] = React.useState(1);
  const [arr, setArr] = React.useState(() => {
    // ArrayGenerator'ı başlangıç state'i olarak kullan
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


  const buttonClicked = (event) => {
    setClick(prevClick => prevClick + 1);
    props.handleClickCount(click);
  };

  const doWork = (subject, callback) => {
    setTimeout(callback, 1000);
  };

  const CheckFinish = () => {
      props.onFinish();
  };

  const pairAdd = (spanElement, callback) => {
       if(spanElement.nodeName!=="#text"){
      setPair(prevPair => {
        let newPair = [...prevPair, { spanElement }];
        if(newPair.length > 1) {
          ComparisonSquares(newPair);
          newPair = [];
        }
        return newPair;
      });
    }
  };

const ComparisonSquares = (newPair) => {
  
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
        debugger;
        const newHistory = [...prevHistory, { newPair }];
        if (newHistory.length === props.maxValue)
          CheckFinish();
        
        return newHistory;
      });
    } 
  }  


   
  };
  const ShowNumber = (event) => {
  
    var spanElement = event.target.firstChild;
    spanElement.className = "visible";
    
    pairAdd(spanElement);
  };

  const Squares = () => {
    console.log("Squares",arr);
    var squaresDiv = arr.map((value, index) => {
      return (
        <div
          key={index}
          className="square"
          onClick={async (e) => {await ShowNumber(e); buttonClicked(e);}}
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
