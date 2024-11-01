package com.templates.application.controllers

import jakarta.annotation.security.RolesAllowed
import jakarta.enterprise.context.RequestScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.core.MediaType
import org.eclipse.microprofile.jwt.JsonWebToken
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement
import org.jboss.logging.Logger
import org.jboss.resteasy.reactive.ResponseStatus
import org.jboss.resteasy.reactive.RestResponse.StatusCode.CREATED


@Path("/users-find")
@RequestScoped
class FindUsersResource {
    companion object {
        private val LOG: Logger = Logger.getLogger(FindUsersResource::class.java)
    }

    @Inject
    @field:Default
    private lateinit var jwt: JsonWebToken

    @GET
    @Path("/me")
    @Consumes(MediaType.APPLICATION_JSON)
    @ResponseStatus(CREATED)
    @RolesAllowed("CLIENT")
    @SecurityRequirement(name = "bearer")
    fun getMe() {
        val userMail = jwt.name
        LOG.info(userMail)
    }
}