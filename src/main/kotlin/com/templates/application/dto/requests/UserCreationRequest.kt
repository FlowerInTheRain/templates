package com.templates.application.dto.requests

data class UserCreationRequest(
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String,
    val phoneNumber: String
)
