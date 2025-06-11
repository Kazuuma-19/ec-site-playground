package com.example.ec.site.playground.repository;

import com.example.ec.site.playground.model.OrderTopping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/** 注文トッピングのリポジトリインターフェース. */
@Repository
public interface OrderToppingRepository extends JpaRepository<OrderTopping, Integer> {}
