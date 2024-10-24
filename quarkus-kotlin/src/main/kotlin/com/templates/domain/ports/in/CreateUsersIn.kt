package com.templates.domain.ports.`in`

import com.templates.domain.models.commands.users.CreateUserCommand

interface CreateUsersIn {
    fun createUser(user:CreateUserCommand): Unit
}