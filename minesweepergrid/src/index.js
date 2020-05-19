import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
function Square(props) {
    return (
      <button 
        className="square" 
        onClick = {props.onClick}
      >
        {props.value}
        
      </button>
    );
}

function BombSquare(props){
  return(
    <button 
        className="square" 
        onClick = {props.onClick}
      >
        {props.value}
      <img alt = "bombita" src= "./detonation.png"></img>  
    </button>
  )
}

const linii = 8;
const coloane = 10;
let nr = 0;

class Board extends React.Component {
  

  constructor(props){
    super(props);
    this.state = {
      squares: Array(linii * coloane).fill(null)
    };
    
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
    console.log(squares);
  }

  handleBombClick(i){
    const squares = this.state.squares.slice();
    squares[i] = 'B';
    this.setState({squares: squares});
    console.log(squares);
  }

  renderSquare(i) {
    return (<Square 
        value = {this.state.squares[i]}
        onClick = {() => this.handleClick(i)}
        key = {i}
      />
      );
  }

  renderBomb(i){
    return (<BombSquare 
      value = {this.state.squares[i]}
      onClick = {() => this.handleBombClick(i)}
      key = {i}
    />
    );
  }

  createBoard(){
    const items = [];

    for(var i = 0; i < linii; i++){
      const squares = []

      for(var j = 0; j < coloane; j++){
        var random = Math.random();
        
        if(random < 0.2){
          squares.push(this.renderBomb((coloane *i) + j));
          nr++;
        }else {
          squares.push(this.renderSquare((coloane *i) + j));
        }
        console.log((coloane *i) + j);
      }
      
      items.push(<div key = {i} className="board-row" >{squares}</div>);
    }
    return items;
  }

  render() {
    const status = 'Hello!';

    return (
      <div>
        <div className="status">{status}</div>
        
        {this.createBoard()}
        
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
