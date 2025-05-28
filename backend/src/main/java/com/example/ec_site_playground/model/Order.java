package com.example.ec_site_playground.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.ZonedDateTime;

/**
 * 注文情報を表すドメインクラス.
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
    /**
     * 注文ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    private Integer orderId;

    /**
     * 注文状態
     */
    @Column(name = "status", nullable = false)
    private Integer status;

    /**
     * 合計金額
     */
    @Column(name = "total_price")
    private Integer totalPrice;

    /**
     * 注文日
     */
    @Column(name = "order_date", columnDefinition = "TIMESTAMPTZ")
    private ZonedDateTime orderDate;

    /**
     * 宛先の名前
     */
    @Column(name = "destination_name", nullable = false)
    private String destinationName;

    /**
     * 宛先のメールアドレス
     */
    @Column(name = "destination_email", nullable = false)
    private String destinationEmail;

    /**
     * 宛先の郵便番号
     */
    @Column(name = "destination_zip_code", nullable = false, length = 7)
    private String destinationZipCode;

    /**
     * 宛先の都道府県
     */
    @Column(name = "destination_prefecture", nullable = false, length = 10)
    private String destinationPrefecture;

    /**
     * 宛先の市区町村
     */
    @Column(name = "destination_municipalities", nullable = false)
    private String destinationMunicipalities;

    /**
     * 宛先の住所
     */
    @Column(name = "destination_address", nullable = false)
    private String destinationAddress;

    /**
     * 宛先の携帯番号
     */
    @Column(name = "destination_telephone", nullable = false, length = 15)
    private String destinationTelephone;

    /**
     * 配達日時
     */
    @Column(name = "delivery_time", columnDefinition = "TIMESTAMPTZ")
    private ZonedDateTime deliveryTime;

    /**
     * 支払い方法
     */
    @Column(name = "payment_method", nullable = false)
    private Integer paymentMethod;

    /**
     * 注文者のユーザID
     */
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private Integer userId;
}
