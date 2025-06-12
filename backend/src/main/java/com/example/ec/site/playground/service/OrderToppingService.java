package com.example.ec.site.playground.service;

import com.example.ec.site.playground.repository.OrderToppingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/** 注文トッピングのサービスクラス. */
@Service
@RequiredArgsConstructor
public class OrderToppingService {
  private final OrderToppingRepository orderToppingRepository;
}
