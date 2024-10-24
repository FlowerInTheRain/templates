package com.templates.application.dto.requests

import kotlinx.serialization.Serializable

@Serializable
data class UserCreationRequest(
    val firstName: String,
    val lastName: String,
    val email: String,
    val password: String,
    val phoneNumber: String
)
