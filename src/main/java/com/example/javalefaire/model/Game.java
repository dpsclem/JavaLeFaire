package com.example.javalefaire.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Game {
    private Long id;
    public String Board;
    public Game(String board) {
        Board = board;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
    }
}
