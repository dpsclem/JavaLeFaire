package com.example.javalefaire;

import com.example.javalefaire.entity.Game;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GameController {

    @GetMapping("/getGameId")
    public String getGameId() {
        return "15";
    }

    @PostMapping("/saveGameState")
    public void saveGameState(@RequestBody Game game) {
        System.out.println(game.getTurnId());
        System.out.println(game.getGameId());
        System.out.println(game.getStates());
    }
}
