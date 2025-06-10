package com.example.ec.site.playground.service;

import com.example.ec.site.playground.model.Item;
import com.example.ec.site.playground.repository.ItemRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/** アイテムの処理を行うサービスクラス. */
@Service
@RequiredArgsConstructor
public class ItemService {
  private final ItemRepository itemRepository;

  /**
   * アイテム一覧を取得するメソッド.
   *
   * @return アイテムのリスト
   */
  public List<Item> getAllItems() {
    return itemRepository.findAll();
  }

  /**
   * アイテムを価格でソートして取得するメソッド.
   *
   * @param sort ソートの順序（priceAsc, priceDesc）
   * @return ソートされたアイテムのリスト
   */
  public List<Item> findItemsSortedByPrice(String sort) {
    Sort sorting =
        switch (sort) {
          case "priceDesc" -> Sort.by(Sort.Direction.DESC, "itemPriceM");
          case "priceAsc" -> Sort.by(Sort.Direction.ASC, "itemPriceM");
          default -> Sort.by("itemId");
        };
    return itemRepository.findAll(sorting);
  }

  /**
   * アイテムIDでアイテムを取得するメソッド.
   *
   * @param itemId アイテムID
   * @return アイテム情報
   */
  public Item getItemById(Integer itemId) {
    return itemRepository
        .findById(itemId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "アイテムが見つかりません。"));
  }
}
