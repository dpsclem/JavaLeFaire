package com.example.javalefaire.entity;

import javax.persistence.Entity;
import javax.persistence.Id;


@Entity
public class Game {

    private Long id;

    public Long getTurnId() {
        return TurnId;
    }

    public void setTurnId(Long turnId) {
        TurnId = turnId;
    }

    private Long TurnId;
    private Long GameId;

    public String getStates() {
        return States;
    }

    public void setStates(String states) {
        States = states;
    }

    public String States;

    public Long getGameId() {
        return GameId;
    }

    public void setGameId(Long gameId) {
        GameId = gameId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
    }
}
