package com.example.ec.site.playground.repository;

import com.example.ec.site.playground.model.Topping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/** トッピングのリポジトリインターフェース. */
@Repository
public interface ToppingRepository extends JpaRepository<Topping, Integer> {}
