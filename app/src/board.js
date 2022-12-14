import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { images } from "./entities"
import { Informations } from "./informations";
import {parse, stringify} from 'flatted';


class BoardComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = this.getInitialStates();
        this.setRandomBonus();
        this.saveBoard();
    }

    getInitialStates() {
        return {
            'character' : {'x' : 0, 'y' : 0, 'energy' : 100},
            'monsterT1' : {'x' : this.getRandomCoordinate(), 'y' : this.getRandomCoordinate()},
            'monsterT2' : {'x' : this.getRandomCoordinate(), 'y' : this.getRandomCoordinate()},
            'monsterT3' : {'x' : this.getRandomCoordinate(), 'y' : this.getRandomCoordinate()},
            'bonus' : [],
            'house' : {'x' : 9, 'y' : 9},
            'turnId' : 0,
        };
    }

    saveBoard(){
        //Post status dictionary to API
        let data = {
            "gameId": this.props.gameId,
            "turnId": this.state.turnId,
            "states": JSON.stringify(this.state)
        };
        console.log("Saving :");
        console.log(data);
        fetch('http://localhost:8080/saveGameState', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        /*.then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        }); */
    }

    goBack() {
        if (!('gobackLimit' in this.state) || this.state.turnId > this.state.gobackLimit) {
            fetch('http://localhost:8080/goBack?gameId=' + this.props.gameId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.applySave(data.states);
                })
                .catch((error) => {
                    alert("Can't go back anymore : " + error);
                });
        } else {
            alert("You can only go back 5 times")
        }

    }

    applySave(states){
        states = JSON.parse(states);
        delete states.gobackLimit;
        this.setState(states);
        console.log("Retrieved save, states are : ");
        console.log(this.state);
    }

    componentWillMount() {
        this.moveCharacter = this.moveCharacter.bind(this);
        this.goBack = this.goBack.bind(this);
    }

    componentDidMount() {
        window.addEventListener("keydown", this.moveCharacter);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.moveCharacter);
    }

    getRandomCoordinate(){
        return Math.floor(Math.random() * 10);

    }

    render(){
        const rows = [];
        for (let i = 0; i < 10; i++) {
            const cells = [];
            for (let j = 0; j < 10; j++) {
                cells.push(this.getCellForPosition(j, i));
            }
            rows.push(<tr>{cells}</tr>);
        }
        return (
            <div>
                <div className='gameContainer'>
                    <div className='informationContainer'>
                    <Informations energy={this.state.character.energy}/>
                    <div className='gameButtonsContainer'>
                        <button className="gameBtn" onClick={this.goBack}>Go back</button>
                    </div>
                    </div>
                    <div className='boardContainer'>
                        <table>
                            {rows}
                        </table>
                    </div>
                </div>
            </div>
        );
    }

    getCellForPosition(x, y){
        if((x === this.state.character.x) && (y === this.state.character.y)){
            return <td className="cell" key={x.toString() + ":" + y.toString()}><img className='entities' src={images.character} alt='character'/></td>;
        }
        else if((x === this.state.monsterT1.x) && (y === this.state.monsterT1.y)){
            return <td className="cell" key={x.toString() + ":" + y.toString()}><img className='entities' src={images.monsterT1} alt='monsterT1'/></td>;
        }
        else if((x === this.state.monsterT2.x) && (y === this.state.monsterT2.y)){
            return <td className="cell" key={x.toString() + ":" + y.toString()}><img className='entities' src={images.monsterT2} alt='monsterT2'/></td>;
        }
        else if((x === this.state.monsterT3.x) && (y === this.state.monsterT3.y)){
            return <td className="cell" key={x.toString() + ":" + y.toString()}><img className='entities' src={images.monsterT3}  alt='monsterT3'/></td>;
        }
        else if(this.state.bonus.some(bonus => bonus.x === x && bonus.y === y)){
            let currentBonus = this.state.bonus.find(bonus => bonus.x === x && bonus.y === y);
            return <td className="cell" key={x.toString() + ":" + y.toString()}><img className='entities' src={currentBonus.bonusImage} alt='bonus'/></td>;
        }
        else if((x === this.state.house.x) && (y === this.state.house.y)){
            return <td className="cell" key={x.toString() + ":" + y.toString()}><img className='entities' src={images.house} alt='house'/></td>;
        }
        else{
            return <td className="cell" key={x.toString() + ":" + y.toString()}/>;
        }
    }

    getCellElementForPosition(x, y){
        if((x === this.state.character.x) && (y === this.state.character.y)){
            return 0;
        }
        else if((x === this.state.monsterT1.x) && (y === this.state.monsterT1.y)){
            return 1;
        }
        else if((x === this.state.monsterT2.x) && (y === this.state.monsterT2.y)){
            return 2;
        }
        else if((x === this.state.monsterT3.x) && (y === this.state.monsterT3.y)){
            return 3;
        }
        else if(this.state.bonus.some(bonus => bonus.x === x && bonus.y === y)){
            let currentBonus = this.state.bonus.find(bonus => bonus.x === x && bonus.y === y);
            if (currentBonus.bonusImage === images.bonus1) { return 4; }
            else if (currentBonus.bonusImage === images.bonus2) { return 5; }
        }
        else if((x === this.state.house.x) && (y === this.state.house.y)){
            return 6;
        }
        else{
            return -1;
        }
    }

    moveCharacter(event){
        //console.log(event);
        let haveMoved = false;
        const futurePositions = {
            'x' : this.state.character.x,
            'y' : this.state.character.y,
        };
        //console.log(this.state.character.x, this.state.character.y);
        switch(event.key){
            case "ArrowUp":
                if (this.state.character.y > 0){
                    haveMoved = true;
                    futurePositions.y -= 1;
                }
                break;
            case "ArrowDown":
                if (this.state.character.y < 9) {
                    haveMoved = true;
                    futurePositions.y += 1;
                }
                break;
            case "ArrowLeft":
                if (this.state.character.x > 0) {
                    haveMoved = true;
                    futurePositions.x -= 1;
                }
                break;
            case "ArrowRight":
                if (this.state.character.x < 9) {
                    haveMoved = true;
                    futurePositions.x += 1;
                }
                break;
        }
        if (haveMoved){
            this.state.turnId += 1;
            if (this.isMonsterCell(futurePositions.x, futurePositions.y)){
                this.state.character.energy -= 10;
            }
            else if (this.isBonusCell(futurePositions.x, futurePositions.y)){
                this.state.character.energy += 10;
                this.removeBonus(futurePositions.x, futurePositions.y);
                this.state.character.x = futurePositions.x;
                this.state.character.y = futurePositions.y;
            }
            else {
                this.state.character.x = futurePositions.x;
                this.state.character.y = futurePositions.y;
            }
            this.state.character.energy -= 1;
            if (this.state.character.energy <= 0){
                this.setState(this.getInitialStates());
                this.state.bonus.push({'x': 1, 'y': 1, 'bonusImage': images.bonus1});
                this.setRandomBonus();
            }
            else {
                this.setState({'character' : this.state.character});
                this.moveMonsterRandomly();
            }
            if (this.state.turnId >= 7){
                if (this.state.gobackLimit && this.state.gobackLimit < this.state.turnId - 6){
                    this.setState({'gobackLimit': this.state.turnId - 6});
                } else {
                    this.setState({'gobackLimit': this.state.turnId - 6});
                }
            }
            this.saveBoard();
        }
    }



    moveMonsterRandomly() {
        let randomMonster = Math.floor(Math.random() * 3) +1;
        let randomMoveX = Math.random() > 0.5 ? 1 : -1;
        let randomMoveY = Math.random() > 0.5 ? 1 : -1;
        let newMonster;
        switch (randomMonster) {
            case 1:
                newMonster = this.state.monsterT1;
                if ((this.isEmptyCell(newMonster.x + randomMoveX,newMonster.y + randomMoveY)) && (newMonster.x + randomMoveX >= 0) && (newMonster.x + randomMoveX <= 9) && (newMonster.y + randomMoveY >= 0) && (newMonster.y + randomMoveY <= 9)) {
                    newMonster.x = this.state.monsterT1.x + randomMoveX;
                    newMonster.y = this.state.monsterT1.y + randomMoveY;
                    this.setState({'monsterT1': newMonster});
                }
                else {
                    this.moveMonsterRandomly();
                }
                break;
            case 2:
                newMonster = this.state.monsterT2;
                randomMoveX = Math.floor(Math.random() * 3) - 1;
                randomMoveY = Math.floor(Math.random() * 3) - 1;

                if ((this.isEmptyCell(newMonster.x + randomMoveX,newMonster.y + randomMoveY)) && (newMonster.x + randomMoveX >= 0) && (newMonster.x + randomMoveX <= 9) && (newMonster.y + randomMoveY >= 0) && (newMonster.y + randomMoveY <= 9)) {
                    newMonster.x = this.state.monsterT2.x + randomMoveX;
                    newMonster.y = this.state.monsterT2.y + randomMoveY;
                    this.setState({'monsterT2': newMonster});
                }
                else {
                    this.moveMonsterRandomly();
                }
                break;
            case 3:
                newMonster = this.state.monsterT3;
                if ((this.isEmptyCell(newMonster.x,newMonster.y + randomMoveY)) && (newMonster.y + randomMoveY >= 0) && (newMonster.y + randomMoveY <= 9)) {
                    newMonster.y = this.state.monsterT3.y + randomMoveY;
                    this.setState({'monsterT3': newMonster});
                }
                else{
                    this.moveMonsterRandomly();
                }
                break;
        }
        //console.log(this.state);
    }

    isEmptyCell(x, y) {
        return (this.state.character.x !== x || this.state.character.y !== y) &&
            (this.state.monsterT1.x !== x || this.state.monsterT1.y !== y) &&
            (this.state.monsterT2.x !== x || this.state.monsterT2.y !== y) &&
            (this.state.monsterT3.x !== x || this.state.monsterT3.y !== y) &&
            !this.state.bonus.some(bonus => bonus.x === x && bonus.y === y);
    }

    isBonusCell(x, y) {
        return this.state.bonus.some(bonus => bonus.x === x && bonus.y === y);
    }

    isMonsterCell(x, y) {
        return (this.state.monsterT1.x === x && this.state.monsterT1.y === y) ||
            (this.state.monsterT2.x === x && this.state.monsterT2.y === y) ||
            (this.state.monsterT3.x === x && this.state.monsterT3.y === y);
    }

    setRandomBonus() {
        for (let i = 0; i < Math.floor(Math.random() * 4) +3; i++) {
            let x = Math.floor(Math.random() * 10);
            let y = Math.floor(Math.random() * 10);
            let bonusImage = Math.random() > 0.5 ? images.bonus1 : images.bonus2;
            if (this.isEmptyCell(x, y)) {
                this.state.bonus.push({'x': x, 'y': y, 'bonusImage': bonusImage});
            }
            else {
                i--;
            }
        }
    }

    removeBonus(x, y) {
        this.state.bonus = this.state.bonus.filter(bonus => bonus.x !== x || bonus.y !== y);
    }
}
export default BoardComponent;