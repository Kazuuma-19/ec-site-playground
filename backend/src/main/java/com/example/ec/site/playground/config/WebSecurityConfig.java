package com.example.ec.site.playground.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

/** Spring Securityの設定クラス. */
@Configuration
public class WebSecurityConfig {
  /**
   * セキュリティフィルターチェーンのBeanを定義. HTTPリクエストの認証と承認を設定する.
   *
   * @param http HttpSecurityオブジェクト
   * @return SecurityFilterChainのインスタンス
   * @throws Exception 設定中に発生した例外
   */
  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable) // 一旦無効。cookieの`XSRF-TOKEN`に対応する必要がある。
        .authorizeHttpRequests(
            auth ->
                auth.requestMatchers("/user/register", "/user/login")
                    .permitAll()
                    .anyRequest()
                    .authenticated())
        .formLogin(AbstractHttpConfigurer::disable)
        .httpBasic(AbstractHttpConfigurer::disable)
        .sessionManagement(
            session -> session.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED))
        .logout(
            logout ->
                logout
                    .logoutUrl("/logout")
                    .logoutSuccessHandler(
                        (request, response, authentication) -> response.setStatus(200)));

    return http.build();
  }

  /**
   * パスワードエンコーダーのBean. BCryptアルゴリズムを使用してパスワードをエンコードする.
   *
   * @return PasswordEncoderのインスタンス
   */
  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }
}
