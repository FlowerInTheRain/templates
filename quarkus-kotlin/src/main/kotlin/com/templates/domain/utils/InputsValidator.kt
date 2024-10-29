package com.templates.domain.utils

import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.services.PasswordUtils.verifyPassword
import java.sql.Timestamp

object InputsValidator {
    fun validatePasswordConfirmation(inputPassword: String, confirmPassword: String) {
        if(inputPassword != confirmPassword){
            throw ApplicationException(ApplicationExceptionsEnum.PASSWORDS_NO_MATCH)
        }
    }
    fun validatePasswordFormat(inputPassword: String) {
        if(!inputPassword.matches(Regex("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!?\\\$_])[A-Za-z\\d!?\\\$_]{8,}\$"))){
            throw ApplicationException(ApplicationExceptionsEnum.USER_INVALID_PASSWORD)
        }
    }

    fun validatePasswordHash(token:String, currentToken:String) {
        if(!verifyPassword(currentToken, token)){
            throw ApplicationException(ApplicationExceptionsEnum.INVALID_TOKEN)
        }
    }

    fun hasTimestampExceededTwentyMinutes(timestamp1: Timestamp, timestamp2: Timestamp) {
        val millisecondsDifference = Math.abs(timestamp2.time - timestamp1.time)
        if( millisecondsDifference > 1200000){
            throw ApplicationException(ApplicationExceptionsEnum.OTP_TIMESTAMP_EXCEEDED)

        }
    }
}