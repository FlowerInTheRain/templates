package com.templates.domain.ports.`in`

import com.templates.domain.models.User

interface LoginUsersIn {
    fun login(username: String, password: String): User
}