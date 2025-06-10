package com.example.ec.site.playground.service;

import com.example.ec.site.playground.model.Topping;
import com.example.ec.site.playground.repository.ToppingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/** トッピングの処理を行うサービスクラス. */
@Service
@RequiredArgsConstructor
public class ToppingService {
  private final ToppingRepository toppingRepository;

  /**
   * トッピング一覧を取得するメソッド.
   *
   * @return トッピングのリスト
   */
  public Topping getToppingById(Integer toppingId) {
    return toppingRepository
        .findById(toppingId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "トッピングが見つかりません。"));
  }
}
