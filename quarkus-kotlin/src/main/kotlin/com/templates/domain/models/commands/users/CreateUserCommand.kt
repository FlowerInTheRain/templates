package com.templates.domain.models.commands.users

import java.sql.Timestamp

class CreateUserCommand(
    val firstName: String,
    val lastName: String,
    val email: String,
    var password: String,
    val phoneNumber: String,
    var reference: String? = null,
    var type: String ? = null,
    var verificationCode: String ? = null,
    var verificationCodeTimestamp:  Timestamp? = null
) {
    override fun toString(): String {
        return "CreateUserCommand(firstName='$firstName', lastName='$lastName', email='$email', password='$password', phoneNumber='$phoneNumber', reference=$reference, type=$type)"
    }
}
