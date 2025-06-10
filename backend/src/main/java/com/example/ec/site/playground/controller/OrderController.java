package com.example.ec.site.playground.controller;

import com.example.ec.site.playground.dto.request.OrderRequest;
import com.example.ec.site.playground.model.Order;
import com.example.ec.site.playground.model.User;
import com.example.ec.site.playground.service.OrderService;
import com.example.ec.site.playground.service.UserService;
import jakarta.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
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
  private final UserService userService;

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
    Integer userId = (Integer) session.getAttribute(SESSION_USER_ID);
    if (userId == null) {
      return ResponseEntity.status(401).body("ログインしていません");
    }

    User user = userService.getUserById(userId);

    System.out.println(orderRequest);

    Order order = new Order();
    order.setStatus(0);
    order.setTotalPrice(orderRequest.getTotalPrice());
    order.setOrderDate(ZonedDateTime.now());
    order.setDestinationName(orderRequest.getDestinationName());
    order.setDestinationEmail(orderRequest.getDestinationEmail());
    order.setDestinationZipCode(orderRequest.getDestinationZipcode());
    order.setDestinationPrefecture(orderRequest.getDestinationPrefecture());
    order.setDestinationMunicipalities(orderRequest.getDestinationMunicipalities());
    order.setDestinationAddress(orderRequest.getDestinationAddress());
    order.setDestinationTelephone(orderRequest.getDestinationTelephone());
    order.setDeliveryTime(parseStringToZonedDateTime(orderRequest.getDeliveryTime()));
    order.setPaymentMethod(orderRequest.getPaymentMethod());
    order.setUserId(user);

    orderService.registerOrder(order);

    return ResponseEntity.ok().build();
  }

  /**
   * 文字列からZonedDateTimeに変換するヘルパーメソッド.
   *
   * @param dateTime 注文日時の文字列
   * @return ZonedDateTimeオブジェクト
   */
  private ZonedDateTime parseStringToZonedDateTime(String dateTime) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    LocalDateTime localDateTime = LocalDateTime.parse(dateTime, formatter);
    return localDateTime.atZone(ZoneId.of("Asia/Tokyo"));
  }
}
