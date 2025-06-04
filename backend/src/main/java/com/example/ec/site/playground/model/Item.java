package com.example.ec.site.playground.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Integer itemId;

    @Column(name = "item_name", nullable = false)
    private String itemName;

    @Column(name = "item_description")
    private String itemDescription;

    @Column(name = "item_price_m", nullable = false)
    private Integer itemPriceM = 0;

    @Column(name = "item_price_l", nullable = false)
    private Integer itemPriceL = 0;

    @Column(name = "image_path", nullable = false)
    private String itemPath;

    @Column(name = "deleted")
    private Boolean deleted = false;
}
