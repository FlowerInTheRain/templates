package com.templates.application.dto.responses

import kotlinx.serialization.Serializable

@Serializable
data class CreateUserResponse(val type:String, val reference: String, val jwtToken:String,
                              val accountVerifiedStatus:Boolean)
