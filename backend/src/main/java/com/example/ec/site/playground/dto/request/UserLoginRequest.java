package com.example.ec.site.playground.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** ユーザーログインリクエストDTO. */
@Getter
@Setter
@NoArgsConstructor
public class UserLoginRequest {
  private String email;
  private String password;
}
