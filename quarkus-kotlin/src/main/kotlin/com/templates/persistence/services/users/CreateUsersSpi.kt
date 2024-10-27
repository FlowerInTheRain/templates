package com.templates.persistence.services.users

import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.models.commands.users.CreateUserCommand
import com.templates.domain.ports.out.CreateUsersOut
import com.templates.persistence.mappers.users.UsersEntityMapper
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import com.templates.persistence.repositories.UsersRepository
import jakarta.enterprise.context.ApplicationScoped
import jakarta.transaction.Transactional
import org.hibernate.exception.ConstraintViolationException
import org.slf4j.Logger
import org.slf4j.LoggerFactory

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
    lateinit var usersRepository: UsersRepository

    @Inject
    @field:Default
    lateinit var usersEntityMapper: UsersEntityMapper

    @Transactional
    override fun addUser(user: CreateUserCommand) {
        val userEntity = usersEntityMapper.fromCreateUserToEntity(user)
        try {
            usersRepository.persist(userEntity)
            usersRepository.flush()
        } catch (e: ConstraintViolationException) {
            LOGGER.error("Error while adding user : {}", e.message)
            LOGGER.error("Error while adding user : {}", e.constraintName)

            if (e.constraintName.equals(MAIL_KEY)) {
                throw ApplicationException(ApplicationExceptionsEnum.CREATE_USER_DUPLICATE_MAIL)
            } else if (e.constraintName.equals(PHONE_KEY)) {
                throw ApplicationException(ApplicationExceptionsEnum.CREATE_USER_DUPLICATE_PHONE_NUMBER)
            } else if (e.constraintName.equals(REFERENCE_KEY)) {
                throw ApplicationException(ApplicationExceptionsEnum.CREATE_USER_DUPLICATE_REFERENCE)
            } else {
                throw ApplicationException(ApplicationExceptionsEnum.ERROR)
            }
        }
    }
}