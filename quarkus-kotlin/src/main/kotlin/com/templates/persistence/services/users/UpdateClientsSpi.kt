package com.templates.persistence.services.users

import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.ports.out.UpdateClientsOut
import com.templates.persistence.repositories.ClientsRepository
import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.transaction.Transactional
import org.jboss.logging.Logger
import java.sql.SQLException
import java.sql.Timestamp

@ApplicationScoped
class UpdateClientsSpi:UpdateClientsOut {

    @Inject
    @field:Default
    lateinit var clientsRepository: ClientsRepository

    @Transactional
    override fun updateProfilePicture(mail: String, profilePictureUrl:String) {
        try {
            clientsRepository.update("profilePicture = :profilePictureUrl WHERE mail = :mail",
                mapOf(
                "mail" to mail,
                "profilePictureUrl" to profilePictureUrl
            ))
            LOG.info(String.format("User %s profille picture was updated", mail))
        } catch (e: SQLException) {
            handlleExceptions(e)
        }

    }

    @Transactional
    override fun approveAccount(mail: String) {
        try {
            clientsRepository.update("accountVerifiedStatus = true WHERE mail =:mail",  mapOf(
                "mail" to mail
            ))
            LOG.info(String.format("User %s was approved", mail))
        } catch (e: SQLException) {
            handlleExceptions(e)
        }
    }

    @Transactional
    override fun changeOtpCode(mail: String, newOtp: String, newOtpTimestamp: Timestamp) {
        try {
            clientsRepository.update("verificationCode = :newOtp, verificationCodeTimestamp = :newTimestamp WHERE " +
                    "mail" +
                    " =:mail",
                mapOf(
                    "newOtp" to newOtp,
                    "newTimestamp" to newOtpTimestamp,
                    "mail" to mail
                ))
            LOG.info(String.format("User %s verification code updated", mail))
        } catch (e: SQLException) {
            handlleExceptions(e)
        }

    }

    override fun initPasswordRecovery(
        identifier: String,
        passwordVerificationCode: String,
        passwordVerificationTimestamp: Timestamp
    ) {
        try {
            clientsRepository.update("passwordVerificationCode = :verificationCode, passwordVerificationCodeTimestamp" +
                    " = " +
                    ":newTimestamp " +
                    "WHERE " +
                    "mail" +
                    " =:mail",
                mapOf(
                    "verificationCode" to passwordVerificationCode,
                    "newTimestamp" to passwordVerificationTimestamp,
                    "mail" to identifier
                ))
            LOG.info(String.format("User %s verification code updated", identifier))
        } catch (e: SQLException) {
            handlleExceptions(e)
        }
    }

    override fun changePassword(identifier: String, newPassword: String) {
        try {
            clientsRepository.update("password = :newPassword, passwordVerificationCodeTimestamp" +
                    " = :newTimestamp WHERE mail =:mail OR phoneNumber = :mail",
                mapOf(
                    "newPassword" to newPassword,
                    "mail" to identifier
                ))
            LOG.info(String.format("User %s verification code updated", identifier))
        } catch (e: SQLException) {
            handlleExceptions(e)
        }
    }

    private fun handlleExceptions(e: SQLException) {
        LOG.info(e.message)
        throw ApplicationException(ApplicationExceptionsEnum.ERROR)
    }

    companion object {
        val LOG: Logger = Logger.getLogger(UpdateClientsSpi::class.java)
    }


}