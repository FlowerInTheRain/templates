package com.templates.domain.models.commands.users

class CreateUserCommand(
    val firstName: String,
    val lastName: String,
    val email: String,
    var password: String,
    val phoneNumber: String,
    var reference: String,
    var type: String
)
