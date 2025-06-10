package com.example.ec.site.playground.controller;

import com.example.ec.site.playground.dto.request.OrderRequest;
import com.example.ec.site.playground.model.User;
import com.example.ec.site.playground.service.OrderService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** 注文操作を行うコントローラクラス. */
@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")
public class OrderController {
  private final OrderService orderService;
  private static final String SESSION_USER_ID = "SESSION_USER_ID";

  /**
   * 注文を作成するエンドポイント.
   *
   * @param orderRequest 注文リクエスト
   * @return 注文の作成結果
   */
  @PostMapping
  public ResponseEntity<?> createOrder(
      @RequestBody OrderRequest orderRequest, HttpSession session) {
    User user = (User) session.getAttribute(SESSION_USER_ID);
    if (user == null) {
      return ResponseEntity.status(401).body("ログインしていません");
    }
    return ResponseEntity.ok().build();
  }
}
