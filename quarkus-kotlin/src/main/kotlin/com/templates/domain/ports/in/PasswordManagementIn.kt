package com.templates.domain.ports.`in`

interface PasswordManagementIn {
    fun initPasswordRecovery(identifier: String)
    fun recoverPassword(identifier:String, token: String, password: String, passwordConfirmation: String)
    fun changePassword(mail:String, password: String, passwordConfirmation: String)
}