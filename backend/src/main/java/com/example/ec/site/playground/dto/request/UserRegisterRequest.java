package com.example.ec.site.playground.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/** ユーザ登録リクエストを表すDTOクラス. */
@Getter
@Setter
@NoArgsConstructor
public class UserRegisterRequest {
  private String userName;
  private String email;
  private String password;
  private String zipCode;
  private String prefecture;
  private String municipalities;
  private String address;
  private String telephone;
}
