package com.example.ec.site.playground.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * 注文アイテムを表すドメインクラス.
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "order_item")
public class OrderItem {

    /**
     * 注文アイテムID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id", nullable = false)
    private Integer orderItemId;

    /**
     * アイテムID
     */
    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item itemId;

    /**
     * 注文ID
     */
    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    /**
     * 数量
     */
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    /**
     * サイズ
     */
    @Column(name = "size", nullable = false, length = 1)
    private String size;

    /**
     *
     */
    @OneToMany(mappedBy = "orderItem")
    private List<OrderTopping> orderToppingList;
}
