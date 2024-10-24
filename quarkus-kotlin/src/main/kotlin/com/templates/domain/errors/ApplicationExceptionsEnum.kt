package com.templates.domain.errors

enum class ApplicationExceptionsEnum(val message: String,val errorCode: Int,val origin: String) {
    ERROR("An error occured", 404, ErrorOriginEnum.BOOTSTRAP.name),
    ERROR_VALIDATING_PASSWORD_HASH("An error occurred while connecting your account", 400, ErrorOriginEnum.DOMAIN.name);
}