package com.example.ec.site.playground.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** トッピングを表すドメインクラス. */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "topping")
public class Topping {
  /** トッピングID. */
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "topping_id", nullable = false)
  private Integer toppingId;

  /** トッピング名. */
  @Column(name = "topping_name", nullable = false)
  private String toppingName;

  /** Mサイズのときの値段. */
  @Column(
      name = "price_m",
      nullable = false,
      columnDefinition = "INTEGER DEFAULT 0 CHECK (price_m >= 0)")
  private Integer priceM = 0;

  /** Lサイズのときの値段. */
  @Column(
      name = "price_l",
      nullable = false,
      columnDefinition = "INTEGER DEFAULT 0 CHECK (price_l >= 0)")
  private Integer priceL = 0;
}
