package com.example.ec.site.playground.service;

import com.example.ec.site.playground.model.User;
import com.example.ec.site.playground.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/** ユーザーの詳細情報を取得するサービスクラス. Spring SecurityのUserDetailsServiceを実装. */
@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
  private final UserRepository userRepository;

  /**
   * ユーザー名（メールアドレス）でユーザーを検索し、UserDetailsを返す.
   *
   * @param email ユーザーのメールアドレス
   * @return UserDetails オブジェクト
   * @throws UsernameNotFoundException ユーザーが見つからない場合にスローされる例外
   */
  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user =
        userRepository
            .findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("ユーザーが見つかりません: " + email));
    return org.springframework.security.core.userdetails.User.builder()
        .username(user.getEmail())
        .password(user.getPassword())
        .roles("ADMIN")
        .build();
  }
}
