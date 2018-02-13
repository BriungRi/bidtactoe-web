import React, { Component } from 'react';
import './../../css/game.css'

class Cell extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
        };
    }

    render() {
        return (
            <button className="square">
                {this.state.value}
            </button>
        )
    }
}

export default Cell;