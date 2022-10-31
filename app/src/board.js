import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


class BoardComponent extends React.Component{
    render(){
        const cells = [];
        for (let i = 0; i < 10; i++) {
            cells.push(<td className="cell" key={i.toString()}></td>);
        }
        const rows = [];
        for (let i = 0; i < 10; i++) {
            rows.push(<tr key={i.toString()}>{cells}</tr>);
        }
        return (
            <table>
                {rows}
            </table>

        );
    }


}
export default BoardComponent;