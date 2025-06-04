package com.example.ec.site.playground.service;

import com.example.ec.site.playground.model.User;
import com.example.ec.site.playground.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
   * @throws IllegalArgumentException メールアドレスが既に登録されている場合
   */
  public User registerUser(User user) {
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new IllegalArgumentException("このメールアドレスは既に登録されています。");
    }
    return userRepository.save(user);
  }
}
