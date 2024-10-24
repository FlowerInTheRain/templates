package org.acme

import com.templates.persistence.MyKotlinEntity
import io.quarkus.hibernate.orm.panache.PanacheRepository
import jakarta.enterprise.context.ApplicationScoped

@ApplicationScoped
class MyKotlinRepository : PanacheRepository<MyKotlinEntity?> {
    fun findByName(name: String?): MyKotlinEntity {
        return find("name", name).firstResult<MyKotlinEntity>()
    }

    fun findAllKotlinEntities(): MutableList<MyKotlinEntity?>? {
        return listAll()
    }
}