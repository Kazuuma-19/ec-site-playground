package com.example.ec.site.playground.repository;

import com.example.ec.site.playground.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

/** 注文情報を操作するリポジトリインターフェース. */
public interface OrderRepository extends JpaRepository<Order, Integer> {}
