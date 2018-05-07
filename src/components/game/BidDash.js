import React, { Component } from 'react';
import './../../css/game.css';

class BidDash extends Component {
    render() {
        return (
            <div>
                <input type="range"
                    className="slider"
                    min={0}
                    max={this.props.maxBidAmt}
                    disabled={!this.props.enabled}
                    onChange={this.props.onBidChanged} />
                <button className="bidButton"
                    onClick={this.props.onBid}
                    disabled={!this.props.enabled}>
                    Bid: {this.props.bidAmt}
                </button>
            </div>
        )
    }
}

export default BidDash;