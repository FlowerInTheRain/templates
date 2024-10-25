package com.templates.application.dto.responses

import kotlinx.serialization.Serializable

@Serializable
data class UserLoginResponse(
    val firstName: String,
    val lastName: String,
    val mail: String,
    val phoneNumber: String,
    val reference: String,
    val type: String,
    val token:String,
    val profilePicture: String? = null,
    val accountVerified: Boolean,
){
    override fun toString(): String {
        return "UserLoginResponse(firstName='$firstName', lastName='$lastName', mail='$mail', phoneNumber='$phoneNumber', reference='$reference', type='$type', token='$token')"
    }
}
