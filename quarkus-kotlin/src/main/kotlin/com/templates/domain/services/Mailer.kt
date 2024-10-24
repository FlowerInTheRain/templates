package com.templates.domain.services

import io.quarkus.mailer.Mail
import io.quarkus.mailer.Mailer

import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject

@ApplicationScoped
class Mailer {
    @Inject
    @field:Default
    lateinit var mailer: Mailer

    fun sendHtmlEmail(mail: String, content: String) {
        mailer.send(Mail.withHtml(mail, "One last step...", content))
    }

    fun generateOtpEmail(userName: String, verificationCode: String): String {
        return "<div style='font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2'>\n" +
                "  <div style='margin:50px auto;width:70%;padding:20px 0'>\n" +
                "    <p style='font-size:1.1em'>Hi " + userName + ",</p>\n" +
                "    <p>Thank you for joining Us. Use the following OTP to complete your Sign Up procedures. OTP " +
                "is valid for 20 minutes</p>\n" +
                "    <h2 style='background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: " +
                "#fff;border-radius: 4px;'>" + verificationCode +"</h2>\n" +
                "    <p style='font-size:0.9em'>Regards,<br />Us</p>\n" +
                "    <hr style='border:none;border-top:1px solid #eee' />\n" +
                "    <div style='float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300'>\n" +
                "      <p>Us</p>\n" +
                "      <p>Nation</p>\n" +
                "      <p>Paris, France</p>\n" +
                "    </div>\n" +
                "  </div>\n" +
                "</div>"
    }
}