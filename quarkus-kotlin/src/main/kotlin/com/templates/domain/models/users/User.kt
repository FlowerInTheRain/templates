package com.templates.domain.models.users

import java.sql.Timestamp

class User(
    val id :Int,
    val firstName: String,
    val lastName: String,
    val mail: String,
    val password: String,
    val phoneNumber: String,
    val reference: String,
    val type: String,
    var verificationCode: String? = null,
    var verificationCodeTimestamp: Timestamp? = null
)
