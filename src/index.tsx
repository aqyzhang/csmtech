import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
 * @interface SquareProps Props for a single square/button on the board.
 *
 * @property {string} value
 *      Value of the square - either 'X' or 'O'
 * @property {() => void} onClick
 *      Defers back to the handleClick function in the Game class, which decides if the game is over using
 *      calculateWinner and also updates the state of the board (if X or O is filled, adding the state 
 *      to history).
 */

interface SquareProps {
  value: String;
  onClick: () => void;
}

function Square(props: SquareProps) {
    return (
        <button className="square" onClick={props.onClick}>
           {props.value}
        </button>
    )
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
 * @interface BoardProps Props for the whole 3x3 board.
 *
 * @property {string[]} squares
 *      An array of null's or X/O to represent the 3x3's board progress.
 * @property {(i: number) => void} onClick
 *      Defers back to the handleClick function in the Game class, which decides if the game is over using
 *      calculateWinner and also updates the state of the board (if X or O is filled, adding the state 
 *      to history). Takes in i which is the position/index of the square the user clicked.
 */


interface BoardProps {
  squares: string[];
  onClick: (i: number) => void;
}

class Board extends React.Component<BoardProps> {
  renderSquare(i: number) {
    return (
        <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
           />
    );
  }

  render() {

    return (
      <div>
        {/* <div className="status">{status}</div> */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

/**
 * @interface GameState Tracks essential information about the game progress and player turns.
 *
 * @property {BoardState[]} history
 *      An array of board states, which is just how the board in filled up with null and X/O's at a certain
 *      time step. They are arranged chronologically, and can be indexed by their step number.
 * @property {number} stepNumber
 *      Starting at 0 (game start), tracks what step the game is on. Makes it easy to recall previous 
 *      steps by using this number to access the squares state in history.
 * @property {(i: number) => void} onClick
 *      Calls handleClick function, which decides if the game is over using calculateWinner and also updates
 *      the state of the board (if X or O is filled, adding the state to history). Takes in i which is
 *      the position/index of the square the user clicked.
 */


interface GameState {
  history: BoardState[];
  stepNumber: number;
  xIsNext: boolean;
}

/**
 * @interface BoardState Represents the state of the board and how it has been filled up by players.
 *
 * @property {string[]} squares
 *      An array of null's or X/O to represent the 3x3's board progress.
 */

interface BoardState {
  squares: string[];
}

class Game extends React.Component<{}, GameState> {
  constructor(props: {}) {
      super(props);
      this.state = {
          history: [{
              squares: Array(9).fill(null),
          }],
          stepNumber: 0,
          xIsNext: true,
      };
  }

  handleClick(i: number) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length-1];
      const squares = current.squares.slice();
    //    ignoring a click if someone has won the game or if a Square is already filled
      if (calculateWinner(squares) || squares[i]) {
          return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
          history: history.concat([{
              squares: squares
          }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext,
      });
  }

  jumpTo(step: number) {
      this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0,
      });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => this.jumpTo(move)}> 
                    {desc}
                </button>
            </li>
        )
    })

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
