package com.example.ec.site.playground.repository;

import com.example.ec.site.playground.model.Order;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

/** 注文情報を操作するリポジトリインターフェース. */
public interface OrderRepository extends JpaRepository<Order, Integer> {
  /**
   * ユーザーIDに紐づく注文を取得するメソッド.
   *
   * @param userId ユーザーID
   * @return ユーザーの注文リスト
   */
  List<Order> findByUserId_Id(Integer userId);
}
