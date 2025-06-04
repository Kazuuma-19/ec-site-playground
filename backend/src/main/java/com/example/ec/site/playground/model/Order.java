package com.example.ec.site.playground.model;

import jakarta.persistence.*;
import java.time.ZonedDateTime;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** 注文情報を表すドメインクラス. */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "orders")
public class Order {
  /** 注文ID. */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "order_id")
  private Integer orderId;

  /** 注文状態. */
  @Column(name = "status", nullable = false)
  private Integer status;

  /** 合計金額. */
  @Column(name = "total_price", columnDefinition = "INTEGER DEFAULT 0")
  private Integer totalPrice = 0;

  /** 注文日. */
  @Column(name = "order_date", columnDefinition = "TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP")
  private ZonedDateTime orderDate = ZonedDateTime.now();

  /** 宛先の名前. */
  @Column(name = "destination_name", nullable = false)
  private String destinationName;

  /** 宛先のメールアドレス. */
  @Column(name = "destination_email", nullable = false)
  private String destinationEmail;

  /** 宛先の郵便番号. */
  @Column(name = "destination_zip_code", nullable = false, length = 7)
  private String destinationZipCode;

  /** 宛先の都道府県. */
  @Column(name = "destination_prefecture", nullable = false, length = 10)
  private String destinationPrefecture;

  /** 宛先の市区町村. */
  @Column(name = "destination_municipalities", nullable = false)
  private String destinationMunicipalities;

  /** 宛先の住所. */
  @Column(name = "destination_address", nullable = false)
  private String destinationAddress;

  /** 宛先の携帯番号. */
  @Column(name = "destination_telephone", nullable = false, length = 15)
  private String destinationTelephone;

  /** 配達日時. */
  @Column(
      name = "delivery_time",
      columnDefinition = "TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP + interval '1 hour'")
  private ZonedDateTime deliveryTime = ZonedDateTime.now().plusHours(1);

  /** 支払い方法. */
  @Column(name = "payment_method", nullable = false)
  private Integer paymentMethod;

  /** 注文者のユーザID. */
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  private User userId;

  /** 注文アイテムリスト. */
  @OneToMany(
      mappedBy = "order",
      cascade = CascadeType.ALL,
      orphanRemoval = true,
      fetch = FetchType.LAZY)
  private List<OrderItem> orderItemList;
}
