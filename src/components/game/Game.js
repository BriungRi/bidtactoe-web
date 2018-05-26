import React, { Component } from 'react';
import Board from './Board';
import BidDash from './BidDash';
import Client from './../../Client';
import './../../css/App.css'

// TODO: update function that handles everything

const GameState = {
    BIDDING: 1,
    MAKING_MOVE: 2,
    WAITING_BID: 3,
    WAITING_MOVE: 4,
};

const NO_WINNER = "no_winner";
const DEFAULT_CELL_VALUE = " ";
const PLAYER_ONE_CELL_VALUE = "O";
const PLAYER_TWO_CELL_VALUE = "X";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameIndex: this.props.gameIndex,
            username: this.props.username,
            opponentUsername: this.props.opponentUsername,
            isPlayerOne: this.props.isPlayerOne,
            boardState: '         ',
            gameState: GameState.BIDDING,
            bidAmt: 50,
            maxBidAmt: 100
        }
        this.onBidChanged = this.onBidChanged.bind(this);
        this.onBid = this.onBid.bind(this);
        this.onBidsCompleted = this.onBidsCompleted.bind(this);
        this.onCellClick = this.onCellClick.bind(this);
        this.onMoveUpdate = this.onMoveUpdate.bind(this);
        this.onUpdateMessage = this.onUpdateMessage.bind(this);
        this.onGameEndUpdate = this.onGameEndUpdate.bind(this);
        this.bidEnabled = this.bidEnabled.bind(this);
        this.boardEnabled = this.boardEnabled.bind(this);
        this.getUserStatus = this.getUserStatus.bind(this);
        this.getOpponentStatus = this.getOpponentStatus.bind(this);
    }

    componentDidMount() {
        Client.subscribeToWS(this.props.username, this.onUpdateMessage);
    }

    componentWillUnmount() {
        Client.disconnectFromWS();
    }

    onBidChanged(event) {
        this.setState({
            bidAmt: event.target.value
        });
    }

    onBid(event) {
        if (this.state.gameState === GameState.BIDDING) {
            const params = {
                bidAmt: this.state.bidAmt,
                gameIndex: this.state.gameIndex,
                username: this.props.username
            };
            this.setState({
                gameState: GameState.WAITING_BID
            });
            Client.makeBid(params, this.defaultCallback);
        }
        event.preventDefault();
    }

    onCellClick(i) {
        var cellValue = DEFAULT_CELL_VALUE;
        if(this.state.isPlayerOne) {
            cellValue = PLAYER_ONE_CELL_VALUE;
        } else {
            cellValue = PLAYER_TWO_CELL_VALUE;
        }
        var nextBoardState = this.state.boardState.substring(0, i) + cellValue + this.state.boardState.substring(i + 1);
        const params = {
            gameIndex: this.state.gameIndex,
            cells: nextBoardState
        }
        Client.makeMove(params, this.defaultCallback);
    }

    defaultCallback(res) {
        if (res.error) {
            alert(res.body.message);
        }
    }

    onBidsCompleted(payload) {
        var nextGameState;
        if (payload.bidWinnerId === NO_WINNER) {
            nextGameState = GameState.BIDDING;
        } else if (payload.bidWinnerId === this.props.username) {
            nextGameState = GameState.MAKING_MOVE;
        } else {
            nextGameState = GameState.WAITING_MOVE;
        }

        this.setState({
            gameState: nextGameState,
            maxBidAmt: payload.biddingPower
        });
    }

    onMoveUpdate(payload) {
        this.setState({
            boardState: payload.cells,
            gameState: GameState.BIDDING
        });
    }

    onGameEndUpdate(payload) {
        var wonGame = payload.winnerUsername === this.props.username;
        this.props.onGameEnded(wonGame);
    }

    onUpdateMessage(res) {
        if(res.body) {
            var payload = JSON.parse(res.body);
            switch(payload.type) {
                case "BIDS_READY_MESSAGE":
                    this.onBidsCompleted(payload);
                    break;
                case "MOVE_UPDATE_MESSAGE":
                    this.onMoveUpdate(payload);
                    break;
                case "WINNER_UPDATE_MESSAGE":
                    this.onGameEndUpdate(payload);
                    break;
                default:
                    console.log("No update message type");
            }
        }
    }

    bidEnabled() {
        return this.state.gameState === GameState.BIDDING;
    }

    boardEnabled() {
        return this.state.gameState === GameState.MAKING_MOVE;
    }

    getUserStatus() {
        switch(this.state.gameState) {
            case GameState.BIDDING:
                return "Bidding...";
            case GameState.WAITING_BID:
                return "Waiting Opponent Bid...";
            case GameState.MAKING_MOVE:
                return "Making Move...";
            case GameState.WAITING_MOVE:
                return "Waiting Opponent Move...";
            default:
                return "";
        }
    }

    getOpponentStatus() {
        switch(this.state.gameState) {
            case GameState.BIDDING:
            case GameState.WAITING_BID:
                return "Bidding...";
            case GameState.MAKING_MOVE:
                return "Waiting User Move...";
            case GameState.WAITING_MOVE:
                return "Making Move...";
            default:
                return "";
        }
    }

    render() {
        return (
            <div>
                <p className='Regular-Text User-Label'>
                Username: {this.state.username}<br />
                Status: {this.getUserStatus()}<br />
                Max Bidding Power: {this.state.maxBidAmt}</p>
                <div className='Game'>
                    <Board
                    boardState={this.state.boardState}
                    enabled={this.boardEnabled()}
                    onCellClick={i => this.onCellClick(i)} />
                    <br />
                    <BidDash
                    bidAmt={Math.min(this.state.bidAmt, this.state.maxBidAmt)}
                    maxBidAmt={this.state.maxBidAmt}
                    onBid={this.onBid}
                    onBidChanged={this.onBidChanged}
                    enabled={this.bidEnabled()} />
                </div>
                <p className='Regular-Text Opponent-Label'>
                Username: {this.state.opponentUsername}<br />
                Status: {this.getOpponentStatus()}<br />
                Max Bidding Power: {200 - this.state.maxBidAmt}</p>
            </div>
        )
    }
}

export default Game;