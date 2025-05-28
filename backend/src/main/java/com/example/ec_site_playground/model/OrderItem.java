package com.example.ec_site_playground.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "order_item")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_item_id", nullable = false)
    private Integer orderItemId;

    @ManyToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Integer itemId;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Integer orderId;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "size", nullable = false, length = 1)
    private String size;
}
