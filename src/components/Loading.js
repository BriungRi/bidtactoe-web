import React, { Component } from 'react';
import Lottie from 'react-lottie';
import * as animationData from './../loader.json'

class Loading extends Component {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData
        };
        return (
            <div>
                <Lottie options={defaultOptions}
                    height={400}
                    width={400} />
                <h2>Looking for an opponent...</h2>
                <button onClick={this.props.cancelLoading}>Cancel</button>
            </div>
        )
    };
}

export default Loading;