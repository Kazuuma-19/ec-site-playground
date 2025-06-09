package com.example.ec.site.playground.controller;

import com.example.ec.site.playground.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** アイテム操作を行うコントローラクラス. */
@RestController
@RequiredArgsConstructor
@RequestMapping("/items")
public class ItemController {
  private final ItemService itemService;

  /**
   * アイテム一覧を取得する.
   *
   * @return アイテムのリスト
   */
  @GetMapping
  public ResponseEntity<?> getAllItems() {
    return ResponseEntity.ok(itemService.getAllItems());
  }
}
