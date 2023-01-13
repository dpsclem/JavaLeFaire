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
                <div id="blocGameId">
                    <input type="text" id="gameId" name="gameId" placeholder="Game Id"/>
                    <button type="button" id="selectGameId" onClick={this.props.updateGameIdHandler}>&#10148;</button>
                </div>
            </div>
        )
    }

    fetchGameIds() {
        fetch('http://localhost:8080/gameIds')
    }
}

export default GameSelectorComponent;