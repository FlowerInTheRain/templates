package com.templates.domain.services

import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.ports.`in`.VerifyAccountsIn
import com.templates.domain.ports.out.FindUserOut
import com.templates.domain.ports.out.UpdateUserOut
import com.templates.domain.utils.OtpGenerator.generateCode
import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import java.sql.Timestamp
import java.time.Instant


@ApplicationScoped
class VerifyAccounts:VerifyAccountsIn {
    @Inject
    @field:Default
    lateinit var findUserOut: FindUserOut

    @Inject
    @field:Default
    lateinit var updateUserOut: UpdateUserOut

    override fun verifyClientAccount(mail: String, otp: String) {
        val user = findUserOut.findByIdentifier(mail)
        val otpTimestamp = user.verificationCodeTimestamp
        if(user.verificationCode.equals(otp)){
            if(hasExceededTwentyMinutes(otpTimestamp, Timestamp.from(Instant.now()))){
                throw ApplicationException(ApplicationExceptionsEnum.OTP_TIMESTAMP_EXCEEDED)
            }
            updateUserOut.approveUserAccount(mail)
        } else {
            throw  ApplicationException(ApplicationExceptionsEnum.OTP_CODES_NO_MATCH)
        }
    }

    override fun generateNewOtpCode(mail: String) {
        val newOtp = generateCode()
        val newTimestamp = Timestamp.from(Instant.now())
        updateUserOut.putNewOtpCode(mail, newOtp, newTimestamp)
    }

    fun hasExceededTwentyMinutes(timestamp1: Timestamp?, timestamp2: Timestamp?): Boolean {
        val millisecondsDifference = Math.abs(timestamp2!!.time - timestamp1!!.time)
        return millisecondsDifference > 1200000
    }
}