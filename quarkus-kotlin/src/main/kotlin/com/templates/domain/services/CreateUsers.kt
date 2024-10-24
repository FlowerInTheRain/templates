package com.templates.domain.services

import JwtTokenGenerator
import UUIDGenerator.getNewUUID
import com.password4j.Hash
import com.password4j.Password
import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.models.commands.users.CreateUserCommand
import com.templates.domain.models.users.UserCreationInformations
import com.templates.domain.models.users.UserTypes
import com.templates.domain.ports.`in`.CreateUsersIn
import com.templates.domain.services.PasswordUtils.verifyPassword
import com.templates.domain.utils.OtpGenerator

import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import org.jboss.logging.Logger
import java.sql.Timestamp


@ApplicationScoped
class CreateUsers : CreateUsersIn {
     val LOG: Logger = Logger.getLogger(CreateUsers::class.java)
    @Inject
    @field:Default
    lateinit var jwtTokenGenerator: JwtTokenGenerator
    @Inject
    @field:Default
    lateinit var mailer: Mailer

    override fun createUser(user: CreateUserCommand):UserCreationInformations {
        val userType = UserTypes.CLIENT.name
        val userReference = getNewUUID()
        user.type = userType
        user.reference = userReference
        val preHashPW = user.password
        val hash = hashWithBCrypt(preHashPW)
        user.password = hash.result
        if(user.lastName.isEmpty() || user.firstName.isEmpty() || user.phoneNumber.isEmpty() || user.email.isEmpty()) {
            // TODO("Change this shit for a less generic error")
            throw ApplicationException(ApplicationExceptionsEnum.ERROR)
        }
        if(verifyPassword(preHashPW, hash.result)){
            val userToken = jwtTokenGenerator.getToken(user.email,UserTypes
                .CLIENT.name)
            val verificationCode = OtpGenerator.generateCode()
            user.verificationCode = verificationCode
            user.verificationCodeTimestamp = Timestamp(System.currentTimeMillis())
            // TODO("Save user in DB")
            val content = mailer.generateOtpEmail(user.firstName, verificationCode)
            mailer.sendHtmlEmail(user.email, content)
            LOG.info("OTP verification Mail sent to user")
           return UserCreationInformations(userType, userReference, userToken)
        } else {
            throw ApplicationException(ApplicationExceptionsEnum.ERROR_VALIDATING_PASSWORD_HASH)
        }
    }



    fun hashWithBCrypt(password: String): Hash {
        return Password.hash(password).withBcrypt()
    }

}