package com.templates.application.controllers

import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import org.jboss.resteasy.reactive.ResponseStatus
import org.jboss.resteasy.reactive.RestResponse.StatusCode.OK

@Path("/healthcheck")
class HealthCheckResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    @ResponseStatus(OK)
    fun healthCheck() = "Application is up and running"
}