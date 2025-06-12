package com.example.ec.site.playground.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** 注文リクエストを表すDTOクラス. */
@Getter
@Setter
@NoArgsConstructor
public class OrderRequest {
  Integer totalPrice;
  String destinationName;
  String destinationEmail;
  String destinationZipcode;
  String destinationPrefecture;
  String destinationMunicipalities;
  String destinationAddress;
  String destinationTelephone;
  String deliveryDateTime;
  Integer paymentMethod; // 1: 代金引換, 2: クレジットカード
}
