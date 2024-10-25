package com.templates.domain.errors

import org.jboss.resteasy.reactive.RestResponse.StatusCode

enum class ApplicationExceptionsEnum(val message: String,val errorCode: Int,val origin: String) {
    ERROR("An error occured", StatusCode.BAD_REQUEST, ErrorOriginEnum.BOOTSTRAP.name),
    ERROR_VALIDATING_PASSWORD_HASH("An error occurred while connecting your account", StatusCode.BAD_REQUEST, ErrorOriginEnum.DOMAIN
        .name),
    CREATE_USER_INVALID_PHONE_NUMBER("Invalid phone number, must be a french mobile phone number", StatusCode.BAD_REQUEST,ErrorOriginEnum
        .DOMAIN.name),
    CREATE_USER_INVALID_NAME("First or last name is too short", StatusCode.BAD_REQUEST, ErrorOriginEnum.DOMAIN.name),
    CREATE_USER_INVALID_PASSWORD("Invalid password, pasword must be at least 8 characters and contain one digit, one " +
            "lower case letter, one upper case letter, and a special character (! or ?)", StatusCode.BAD_REQUEST, ErrorOriginEnum.DOMAIN
                .name),
    CREATE_USER_DUPLICATE_MAIL("Mail address is already registered", StatusCode.BAD_REQUEST, ErrorOriginEnum.PERSISTENCE
        .name),
    CREATE_USER_DUPLICATE_PHONE_NUMBER("Phone number is already linked to an account", StatusCode.BAD_REQUEST,
        ErrorOriginEnum.PERSISTENCE
        .name),
    CREATE_USER_DUPLICATE_REFERENCE("Mail address is already registered", StatusCode.BAD_REQUEST, ErrorOriginEnum.PERSISTENCE
        .name)
    ;
}