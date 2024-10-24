package com.templates.domain.ports.`in`

import com.templates.domain.models.commands.users.CreateUserCommand
import com.templates.domain.models.users.UserCreationInformations

interface CreateUsersIn {
    fun createUser(user:CreateUserCommand): UserCreationInformations
}