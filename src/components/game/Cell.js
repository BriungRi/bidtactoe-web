import React, { Component } from 'react';
import './../../css/App.css'

class Cell extends Component {
    render() {
        return (
            <td className="Square"
                disabled={!this.props.enabled}
                onClick={this.props.onCellClick}>
                {this.props.value}
            </td>
        )
    }
}

export default Cell;