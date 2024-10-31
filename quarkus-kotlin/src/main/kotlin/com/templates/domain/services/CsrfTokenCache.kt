package com.templates.domain.services

import com.sun.jna.platform.unix.solaris.LibKstat.KstatNamed.UNION.STR
import io.quarkus.cache.Cache
import io.quarkus.cache.CacheName
import io.quarkus.cache.CaffeineCache
import jakarta.enterprise.context.ApplicationScoped
import java.util.concurrent.CompletableFuture


@ApplicationScoped
class CsrfTokenCache {

    @CacheName("csrf-token-cache")
    lateinit var cache: Cache
    // Method to add or update an item in the cache
    fun addItem(id: String, token: String) {
        cache.`as`(CaffeineCache::class.java).put(id, CompletableFuture.completedFuture(token))
    }

    fun getUserToken(key: String): String {
        return cache.`as`(CaffeineCache::class.java).getIfPresent<String>(key).get()
    }
}