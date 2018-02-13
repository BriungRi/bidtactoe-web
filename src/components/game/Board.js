import React, { Component } from 'react';
import Cell from './Cell'

class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boardState: props.boardState
        }
    }

    render() {
        let board = [];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                row.push(<Cell key={i * 3 + j} value={this.state.boardState.charAt(i * 3 + j)} />);
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