package com.templates.application.controllers

import com.templates.application.controllers.CookieUtils.setUpCookie
import com.templates.application.dto.requests.CreateAdminRequest
import com.templates.application.dto.requests.CreateUserRequest
import com.templates.application.mappers.UsersDtoMappers
import com.templates.domain.ports.`in`.CreateUsersIn
import jakarta.annotation.security.PermitAll
import jakarta.enterprise.context.RequestScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
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
    @Path("/clients")
    @Consumes(MediaType.APPLICATION_JSON)
    @ResponseStatus(CREATED)
    @PermitAll
    fun createClient(creationRequest: CreateUserRequest): Response {
        LOG.info("Creating client")
        val mappedRequest = usersDtoMappers.fromCreationRequest(creationRequest)
        LOG.info(String.format("Creating user %s %s", mappedRequest.firstName, mappedRequest.lastName))
        val userCreationInformations = createUsersIn.createUser(mappedRequest)
        val cookie = setUpCookie("Bearer", userCreationInformations.jwToken)
        return Response.ok(usersDtoMappers.toCreationResponse(userCreationInformations)).cookie(cookie).build()
    }

    @POST
    @Path("/admin")
    @Consumes(MediaType.APPLICATION_JSON)
    @ResponseStatus(CREATED)
    @PermitAll
    fun createAdmin(creationRequest: CreateAdminRequest): Response {
        val mappedRequest = usersDtoMappers.fromCreationRequest(creationRequest)
        LOG.info(String.format("Creating admin %s %s", mappedRequest.firstName, mappedRequest.lastName))
        val adminCode = creationRequest.adminCode
        val userCreationInformations = createUsersIn.createAdmin(mappedRequest, adminCode)
        val cookie = setUpCookie("Bearer", userCreationInformations.jwToken)
        return Response.ok(usersDtoMappers.toCreationResponse(userCreationInformations)).cookie(cookie).build()
    }
}