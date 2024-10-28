package com.templates.persistence.repositories

import com.templates.persistence.entities.AdminsEntity
import com.templates.persistence.entities.UsersEntity
import io.quarkus.hibernate.orm.panache.PanacheRepository
import io.quarkus.panache.common.Parameters
import jakarta.enterprise.context.ApplicationScoped
import java.util.*

@ApplicationScoped
class AdminsRepository : PanacheRepository<AdminsEntity?> {
    fun findByName(name: String?): UsersEntity {
        return find("name", name).firstResult<AdminsEntity>()
    }

    fun findAllKotlinEntities(): MutableList<AdminsEntity?>? {
        return listAll()
    }

    fun findByIdentifier(identifier: String): Optional<AdminsEntity> {
        return find("SELECT u from AdminsEntity u WHERE (u.mail =:mail OR u.phoneNumber = :phoneNumber)", Parameters
            .with
                ("mail", identifier).and("phoneNumber", identifier))
            .firstResultOptional<AdminsEntity>()

    }
}