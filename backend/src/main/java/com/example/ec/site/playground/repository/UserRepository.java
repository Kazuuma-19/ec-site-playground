package com.example.ec.site.playground.repository;

import com.example.ec.site.playground.model.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

/** ユーザー情報を操作するリポジトリ. */
public interface UserRepository extends JpaRepository<User, Integer> {
  /**
   * メールアドレスの重複チェックを行う.
   *
   * @param email メールアドレス
   * @return メールアドレスが存在するかどうか
   */
  boolean existsByEmail(String email);

  /**
   * メールアドレスでユーザーを検索する.
   *
   * @param email メールアドレス
   * @return ユーザー情報（存在しない場合は空）
   */
  Optional<User> findByEmail(String email);

  /**
   * ユーザーIDでユーザーを検索する.
   *
   * @param userId ユーザーID
   * @return ユーザー情報（存在しない場合は空）
   */
  Optional<User> findByUserId(Integer userId);
}
