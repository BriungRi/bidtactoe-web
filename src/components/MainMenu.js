import React, { Component } from 'react';

class MainMenu extends Component {
    render() {
        return (
            <div>
                <p>Welcome back, {this.props.username}</p>
                <br /><br />
                <button>Ranked</button>
                <br /><br />
                <button onClick={this.props.joinGame}>Normal</button>
                <br /><br />
                <button onClick={this.props.openInstructions}>Instructions</button>
                <br /><br />
            </div>);
    }
}

export default MainMenu;