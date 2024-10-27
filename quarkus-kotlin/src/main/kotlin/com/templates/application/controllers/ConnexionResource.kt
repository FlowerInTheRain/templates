package com.templates.application.controllers

import com.templates.application.dto.requests.LoginRequest
import com.templates.application.dto.responses.UserLoginResponse
import com.templates.application.mappers.UsersDtoMappers
import com.templates.domain.ports.`in`.LoginIn
import jakarta.annotation.security.PermitAll
import jakarta.enterprise.context.RequestScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.POST
import jakarta.ws.rs.Path
import jakarta.ws.rs.core.MediaType
import org.jboss.logging.Logger
import org.jboss.resteasy.reactive.ResponseStatus
import org.jboss.resteasy.reactive.RestResponse.StatusCode.OK

@Path("/connection")
@RequestScoped
class ConnexionResource {
    private val LOG: Logger = Logger.getLogger(ConnexionResource::class.java)

    @Inject
    @field:Default
    lateinit var loginIn: LoginIn
    @Inject
    @field:Default
    lateinit var usersDtoMappers: UsersDtoMappers

    @POST
    @Path("/login/client")
    @Consumes(MediaType.APPLICATION_JSON)
    @ResponseStatus(OK)
    @PermitAll
    fun clientLogin(loginRequest: LoginRequest): UserLoginResponse {
        val loggedIn = loginIn.clientLogin(loginRequest.identifier, loginRequest.password)
        LOG.info(String.format("Logging user %s", loginRequest.identifier))
       return  usersDtoMappers.toLoginResponse(loggedIn)
    }
}