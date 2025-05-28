package com.example.ec_site_playground.model;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 * 注文トッピングを表すドメインクラス.
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "order_topping")
public class OrderTopping {
    /**
     * 注文トッピングID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_topping_id")
    private Integer orderToppingId;

    /**
     * トッピングID
     */
    @JoinColumn(name = "topping_id", nullable = false)
    private Integer toppingId;

    /**
     * 注文アイテムID
     */
    @JoinColumn(name = "order_item_id", nullable = false)
    private Integer orderItemId;

    /**
     * 注文アイテムIDに外部制約がかかってる
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_item_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private OrderItem orderItem;

    /**
     * トッピングIDに外部制約がかかってる
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topping_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Topping topping;
}
