import React, { Component } from 'react';
import Cell from './Cell'

class Board extends Component {
    render() {
        let board = [];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                const index = i * 3 + j;
                row.push(<Cell key={index} 
                    value={this.props.boardState.charAt(index)}
                    onCellClick={() => this.props.onCellClick(index)}
                    enabled={this.props.enabled} />);
            }
            board.push(<div key={i}>{row}</div>);
        }
        return (
            <div>
                {board}
            </div>
        )
    }
}

export default Board;