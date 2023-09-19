import React, { Component } from "react";
import { flushSync } from "react-dom";

export default class Squares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click: 0,
      arr: [],
      pair: [],
      history: [],
    };
    this.buttonClicked = this.buttonClicked.bind(this);
  }
  buttonClicked(event) {
    this.setState({ click: this.state.click + 1 }, () => {
      this.props.handleClickCount(this.state.click);
    });
  }

  setStateSynchronous(stateUpdate) {
    return new Promise((resolve) => {
      this.setState(stateUpdate, () => resolve());
    });
  }
  ArrayGenerator = () => {
    var arr = [];

    if (this.props.maxValue > 10) {
      throw new Error(
        "You cannot give bigger than 10, this causes infinitive looping"
      );
    }
    while (arr.length < this.props.maxValue) {
      var r = Math.floor(Math.random() * 10) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return [...arr, ...arr];
  };
  // componentDidUpdate(state) {
  //     console.log(`State ${state}`);
  // }
  componentDidMount() {
    this.setState({ arr: this.ArrayGenerator() });
  }
  doWork(subject, callback) {
    setTimeout(callback, 1500);
    console.log("doing my job:", subject);
  }

  ComparisonSquares(sq1, sq2) {
    if (sq1.spanElement.textContent === sq2.spanElement.textContent)
      return true;

    return false;
  }
  CheckFinish() {
    if (this.state.history.length === this.props.maxValue)
      this.props.onFinish();
  }

  pairAdd(spanElement, callback) {
    this.setState(
      (prevState) => ({
        pair: [...prevState.pair, { spanElement }],
      }),
      () => {
        callback();
      }
    );
  }

  ShowNumber = (event) => {
    var spanElement = event.target.firstChild;
    spanElement.className = "visible";
    this.pairAdd(spanElement, () => {
      const pair = this.state.pair;
      if (Object.keys(pair).length > 1) {
        const equalSquare = this.ComparisonSquares(pair[0], pair[1]);

        let contents = [];
        if (!equalSquare) {
          for (let item of pair) {
            this.doWork(
              "Slowmotion invisible job",
              () => (item.spanElement.className = "invisible")
            );
            contents.push(item.spanElement.textContent);
          }
        } else {
          this.setState(
            (prevState) => ({
              history: [...prevState.history, { pair }],
            }),
            () => {
              this.CheckFinish();
            }
          );
        }

        this.setStateSynchronous({
          pair: [],
        });
      }
    });
    //kaç kere bastın
    this.buttonClicked(null);
  };

  Squares = () => {
    var numbers = this.state.arr;

    var squaresDiv = numbers.map((value, index) => {
      return (
        <div
          key={index}
          className="square"
          onClick={async (e) => await this.ShowNumber(e)}
        >
          <span key={index} className="invisible">
            {value}
          </span>
        </div>
      );
    });
    return squaresDiv;
  };

  render() {
    return <div className="container">{this.Squares()}</div>;
  }
}
