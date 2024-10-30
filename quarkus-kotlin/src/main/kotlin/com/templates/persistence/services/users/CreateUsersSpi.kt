package com.templates.persistence.services.users

import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.models.commands.users.CreateUserCommand
import com.templates.domain.ports.out.CreateUsersOut
import com.templates.persistence.mappers.users.UsersEntityMapper
import com.templates.persistence.repositories.AdminsRepository
import com.templates.persistence.repositories.ClientsRepository
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.enterprise.context.ApplicationScoped
import jakarta.transaction.Transactional
import org.hibernate.exception.ConstraintViolationException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import kotlin.jvm.Throws

@Transactional
@ApplicationScoped
class CreateUsersSpi : CreateUsersOut {
    companion object {
        const val MAIL_KEY = "uq_user_mail"
        const val PHONE_KEY = "uq_user_phone"
        const val REFERENCE_KEY = "uq_user_reference"

    }
    private val LOGGER: Logger = LoggerFactory.getLogger(CreateUsersSpi::class.java.name)

    @Inject
    @field:Default
    lateinit var clientsRepository: ClientsRepository

    @Inject
    @field:Default
    lateinit var adminsRepository: AdminsRepository

    @Inject
    @field:Default
    lateinit var usersEntityMapper: UsersEntityMapper

    override fun addClient(user: CreateUserCommand) {
        val userEntity = usersEntityMapper.fromCreateUserToClient(user)
        try {
            LOGGER.info(userEntity.toString())
            clientsRepository.persist(userEntity)
            clientsRepository.flush()
        } catch (e: ConstraintViolationException) {
            LOGGER.error("Error while adding user : {}", e.message)
            LOGGER.error("Error while adding user : {}", e.constraintName)
            handleExceptions(e)
        }
    }

    override fun addAdmin(user: CreateUserCommand) {
        val userEntity = usersEntityMapper.fromCreateUserToAdmin(user)
        try {
            LOGGER.info(userEntity.toString())
            adminsRepository.persist(userEntity)
            adminsRepository.flush()
        } catch (e: ConstraintViolationException) {
            LOGGER.error("Error while adding admin : {}", e.message)
            LOGGER.error("Error while adding admin : {}", e.constraintName)
            handleExceptions(e)
        }
    }

    private fun handleExceptions(e:ConstraintViolationException):Throws {
        when {
            e.constraintName.equals(MAIL_KEY) -> {
                throw ApplicationException(ApplicationExceptionsEnum.CREATE_USER_DUPLICATE_MAIL)
            }
            e.constraintName.equals(PHONE_KEY) -> {
                throw ApplicationException(ApplicationExceptionsEnum.CREATE_USER_DUPLICATE_PHONE_NUMBER)
            }
            e.constraintName.equals(REFERENCE_KEY) -> {
                throw ApplicationException(ApplicationExceptionsEnum.CREATE_USER_DUPLICATE_REFERENCE)
            }
            else -> {
                throw ApplicationException(ApplicationExceptionsEnum.ERROR)
            }
        }
    }
}