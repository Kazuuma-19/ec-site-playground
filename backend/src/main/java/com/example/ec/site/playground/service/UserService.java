package com.example.ec.site.playground.service;

import com.example.ec.site.playground.model.User;
import com.example.ec.site.playground.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

/** ユーザーの処理を行うサービスクラス. */
@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;

  /**
   * ユーザーを登録するメソッド.
   *
   * @param user 登録するユーザー情報
   * @return 登録されたユーザー情報
   * @throws ResponseStatusException メールアドレスが既に登録されている場合
   */
  public User registerUser(User user) {
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "このメールアドレスは既に登録されています。");
    }
    return userRepository.save(user);
  }

  /**
   * ユーザーログインを行うメソッド.
   *
   * @param email メールアドレス
   * @param password パスワード
   * @return ログインしたユーザー情報
   * @throws ResponseStatusException メールアドレスまたはパスワードが不正な場合
   */
  public User login(String email, String password) {
    User user =
        userRepository
            .findByEmail(email)
            .orElseThrow(
                () ->
                    new ResponseStatusException(HttpStatus.UNAUTHORIZED, "メールアドレスまたはパスワードが不正です。"));

    if (!user.getPassword().equals(password)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "メールアドレスまたはパスワードが不正です。");
    }

    return user;
  }

  /**
   * ユーザーIDでユーザーを取得するメソッド.
   *
   * @param userId ユーザーID
   * @return ユーザー情報
   * @throws ResponseStatusException ユーザーが存在しない場合
   */
  public User getUserById(Integer userId) {
    return userRepository
        .findByUserId(userId)
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "ユーザーが見つかりません。"));
  }
}
