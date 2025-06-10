package com.example.ec.site.playground.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** カートに追加するトッピングのレスポンスを表すDTOクラス. */
@Getter
@Setter
@NoArgsConstructor
public class ToppingResponse {
  private Integer toppingId;
  private String toppingName;
  private Integer toppingPrice;
}
