package com.templates.application.controllers

import jakarta.annotation.security.PermitAll
import jakarta.annotation.security.RolesAllowed
import jakarta.enterprise.context.RequestScoped
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement
import org.jboss.resteasy.reactive.ResponseStatus
import org.jboss.resteasy.reactive.RestResponse.StatusCode.OK

@Path("/healthcheck")
@RequestScoped
class HealthCheckResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @ResponseStatus(OK)
    @PermitAll
    fun healthCheck() = "Application is up and running"

    @GET
    @Path("/secured")
    @Produces(MediaType.TEXT_PLAIN)
    @ResponseStatus(OK)
    @RolesAllowed( "CLIENT","ADMIN" )
    @SecurityRequirement(name = "bearer")
    fun healthCheckNotAllowed() = "Hahaha"
}