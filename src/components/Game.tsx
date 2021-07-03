import React from "react";
import { Board } from "./Board";
import { defineWinner } from "./defineWinner";

interface IProps {}

interface IState {
  history: Array<any>;
  xIsNext: boolean;
}

export class Game extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      xIsNext: true,
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
    };
  }
  handleClick(i: number): void {
    const history = this.state.history;
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (defineWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares: squares }]),
      xIsNext: !this.state.xIsNext,
    });
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = defineWinner(current.squares);
    let status;
    if (winner) {
      status = `Winner ${winner}`;
    } else {
      status = `Next Player ${this.state.xIsNext ? "X" : "O"}`;
    }
    return (
      <div className="board">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol></ol>
        </div>
      </div>
    );
  }
}
