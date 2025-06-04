package com.example.ec.site.playground.repository;

import com.example.ec.site.playground.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/** ユーザー情報を操作するリポジトリ. */
public interface UserRepository extends JpaRepository<User, Integer> {
  /**
   * メールアドレスの重複チェックを行う.
   *
   * @param email メールアドレスs
   * @return メールアドレスが存在するかどうか
   */
  boolean existsByEmail(String email);
}
