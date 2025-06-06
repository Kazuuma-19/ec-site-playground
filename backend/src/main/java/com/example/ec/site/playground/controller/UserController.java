package com.example.ec.site.playground.controller;

import com.example.ec.site.playground.dto.request.UserLoginRequest;
import com.example.ec.site.playground.dto.request.UserRegisterRequest;
import com.example.ec.site.playground.dto.response.UserLoginResponse;
import com.example.ec.site.playground.dto.response.UserRegisterResponse;
import com.example.ec.site.playground.model.User;
import com.example.ec.site.playground.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

/** ユーザー操作を行うコントローラクラス. */
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private static final String SESSION_USER_ID = "SESSION_USER_ID";

  /**
   * ユーザー登録を行うエンドポイント.
   *
   * @param request ユーザー登録リクエスト
   * @return 登録されたユーザー情報
   */
  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody UserRegisterRequest request) {
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
  }

  /**
   * ユーザーログインを行うエンドポイント.
   *
   * @param request ログインリクエスト
   * @param session HTTPセッション
   * @return ログインしたユーザー情報
   */
  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody UserLoginRequest request, HttpSession session) {
    User user = userService.login(request.getEmail(), request.getPassword());

    // セッションにユーザーIDを保存
    session.setAttribute(SESSION_USER_ID, user.getUserId());

    UserLoginResponse response = new UserLoginResponse(user.getUserName(), user.getEmail());
    return ResponseEntity.ok(response);
  }

  /**
   * ログアウトを行うエンドポイント.
   *
   * @param session HTTPセッション
   * @return ログアウト結果
   */
  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpSession session) {
    session.invalidate();
    return ResponseEntity.ok().build();
  }

  /**
   * 現在のログイン状態を確認するエンドポイント.
   *
   * @param session HTTPセッション
   * @return ログイン中のユーザー情報
   */
  @GetMapping("/me")
  public ResponseEntity<?> getCurrentUser(HttpSession session) {
    Integer userId = (Integer) session.getAttribute(SESSION_USER_ID);
    if (userId == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    try {
      User user = userService.getUserById(userId);
      UserLoginResponse response = new UserLoginResponse(user.getUserName(), user.getEmail());
      return ResponseEntity.ok(response);
    } catch (ResponseStatusException e) {
      // セッションに保存されているユーザーIDが無効な場合、セッションを無効化
      session.invalidate();
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
  }
}
