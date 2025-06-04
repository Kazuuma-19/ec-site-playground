package com.example.ec.site.playground.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserRegisterResponse {
  private Integer userId;
  private String userName;
  private String email;
}
