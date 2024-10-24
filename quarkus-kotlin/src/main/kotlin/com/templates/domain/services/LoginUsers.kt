package com.templates.domain.services

import JwtTokenGenerator
import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.models.User
import com.templates.domain.models.users.UserTypes
import com.templates.domain.ports.`in`.LoginUsersIn
import com.templates.domain.services.PasswordUtils.hashWithBCrypt
import com.templates.domain.services.PasswordUtils.verifyPassword
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import org.jboss.logging.Logger

@ApplicationScoped
class LoginUsers(@field:Inject var jwtTokenGenerator: JwtTokenGenerator) : LoginUsersIn {
    val LOG: Logger = Logger.getLogger(LoginUsers::class.java)

    override fun login(username: String, password: String): User {
        if(verifyPassword(password, hashWithBCrypt(password).result)) {
            LOG.info("Password is valid")
            jwtTokenGenerator.getToken(username, UserTypes.CLIENT.name)
        } else {
            throw ApplicationException(ApplicationExceptionsEnum.ERROR_VALIDATING_PASSWORD_HASH)
        }
        TODO("Not yet implemented")
    }
}