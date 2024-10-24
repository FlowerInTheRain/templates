package com.templates.application.controllers

import com.templates.application.dto.requests.UserCreationRequest
import com.templates.application.mappers.UsersDtoMappers
import com.templates.bootstrap.persistence.DatasourceConfigurator
import com.templates.domain.ports.`in`.CreateUsersIn
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import org.jboss.logging.Logger
import org.jboss.resteasy.reactive.ResponseStatus
import org.jboss.resteasy.reactive.RestResponse.StatusCode.CREATED

@Path("/users-create")
class CreateUsersResource {
    private val LOG: Logger = Logger.getLogger(DatasourceConfigurator::class.java)

    @Inject
    @field: Default
    lateinit var createUsersIn: CreateUsersIn
    @Inject
    @field: Default
    lateinit var usersDtoMappers: UsersDtoMappers
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @ResponseStatus(CREATED)
    fun createUser(creationRequest: UserCreationRequest) {
        val mappedRequest = usersDtoMappers.fromCreationRequest(creationRequest)
        LOG.info(mappedRequest.toString())
        createUsersIn.createUser(mappedRequest)
    }
}