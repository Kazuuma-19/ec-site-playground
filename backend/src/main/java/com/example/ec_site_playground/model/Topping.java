package com.example.ec_site_playground.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * トッピングを表すドメインクラス.
 */
@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "topping")
public class Topping {
    /**
     * トッピングID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "topping_id", nullable = false)
    private Integer toppingId;

    /**
     * トッピング名
     */
    @Column(name = "topping_name", nullable = false)
    private String toppingName;

    /**
     * Mサイズのときの値段
     */
    @Column(name = "price_m", nullable = false)
    private Integer priceM;

    /**
     * Lサイズのときの値段
     */
    @Column(name = "price_l", nullable = false)
    private Integer priceL;
}
