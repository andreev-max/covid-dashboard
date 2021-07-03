import React from "react";

interface ISquareProps {
  value: number | string | null;
  onClick(): void;
}

interface ISquareState {
  value: string | null;
}

export class Square extends React.Component<ISquareProps, ISquareState> {
  render() {
    return (
      <button onClick={() => this.props.onClick()} className="square">
        {this.props.value}
      </button>
    );
  }
}
