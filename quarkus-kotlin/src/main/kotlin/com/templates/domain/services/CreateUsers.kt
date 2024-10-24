package com.templates.domain.services

import UUIDGenerator.getNewUUID
import com.password4j.Hash
import com.password4j.Password
import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
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
        user.reference = getNewUUID()
        val preHashPW = user.password
        val hash = hashWithBCrypt(preHashPW)
        user.password = hash.result
        if(Password.check(preHashPW, hash.result).withBcrypt()){
            LOG.info("Successfully hashed PW")
        } else {
            throw ApplicationException(ApplicationExceptionsEnum.ERROR_VALIDATING_PASSWORD_HASH)
        }
        TODO("Not yet implemented")
    }

    fun hashWithBCrypt(password: String): Hash {
        return Password.hash(password).withBcrypt()
    }

}