package com.example.ec.site.playground.service;

import com.example.ec.site.playground.model.Order;
import com.example.ec.site.playground.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/** 注文操作を行うサービスクラス. */
@Service
@RequiredArgsConstructor
public class OrderService {
  private final OrderRepository orderRepository;

  /**
   * 注文を保存するメソッド.
   *
   * @param order 登録する注文
   */
  public void registerOrder(Order order) {
    orderRepository.save(order);
  }
}
