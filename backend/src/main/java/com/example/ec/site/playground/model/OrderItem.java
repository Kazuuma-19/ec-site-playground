package com.example.ec.site.playground.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** 注文アイテムを表すドメインクラス. */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "order_item")
public class OrderItem {

  /** 注文アイテムID. */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "order_item_id", nullable = false)
  private Integer orderItemId;

  /** 数量. */
  @Column(name = "quantity", nullable = false)
  private Integer quantity;

  /** サイズ. */
  @Column(name = "size", nullable = false, length = 1)
  private String size;

  /** アイテムID. */
  @ManyToOne
  @JoinColumn(name = "item_id", nullable = false)
  private Item item;

  /** 注文ID. */
  @ManyToOne
  @JoinColumn(name = "order_id", nullable = false)
  private Order order;

  /** 注文されているトッピングのリスト. */
  @OneToMany(mappedBy = "orderItem")
  private List<OrderTopping> orderToppingList;
}
