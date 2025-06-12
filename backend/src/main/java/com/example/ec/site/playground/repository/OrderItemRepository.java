package com.example.ec.site.playground.repository;

import com.example.ec.site.playground.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/** 注文アイテムのリポジトリインターフェース. */
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {}
