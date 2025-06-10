package com.example.ec.site.playground.dto.response;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** カートの中身を表すレスポンスDTOクラス. */
@Getter
@Setter
@NoArgsConstructor
public class CartItemResponse {
  private Integer itemId;
  private String itemName;
  private String itemPath;
  private Integer itemPrice;
  private Integer quantity;
  private List<ToppingResponse> toppingList;
  private Integer subtotalPrice;
}
