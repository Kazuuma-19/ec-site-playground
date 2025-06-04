package com.example.ec.site.playground.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
