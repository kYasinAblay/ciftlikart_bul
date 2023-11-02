import React from "react";

export default function ScoreList(props) {
  return (
    <>
       {props.scores.map((score) => (
        <div key={score + 0.01}>
          {score.gamer} - {score.clickCount}- {score.score} - {score.dateTime}
        </div>
      ))} 
    </>
  );
}
