import React from "react";


class GameSelectorComponent extends React.Component{
    constructor(){
        super();
        var gameIds = this.fetchGameIds();
    }

    render(){
        return (
            <div>
                <h1>Game Selector</h1>
                <input type="text" id="gameId" name="gameId" placeholder="Game Id"/>
                <button type="button" onClick={this.props.updateGameIdHandler}>Join Game</button>
            </div>
        )
    }

    fetchGameIds() {
        fetch('http://localhost:8080/gameIds')
    }
}

export default GameSelectorComponent;