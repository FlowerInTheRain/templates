package com.templates.application.controllers

import com.templates.application.dto.requests.CreateUserRequest
import com.templates.application.dto.responses.CreateUserResponse
import com.templates.application.mappers.UsersDtoMappers
import com.templates.domain.ports.`in`.CreateUsersIn
import jakarta.annotation.security.PermitAll
import jakarta.enterprise.context.RequestScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import org.jboss.logging.Logger
import org.jboss.resteasy.reactive.ResponseStatus
import org.jboss.resteasy.reactive.RestResponse.StatusCode.CREATED

@Path("/users-create")
@RequestScoped
class CreateUsersResource {
    private val LOG: Logger = Logger.getLogger(CreateUsersResource::class.java)

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
    @PermitAll
    fun createUser(creationRequest: CreateUserRequest): CreateUserResponse {
        val mappedRequest = usersDtoMappers.fromCreationRequest(creationRequest)
        LOG.info(String.format("Creating user %s %s", mappedRequest.firstName, mappedRequest.lastName))
        val userCreationInformations = createUsersIn.createUser(mappedRequest)
        return usersDtoMappers.toCreationResponse(userCreationInformations)
    }
}