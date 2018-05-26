import React, {Component} from 'react';
import Button from 'muicss/lib/react/button';
import './../css/App.css';

class EndGame extends Component {
    render() {
        var titleMessage = this.props.gameWon ? "You Won!" : "You Lost.";
        return (
            <div className="End-Game">
                <h1>{titleMessage}</h1>
                <br/>
                <Button onClick={this.props.joinGame}>Play Again</Button>
                <br/>
                <br/>
                <Button onClick={this.props.openMainMenu}>Main Menu</Button>
            </div>
        )
    }
}

export default EndGame;
