package com.templates.persistence.services.users

import com.templates.domain.models.users.User
import com.templates.domain.ports.out.UpdateUserOut
import com.templates.persistence.mappers.users.UsersEntityMapper
import com.templates.persistence.repositories.UsersRepository
import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.transaction.Transactional

@ApplicationScoped
class UpdateUsersSpi:UpdateUserOut {
    @Inject
    @field:Default
    lateinit var usersRepository: UsersRepository

    @Inject
    @field:Default
    lateinit var usersEntityMapper: UsersEntityMapper
    @Transactional
    override fun updateUser(user: User) {
        usersRepository.persist(usersEntityMapper.fromUserToEntity(user))
        usersRepository.flush()
    }
}