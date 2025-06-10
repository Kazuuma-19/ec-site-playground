package com.example.ec.site.playground.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

/** ユーザーログインレスポンスDTO. */
@Getter
@AllArgsConstructor
public class UserLoginResponse {
  private String userName;
  private String email;
}
