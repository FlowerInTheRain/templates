package com.templates.domain.services

import JwtTokenGenerator
import UUIDGenerator.getNewUUID
import com.password4j.Hash
import com.password4j.Password
import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.models.commands.users.CreateUserCommand
import com.templates.domain.models.users.UserBasicInformations
import com.templates.domain.models.users.UserTypes
import com.templates.domain.ports.`in`.CreateUsersIn
import com.templates.domain.ports.out.CreateUsersOut
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
    @Inject
    @field:Default
    lateinit var createUsersOut: CreateUsersOut
    override fun createUser(user: CreateUserCommand):UserBasicInformations {
        val userType = UserTypes.CLIENT.name
        val userReference = getNewUUID()
        val preHashPW = user.password


        user.type = userType
        user.reference = userReference

        verifyCreateUserInputs(preHashPW, user)
        val hash = hashWithBCrypt(preHashPW)
        val verificationCode = OtpGenerator.generateCode()
        user.password = hash.result
        val userToken = jwtTokenGenerator.getToken(user.mail,UserTypes
            .CLIENT.name)
        user.verificationCode = verificationCode
        user.verificationCodeTimestamp = Timestamp(System.currentTimeMillis())
        val content = mailer.generateOtpEmail(user.firstName, verificationCode)
        //mailer.sendHtmlEmail(user.mail, content)
        LOG.info("OTP verification Mail sent to user")
        createUsersOut.addUser(user)
       return UserBasicInformations(userType, userReference, userToken)
    }



    fun hashWithBCrypt(password: String): Hash {
        return Password.hash(password).withBcrypt()
    }

    fun verifyCreateUserInputs(preHashPW: String, user: CreateUserCommand):Unit{
        if(!preHashPW.matches(Regex("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[!?\\\$_])[A-Za-z\\d!?\\\$_]{8,}\$"))){
            throw ApplicationException(ApplicationExceptionsEnum.CREATE_USER_INVALID_PASSWORD)
        }
        if(user.lastName.length < 3 || user.firstName.length < 2 ) {
            throw ApplicationException(ApplicationExceptionsEnum.CREATE_USER_INVALID_NAME)
        }
        if(!user.phoneNumber.matches(Regex("^0[67]\\d{8}$"))){
            throw ApplicationException(ApplicationExceptionsEnum.CREATE_USER_INVALID_PHONE_NUMBER)
        }
    }

}