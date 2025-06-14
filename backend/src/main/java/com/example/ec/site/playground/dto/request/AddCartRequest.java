package com.example.ec.site.playground.dto.request;

import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** カートにアイテムを追加するリクエストを表すDTOクラス. */
@Getter
@Setter
@NoArgsConstructor
public class AddCartRequest {
  private Integer itemId;
  private Character size;
  private Integer quantity;
  private Integer subtotalPrice;
  private List<Integer> toppingIdList;
}
