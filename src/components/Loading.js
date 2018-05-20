import React, { Component } from 'react';
import Button from 'muicss/lib/react/button';
import Lottie from 'react-lottie';
import * as animationData from './../loader.json'
import './../css/App.css';

class Loading extends Component {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData
        };
        return (
            <div className='Loading'>
                <Lottie options={defaultOptions}
                    height={180}
                    width={180} />
                <p className='Regular-Text'>Looking for an opponent...</p>
                <Button onClick={this.props.cancelLoading}>Cancel</Button>
            </div>
        )
    };
}

export default Loading;