import React, { Component } from 'react';
import './../../css/App.css';
import Button from 'muicss/lib/react/button';

class BidDash extends Component {
    render() {
        return (
            <div>
                <input className="Slider"
                type="range"
                min={0}
                max={this.props.maxBidAmt}
                disabled={!this.props.enabled}
                onChange={this.props.onBidChanged} />

                <Button onClick={this.props.onBid}
                disabled={!this.props.enabled}
                size='small'
                variant='raised'
                color='accent'>
                Bid: {this.props.bidAmt}
                </Button>
            </div>
        )
    }
}

export default BidDash;