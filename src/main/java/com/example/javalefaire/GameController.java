package com.example.javalefaire;

import com.example.javalefaire.entity.Game;
import com.example.javalefaire.repositoy.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @GetMapping("/gameIds")
    public List<String> getGameIds() {
        return gameRepository.getGameIds();
    }

    @GetMapping("/getLastTurnForGame")
    public String getLastTurnForGame(@RequestParam(value = "gameId") int gameId) {
        var game =  gameRepository.findTopByGameIdOrderByTurnIdDesc(gameId);
        return game.getGameId() + " " + game.getTurnId() + " " + game.getStates();
    }

    @PostMapping("/goBack")
    public Game goBack(@RequestParam(value = "gameId") int gameId) {
        var turnRoRemove =  gameRepository.findTopByGameIdOrderByTurnIdDesc(gameId);
        gameRepository.delete(turnRoRemove);

        return gameRepository.findTopByGameIdOrderByTurnIdDesc(gameId);
    }

    @PostMapping("/saveGameState")
    public void saveGameState(@RequestBody Game game) {
        Game game1 = new Game();
        game1.setStates(game.getStates());
        game1.setTurnId(game.getTurnId());
        game1.setGameId(game.getGameId());
        System.out.println(game1.getTurnId());
        System.out.println(game1.getGameId());
        System.out.println(game1.getStates());
        gameRepository.save(game1);
    }
}
