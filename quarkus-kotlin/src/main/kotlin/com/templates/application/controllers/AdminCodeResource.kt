package com.templates.application.controllers

import com.templates.domain.ports.`in`.AdminCodeIn
import jakarta.annotation.security.PermitAll
import jakarta.enterprise.context.RequestScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import org.jboss.resteasy.reactive.ResponseStatus
import org.jboss.resteasy.reactive.RestResponse.StatusCode.OK

@Path("/admin-code")
@RequestScoped
class AdminCodeResource {
    @Inject
    @field:Default
    lateinit var adminCodeIn: AdminCodeIn

    @GET
    @ResponseStatus(OK)
    @PermitAll
    fun createAdmin(): String {
        return adminCodeIn.getCurrentCode()
    }
}