package com.example.ec.site.playground.service;

import com.example.ec.site.playground.model.Item;
import com.example.ec.site.playground.repository.ItemRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
   * ページネーション、ソートされたアイテムのリストを取得するメソッド.
   *
   * @param keyword 検索キーワード
   * @param pageable ページ情報
   * @return ページネーションされたアイテムのリスト
   */
  public Page<Item> findItems(String keyword, Pageable pageable) {
    // キーワードがnullまたは空文字の場合、全件取得
    if (keyword == null || keyword.isBlank()) {
      return itemRepository.findAll(pageable);
    }
    return itemRepository.findByItemNameContainingIgnoreCase(keyword, pageable);
  }

  /**
   * アイテム名のサジェストを取得するメソッド.
   *
   * @param keyword 検索キーワード
   * @param limit サジェストの最大数
   * @return アイテム名のサジェストリスト
   */
  public List<String> getItemNameSuggestions(String keyword, Integer limit) {
    if (keyword == null || keyword.isBlank()) {
      return List.of();
    }
    return itemRepository
        .findByItemNameContainingIgnoreCase(keyword, PageRequest.of(0, limit))
        .map(Item::getItemName)
        .toList();
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
