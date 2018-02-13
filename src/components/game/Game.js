import React, { Component } from 'react';
import Board from './Board';
import Client from './../../Client'

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boardState: '         '
        }
    }
    render() {
        return <Board boardState={this.state.boardState} />
    }
}

export default Game;