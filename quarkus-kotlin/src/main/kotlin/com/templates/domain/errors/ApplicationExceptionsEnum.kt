package com.templates.domain.errors

enum class ApplicationExceptionsEnum(val message: String,val errorCode: Int,val origin: String) {
    ERROR("An error occured", 404, ErrorOriginEnum.BOOTSTRAP.name);
}