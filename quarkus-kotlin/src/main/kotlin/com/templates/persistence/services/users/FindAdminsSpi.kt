package com.templates.persistence.services.users

import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.models.users.User
import com.templates.domain.ports.out.FindAdminsOut
import com.templates.persistence.mappers.users.UsersEntityMapper
import com.templates.persistence.repositories.AdminsRepository
import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@ApplicationScoped
class FindAdminsSpi : FindAdminsOut{
    companion object{
        private val LOGGER: Logger = LoggerFactory.getLogger(FindClientsSpi::class.java.name)
    }

    @Inject
    @field:Default
    private lateinit var adminsRepository: AdminsRepository

    @Inject
    @field:Default
    private lateinit var usersEntityMapper: UsersEntityMapper

    override fun findByIdentifier(identifier: String): User {
        val clientFromDb = adminsRepository.findByIdentifier(identifier).orElseThrow { ApplicationException(
            ApplicationExceptionsEnum.LOGIN_USER_NOT_FOUND) }
        LOGGER.info(clientFromDb.toString())
        val user = usersEntityMapper.fromAdminToUser(clientFromDb)
        LOGGER.info(user.toString())
        return user
    }
}