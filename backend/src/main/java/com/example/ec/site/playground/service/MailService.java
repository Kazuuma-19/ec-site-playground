package com.example.ec.site.playground.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

/** メール送信サービスクラス. */
@Service
@RequiredArgsConstructor
public class MailService {
  private final JavaMailSender mailSender;

  @Value("${MAIL_USERNAME}")
  private String mailUsername;

  /**
   * 注文確認メールを送信するメソッド.
   *
   * @param to 宛先のメールアドレス
   * @param subject メールの件名
   * @param body メールの本文
   */
  public void sendOrderConfirmationEmail(String to, String subject, String body)
      throws MessagingException {
    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper messageHelper =
        new MimeMessageHelper(message, true); // 第２引数をtrueにするとファイル添付などが可能になる
    messageHelper.setFrom(mailUsername);
    messageHelper.setTo(to);
    messageHelper.setSubject(subject);
    messageHelper.setText(body, true); // trueにするとHTML形式で送信される
    mailSender.send(message);
  }
}
