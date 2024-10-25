package com.templates.domain.ports.out

import com.templates.domain.models.commands.users.CreateUserCommand

interface CreateUsersOut {
    fun addUser(user: CreateUserCommand)
}