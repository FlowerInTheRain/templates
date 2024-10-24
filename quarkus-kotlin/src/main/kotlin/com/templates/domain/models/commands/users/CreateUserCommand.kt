package com.templates.domain.models.commands.users

class CreateUserCommand(
    val firstName: String,
    val lastName: String,
    val email: String,
    var password: String,
    val phoneNumber: String,
    var reference: String? = null,
    var type: String ? = null
)
