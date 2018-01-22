import React, { Component } from 'react';

class MainMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <text>Welcome back, {this.props.username}</text>
                <br /><br />
                <button>Ranked</button>
                <br /><br />
                <button>Normal</button>
                <br /><br />
                <button>Instructions</button>
                <br /><br />
            </div>);
    }
}

export default MainMenu;