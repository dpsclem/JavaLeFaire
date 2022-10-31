import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


class BoardComponent extends React.Component{
    render(){
        const cells = [];
        for (let i = 0; i < 10; i++) {
            cells.push(<td><div className="cell"></div></td>);
        }
        const rows = [];
        for (let i = 0; i < 10; i++) {
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