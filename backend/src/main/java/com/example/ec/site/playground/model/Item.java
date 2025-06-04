package com.example.ec.site.playground.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * 商品を表すドメインクラス
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "items")
public class Item {
    /**
     * 商品ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Integer itemId;

    /**
     * 商品名
     */
    @Column(name = "item_name", nullable = false)
    private String itemName;

    /**
     * 概要
     */
    @Column(name = "item_description")
    private String itemDescription;

    /**
     * Mサイズの値段
     */
    @Column(name = "item_price_m", nullable = false)
    private Integer itemPriceM = 0;

    /**
     * Lサイズの値段
     */
    @Column(name = "item_price_l", nullable = false)
    private Integer itemPriceL = 0;

    /**
     * 画像のパス
     */
    @Column(name = "image_path", nullable = false)
    private String itemPath;

    /**
     * 削除フラグ
     */
    @Column(name = "deleted")
    private Boolean deleted = false;
}
