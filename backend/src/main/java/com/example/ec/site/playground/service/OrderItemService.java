package com.example.ec.site.playground.service;

import com.example.ec.site.playground.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/** 注文アイテムのサービスクラス. */
@Service
@RequiredArgsConstructor
public class OrderItemService {
  private final OrderItemRepository orderItemRepository;
}
