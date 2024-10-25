package com.templates.persistence.services.users

import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.models.users.User
import com.templates.domain.ports.out.FindUserOut
import com.templates.persistence.mappers.users.UsersEntityMapper
import com.templates.persistence.repositories.UsersRepository
import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@ApplicationScoped
class FindUsersSpi:FindUserOut {
    private val LOGGER: Logger = LoggerFactory.getLogger(FindUsersSpi::class.java.name)

    @Inject
    @field:Default
    lateinit var usersRepository: UsersRepository

    @Inject
    @field:Default
    lateinit var usersEntityMapper: UsersEntityMapper

    override fun findByIdentifier(identifier: String): User {
        val userEntity = usersRepository.findByIdentifier(identifier).orElseThrow { ApplicationException(ApplicationExceptionsEnum.ERROR) }
        return usersEntityMapper.fromEntityToUser(userEntity)
    }
}