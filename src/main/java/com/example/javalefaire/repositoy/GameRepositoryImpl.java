package com.example.javalefaire.repositoy;

import com.example.javalefaire.entity.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Component
public class GameRepositoryImpl {

    @PersistenceContext
    private EntityManager entityManager;

    public Game findTopByGameIdOrderByTurnIdDesc(int gameId) {
        return entityManager.createQuery("SELECT g FROM Game g WHERE g.GameId = :gameId ORDER BY g.TurnId DESC", Game.class)
                .setParameter("gameId", gameId)
                .setMaxResults(1)
                .getSingleResult();
    }

    public List<String> getGameIds() {
        return entityManager.createQuery("SELECT g.GameId FROM Game g", String.class)
                .getResultList()
                .stream()
                .distinct()
                .toList();
    }
}
