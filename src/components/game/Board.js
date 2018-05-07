import React, { Component } from 'react';
import Cell from './Cell'

class Board extends Component {
    render() {
        let board = [];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(<Cell key={i * 3 + j} 
                    value={this.props.boardState.charAt(i * 3 + j)}
                    onCellClick={() => this.props.onCellClick(i * 3 + j)}
                    enabled={this.props.enabled} />);
            }
            row.push(<br key={i * 3 + 4} />);
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