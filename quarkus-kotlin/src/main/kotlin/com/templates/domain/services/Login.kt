package com.templates.domain.services

import JwtTokenGenerator
import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.mappers.UsersMappers
import com.templates.domain.models.users.UserLoggedIn
import com.templates.domain.models.users.UserTypes
import com.templates.domain.ports.`in`.LoginIn
import com.templates.domain.ports.out.FindUserOut
import com.templates.domain.services.PasswordUtils.verifyPassword
import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import org.jboss.logging.Logger

@ApplicationScoped
class Login(@field:Inject var jwtTokenGenerator: JwtTokenGenerator) : LoginIn {
    val LOG: Logger = Logger.getLogger(Login::class.java)

    @Inject
    @field:Default
    lateinit var findUserOut: FindUserOut

    @Inject
    @field:Default
    lateinit var usersMappers: UsersMappers

    override fun clientLogin(identifier: String, password: String): UserLoggedIn {
        val user = findUserOut.findByIdentifier(identifier)
        LOG.info(user.toString())
        if(verifyPassword(password, user.password)) {
            LOG.info("Login successful")
            val jwToken = jwtTokenGenerator.getToken(user.mail, UserTypes.CLIENT.name)
            return usersMappers.fromUsersToUsersLoggedIn(user, jwToken)
        } else {
            throw ApplicationException(ApplicationExceptionsEnum.ERROR_VALIDATING_PASSWORD_HASH)
        }
    }
}