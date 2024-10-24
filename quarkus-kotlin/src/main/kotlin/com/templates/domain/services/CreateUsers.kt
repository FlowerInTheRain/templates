package com.templates.domain.services

import UUIDGenerator
import com.password4j.Password
import com.petpals.shared.entities.uuid.UUIDFormatter
import com.templates.domain.models.commands.users.CreateUserCommand
import com.templates.domain.models.users.UserTypes
import com.templates.domain.ports.`in`.CreateUsersIn
import jakarta.enterprise.context.ApplicationScoped
import org.jboss.logging.Logger

@ApplicationScoped
class CreateUsers : CreateUsersIn {
    val LOG: Logger = Logger.getLogger(CreateUsers::class.java)

    override fun createUser(user: CreateUserCommand) {
        user.type = UserTypes.CLIENT.name
        user.reference = UUIDFormatter.formatUUIDSequence(UUIDGenerator.generateUUID(),true, "")
        val hash = Password.hash(user.password).addRandomSalt().withBcrypt()
        val salt = hash.salt
        user.password = hash.result
        LOG.info(user.toString())
        LOG.info(salt.toString())
        TODO("Not yet implemented")
    }
}