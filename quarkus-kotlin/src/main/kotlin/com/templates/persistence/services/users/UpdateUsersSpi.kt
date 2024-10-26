package com.templates.persistence.services.users

import com.templates.bootstrap.persistence.DatasourceConfigurator
import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.models.users.User
import com.templates.domain.ports.out.UpdateUserOut
import com.templates.persistence.entities.UsersEntity
import com.templates.persistence.mappers.users.UsersEntityMapper
import com.templates.persistence.repositories.UsersRepository
import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.persistence.LockModeType
import jakarta.transaction.Transactional
import org.jboss.logging.Logger

@ApplicationScoped
class UpdateUsersSpi:UpdateUserOut {
    val LOG: Logger = Logger.getLogger(UpdateUsersSpi::class.java)

    @Inject
    @field:Default
    lateinit var usersRepository: UsersRepository

    @Transactional
    override fun updateUserProfilePicture(mail: String, profilePictureUrl:String) {
        val inDb = usersRepository.find("mail", mail).withLock<UsersEntity>( LockModeType.PESSIMISTIC_READ)
            .firstResult<UsersEntity>()
        if (inDb != null) {
            inDb.profilePicture = profilePictureUrl
        } else {
            throw ApplicationException(ApplicationExceptionsEnum.ERROR)
        }
        LOG.info(String.format("User %s was updated", inDb.reference))
    }
}