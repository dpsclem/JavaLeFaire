package com.example.javalefaire;

import com.example.javalefaire.model.Game;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GameController {

    @GetMapping("/getGameId")
    public String getGameId() {
        return "15";
    }

    @PostMapping("/saveGameState")
    public void saveGameState(@RequestBody String gameState) {
        Game game = new Game(gameState);
        System.out.println(gameState);
    }
}
