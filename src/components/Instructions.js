import React, { Component } from 'react'

class Instructions extends Component {
    render() {
        return (
            <div>
                <h1>Instructions</h1>
                <br /><br />
                <p>How to win:  Get 3 in a row<br />
                    <br />The Catch:  You must win a bid in order to make a move<br />
                    <br />How Bidding Works:  Each player starts off with 100 bidding power. Before each move is made,
        both players will anonymously bid a value between 0 and their current bidding power.
        The winner of the bid will be able to make a move but will lose bidding power equivalent
        to the highest bid of that turn. The loser of the bid will be unable to make a move but will
        gain bidding power equivalent to the highest bid of that turn.</p>
                <br />
                <button onClick={this.props.goBack}>Done</button>
            </div>
        )
    }
}

export default Instructions;