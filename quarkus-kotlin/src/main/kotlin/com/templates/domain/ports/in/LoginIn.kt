package com.templates.domain.ports.`in`

import com.templates.domain.models.users.UserLoggedIn

interface LoginIn {
    fun clientLogin(identifier: String, password: String): UserLoggedIn
    fun adminLogin(identifier: String, password: String): UserLoggedIn

}