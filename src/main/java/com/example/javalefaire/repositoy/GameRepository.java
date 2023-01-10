package com.example.javalefaire.repositoy;

import com.example.javalefaire.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    Game findTopByGameIdOrderByTurnIdDesc(int gameId);

    List<String> getGameIds();
}
