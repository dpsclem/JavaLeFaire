package com.example.javalefaire;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {

    @GetMapping("/getGameId")
    public String getGameId() {
        return "15";
    }
}
