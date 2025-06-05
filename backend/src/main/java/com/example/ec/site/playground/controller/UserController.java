package com.example.ec.site.playground.controller;

import com.example.ec.site.playground.dto.request.UserRegisterRequest;
import com.example.ec.site.playground.dto.response.UserRegisterResponse;
import com.example.ec.site.playground.model.User;
import com.example.ec.site.playground.service.UserService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/** ユーザー操作を行うコントローラクラス. */
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  /**
   * ユーザー登録を行うエンドポイント.
   *
   * @param request ユーザー登録リクエスト
   * @return 登録されたユーザー情報
   */
  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody UserRegisterRequest request) {
    try {
      User user = new User();
      user.setUserName(request.getUserName());
      user.setEmail(request.getEmail());
      user.setPassword(request.getPassword());
      user.setZipCode(request.getZipCode());
      user.setPrefecture(request.getPrefecture());
      user.setMunicipalities(request.getMunicipalities());
      user.setAddress(request.getAddress());
      user.setTelephone(request.getTelephone());

      User savedUser = userService.registerUser(user);

      UserRegisterResponse response =
          new UserRegisterResponse(savedUser.getUserName(), savedUser.getEmail());
      return ResponseEntity.status(HttpStatus.CREATED).body(response);
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
    }
  }
}
