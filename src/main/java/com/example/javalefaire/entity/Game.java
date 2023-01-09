package com.example.javalefaire.entity;

import javax.persistence.*;


@Entity
public class Game {

    @Id
    @Column(name="id", unique=true, nullable=false)
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private int id;

    public int getTurnId() {
        return TurnId;
    }

    public void setTurnId(int turnId) {
        TurnId = turnId;
    }

    private int TurnId;
    private int GameId;

    @Column(length = Integer.MAX_VALUE)
    public String States;

    public String getStates() {
        return States;
    }

    public void setStates(String states) {
        States = states;
    }


    public int getGameId() {
        return GameId;
    }

    public void setGameId(int gameId) {
        GameId = gameId;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }
}
