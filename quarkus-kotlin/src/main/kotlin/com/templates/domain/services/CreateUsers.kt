package com.templates.domain.services

import JwtTokenGenerator
import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.models.commands.users.CreateUserCommand
import com.templates.domain.models.users.UserBasicInformations
import com.templates.domain.models.users.UserTypes
import com.templates.domain.ports.`in`.AzureStorageIn
import com.templates.domain.ports.`in`.CreateUsersIn
import com.templates.domain.ports.out.CreateUsersOut
import com.templates.domain.services.PasswordUtils.hashWithBCrypt
import com.templates.domain.utils.OtpGenerator
import com.templates.domain.utils.UUIDGenerator.getNewUUID
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
    @Inject
    @field:Default
    lateinit var azureStorageIn: AzureStorageIn

    override fun createUser(user: CreateUserCommand):UserBasicInformations {
        val userType = UserTypes.CLIENT.name
        val userReference = getNewUUID()
        val preHashPW = user.password
        val verificationCode = OtpGenerator.generateCode()
        val content = mailer.generateOtpEmail(user.firstName, verificationCode)

        user.type = userType
        user.reference = userReference

        verifyCreateUserInputs(preHashPW, user)
        val hash = hashWithBCrypt(preHashPW)
        user.password = hash.result

        val userToken = jwtTokenGenerator.getToken(user.mail,UserTypes
            .CLIENT.name)

        user.verificationCode = verificationCode
        user.verificationCodeTimestamp = Timestamp(System.currentTimeMillis())
        azureStorageIn.createContainerForUser(user.phoneNumber)
        //mailer.sendHtmlEmail(user.mail, content)
        LOG.info("OTP verification Mail sent to user")
        createUsersOut.addUser(user)
       return UserBasicInformations(userType, userReference, userToken)
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