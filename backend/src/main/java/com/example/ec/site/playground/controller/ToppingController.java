package com.example.ec.site.playground.controller;

import com.example.ec.site.playground.model.Topping;
import com.example.ec.site.playground.service.ToppingService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** トッピング操作を行うコントローラクラス. */
@RestController
@RequiredArgsConstructor
@RequestMapping("/toppings")
public class ToppingController {
  private final ToppingService toppingService;

  /**
   * トッピング一覧を取得するエンドポイント.
   *
   * @return トッピングのリスト
   */
  @GetMapping
  public ResponseEntity<List<Topping>> getAllToppings() {
    List<Topping> toppings = toppingService.getAllToppings();
    return ResponseEntity.ok(toppings);
  }
}
