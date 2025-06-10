package com.example.ec.site.playground.repository;

import com.example.ec.site.playground.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/** アイテム情報を操作するリポジトリ. */
@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {}
