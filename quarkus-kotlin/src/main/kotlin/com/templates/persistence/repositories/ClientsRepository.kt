package com.templates.persistence.repositories

import com.templates.persistence.entities.ClientsEntity
import com.templates.persistence.entities.UsersEntity
import io.quarkus.hibernate.orm.panache.PanacheRepository
import io.quarkus.panache.common.Parameters
import jakarta.enterprise.context.ApplicationScoped
import java.util.*

@ApplicationScoped
class ClientsRepository : PanacheRepository<ClientsEntity?> {
    fun findByName(name: String?): UsersEntity {
        return find("name", name).firstResult<ClientsEntity>()
    }

    fun findAllKotlinEntities(): MutableList<ClientsEntity?>? {
        return listAll()
    }

    fun findByIdentifier(identifier: String): Optional<ClientsEntity> {
        return find("SELECT u from ClientsEntity u WHERE (u.mail =:mail OR u.phoneNumber = :phoneNumber)", Parameters
            .with
            ("mail", identifier).and("phoneNumber", identifier))
            .firstResultOptional<ClientsEntity>()

    }
}