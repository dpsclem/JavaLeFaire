import './App.css';
import BoardComponent from "./board.js";
import React from "react";
import GameComponent from "./Game.js";


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <GameComponent/>
      </header>
    </div>
  );
}

export default App;
