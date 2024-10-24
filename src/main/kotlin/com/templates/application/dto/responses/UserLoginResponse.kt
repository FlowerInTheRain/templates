package com.templates.application.dto.responses

data class UserLoginResponse(
    val token: String,
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String,
    val reference:String,
    val type:String,
    val phoneNumber:String
)
