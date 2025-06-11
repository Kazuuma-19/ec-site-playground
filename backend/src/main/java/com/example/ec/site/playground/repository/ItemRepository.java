package com.example.ec.site.playground.repository;

import com.example.ec.site.playground.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/** アイテム情報を操作するリポジトリ. */
@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
  /**
   * アイテム名にキーワードを含むアイテムのページネーションされたリストを取得する.
   *
   * @param keyword 検索キーワード
   * @param pageable ページネーション情報
   * @return ページネーションされたアイテムのリスト
   */
  Page<Item> findByItemNameContainingIgnoreCase(String keyword, Pageable pageable);
}
