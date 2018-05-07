import React, { Component } from 'react';
import Board from './Board';
import BidDash from './BidDash';
import Client from './../../Client';

// TODO: update function that handles everything

const GameState = {
    BIDDING: 1,
    MAKING_MOVE: 2,
    WAITING_BID: 3,
    WAITING_MOVE: 4,
}

const NO_WINNER = "no_winner";
const DEFAULT_CELL_VALUE = " ";
const PLAYER_ONE_CELL_VALUE = "O";
const PLAYER_TWO_CELL_VALUE = "X";

class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameIndex: this.props.gameIndex,
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

    render() {
        var boardEnabled = false;
        var bidEnabled = false;
        if (this.state.gameState === GameState.BIDDING) {
            bidEnabled = true;
        } else if (this.state.gameState === GameState.MAKING_MOVE) {
            boardEnabled = true;
        }
        return (
            <div>
                <Board boardState={this.state.boardState}
                    enabled={boardEnabled}
                    onCellClick={i => this.onCellClick(i)} />
                <br />
                <BidDash bidAmt={this.state.bidAmt}
                    maxBidAmt={this.state.maxBidAmt}
                    onBid={this.onBid}
                    onBidChanged={this.onBidChanged}
                    enabled={bidEnabled} />
            </div>
        )
    }
}

export default Game;