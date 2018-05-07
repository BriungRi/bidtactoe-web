import React, { Component } from 'react';
import './../../css/game.css'

class Cell extends Component {
    render() {
        return (
            <button className="square"
                    disabled={!this.props.enabled}
                onClick={this.props.onCellClick}>
                {this.props.value}
            </button>
        )
    }
}

export default Cell;