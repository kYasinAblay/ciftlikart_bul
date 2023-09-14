import React, { Component, useEffect } from 'react'

export default class Squares extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibilityToggle: true,
            arr: []
        }
    }
    ArrayGenerator = () => {
        var arr = [];
        while (arr.length < this.props.maxValue) {
            var r = Math.floor(Math.random() * 10) + 1;
            if (arr.indexOf(r) === -1) arr.push(r);
        }
        return [...arr, ...arr];
    }

    componentDidMount() {
        this.setState({ arr: this.ArrayGenerator() })
    }


    ShowNumber = (event) => {

        var spanElement = event.target.firstChild;
        console.dir(spanElement);
        var stateVisible = spanElement.className ==="invisible";
        
        spanElement.className        = stateVisible ? "visible" : "invisible";
        //console.dir(event.target.firstChild);
        console.dir(event.target.textContent);
      
    }
    Squares = () => {
        var numbers = this.state.arr;

        var squaresDiv = numbers.map((value, index) => {
            return (
                <div key={index} className="square" onClick={(e) => this.ShowNumber(e)}><span key={index}  className="invisible">{value}</span></div>)
        });

        return squaresDiv;
    }

    render() {

        return (
            <div className="container" >{this.Squares()}</div>
        )
    }
}
