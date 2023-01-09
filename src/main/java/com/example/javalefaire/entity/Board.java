package com.example.javalefaire.entity;

import java.util.List;

public class Board {

    public List<List<Integer>> getTable() {
        return Table;
    }

    public void setTable(List<List<Integer>> table) {
        Table = table;
    }

    public List<List<Integer>> Table;

}
