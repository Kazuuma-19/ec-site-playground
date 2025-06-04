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

  public User registerUser(User user) {
    if (userRepository.existsByEmail(user.getEmail())) {
      throw new IllegalArgumentException("このメールアドレスは既に登録されています。");
    }
    return userRepository.save(user);
  }
}
