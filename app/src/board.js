import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {images} from "./entities"


class BoardComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            'characterX' : 0,
            'characterY' : 0
        };
    }
    render(){
        const rows = [];
        for (let i = 0; i < 10; i++) {
            const cells = [];
            for (let j = 0; j < 10; j++) {
                if((j === this.state.characterX) && (i === this.state.characterY)){
                    cells.push(<td className="cell" key={i.toString() + ":" + j.toString()}><img className='entities' src={images.character} /></td>);
                }
                else{
                    cells.push(<td className="cell" key={i.toString() + ":" + j.toString()}></td>);
                }
            }
            rows.push(<tr>{cells}</tr>);
        }

        return (
            <table>
                {rows}
            </table>

        );
    }


}
export default BoardComponent;