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
import com.templates.domain.ports.out.SecretsClientOut
import com.templates.domain.services.PasswordUtils.hashWithBCrypt
import com.templates.domain.utils.AdminCodeGenerator.generateAdminCode
import com.templates.domain.utils.InputsValidator.validatePasswordFormat
import com.templates.domain.utils.InputsValidator.validatePhoneNumberFormat
import com.templates.domain.utils.OtpGenerator
import com.templates.domain.utils.UUIDGenerator.getNewUUID
import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import org.eclipse.microprofile.config.inject.ConfigProperty
import org.jboss.logging.Logger
import java.sql.Timestamp


@ApplicationScoped
class CreateUsers : CreateUsersIn {
    companion object {
        val LOG: Logger = Logger.getLogger(CreateUsers::class.java)
    }
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
    @Inject
    @field:Default
    lateinit var secretsClientOut: SecretsClientOut
    @field:ConfigProperty(name = "admin.code")
    lateinit var adminCreationCode: String

    override fun createUser(user: CreateUserCommand):UserBasicInformations {
        val userType = UserTypes.ADMIN.name
        val userReference = setUpUserDataAndCheckInputs(user, userType)

        val userToken = jwtTokenGenerator.getToken(user.mail,UserTypes
            .CLIENT.name)
        createUsersOut.addClient(user)
        azureStorageIn.createContainerForUser(user.phoneNumber)
        LOG.info("OTP verification Mail sent to user")
       return UserBasicInformations(userType, userReference, userToken, false)
    }



    override fun createAdmin(user: CreateUserCommand, adminCode: String): UserBasicInformations {
        LOG.info(adminCreationCode)
        LOG.info(adminCode)
        if(adminCode == adminCreationCode){
            val userType = UserTypes.CLIENT.name
            val userReference = setUpUserDataAndCheckInputs(user, userType)
            val userToken = jwtTokenGenerator.getToken(user.mail,UserTypes
                .ADMIN.name)
            user.accountVerified = true
            createUsersOut.addAdmin(user)
            azureStorageIn.createContainerForUser(user.phoneNumber)
            LOG.info("OTP verification Mail sent to user")
            val newAdminCreationCode = generateAdminCode()
            adminCreationCode = newAdminCreationCode
            secretsClientOut.updateAdminCode(adminCreationCode)
            LOG.info(adminCreationCode)
            return UserBasicInformations(userType, userReference, userToken, false)
        } else {
            throw ApplicationException(ApplicationExceptionsEnum.ADMIN_VERIFICATION_CODE_NO_MATCH)
        }
    }

    private fun setUpUserDataAndCheckInputs(
        user: CreateUserCommand,
        userType: String
    ): String {
        val userReference = getNewUUID()
        val preHashPW = user.password
        val verificationCode = OtpGenerator.generateCode()
        val content = mailer.generateOtpEmail(user.firstName, verificationCode)

        user.type = userType
        user.reference = userReference
        if(user.type == UserTypes.CLIENT.name){
            mailer.sendHtmlEmail(user.mail, "Vérification de compte", content)
        }

        verifyCreateUserInputs(preHashPW, user)
        val hash = hashWithBCrypt(preHashPW)
        user.verificationCode = hashWithBCrypt( verificationCode).result
        user.verificationCodeTimestamp = Timestamp(System.currentTimeMillis())
        user.password = hash.result
        return userReference
    }

    fun verifyCreateUserInputs(preHashPW: String, user: CreateUserCommand){
        validatePasswordFormat(preHashPW)
        if(user.lastName.length < 3 || user.firstName.length < 2 ) {
            throw ApplicationException(ApplicationExceptionsEnum.CREATE_USER_INVALID_NAME)
        }
       validatePhoneNumberFormat(user.phoneNumber)
    }
}