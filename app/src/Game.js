import React from "react";
import BoardComponent from "./board";
import GameSelectorComponent from "./GameSelector";


class GameComponent extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            gameId: null
        }
    }

    gameIdUpdate = (values)=>{
        this.setState({gameId: document.getElementById("gameId").value});
    }

    render(){

            return (
                <div>
                    {this.state.gameId ?
                        <BoardComponent gameId={this.state.gameId.toString()}/>
                        : <GameSelectorComponent updateGameIdHandler={this.gameIdUpdate} />
                    }
                </div>
            )
    }
}

export default GameComponent;