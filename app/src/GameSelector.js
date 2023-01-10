import React from "react";


class GameSelectorComponent extends React.Component{
    render(){
        return (
            <div>
                <h1>Game Selector</h1>
                <input type="text" id="gameId" name="gameId" placeholder="Game Id"/>
                <button type="button" onClick={this.props.updateGameIdHandler}>Join Game</button>
            </div>
        )
    }

}

export default GameSelectorComponent;