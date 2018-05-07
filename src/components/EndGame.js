import React, {Component} from 'react';

class EndGame extends Component {
    render() {
        var titleMessage = this.props.gameWon ? "You Won!" : "You Lost.";
        return (
            <div>
                <h1>{titleMessage}</h1>
                <br/>
                <button onClick={this.props.joinGame}>Play Again</button>
                <br/>
                <br/>
                <button onClick={this.props.openMainMenu}>Main Menu</button>
            </div>
        )
    }
}

export default EndGame;
