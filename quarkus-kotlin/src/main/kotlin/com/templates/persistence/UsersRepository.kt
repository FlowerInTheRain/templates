package org.acme

import com.templates.persistence.UsersEntity
import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped

@ApplicationScoped
class UsersRepository : PanacheRepository<UsersEntity?> {
    fun findByName(name: String?): UsersEntity {
        return find("name", name).firstResult<UsersEntity>()
    }

    fun findAllKotlinEntities(): MutableList<UsersEntity?>? {
        return listAll()
    }
}