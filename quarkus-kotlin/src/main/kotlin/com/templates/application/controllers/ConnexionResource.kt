package com.templates.application.controllers

import com.templates.application.controllers.CookieUtils.setUpCookie
import com.templates.application.dto.requests.LoginRequest
import com.templates.application.mappers.UsersDtoMappers
import com.templates.domain.ports.`in`.LoginIn
import com.templates.domain.utils.UUIDGenerator.getNewUUID
import jakarta.annotation.security.PermitAll
import jakarta.annotation.security.RolesAllowed
import jakarta.enterprise.context.RequestScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.servlet.http.HttpSession
import jakarta.ws.rs.*
import jakarta.ws.rs.core.Context
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
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
    @Produces(MediaType.APPLICATION_JSON)
    @ResponseStatus(OK)
    @PermitAll
    fun clientLogin(loginRequest: LoginRequest): Response {
        val loggedIn = loginIn.clientLogin(loginRequest.identifier, loginRequest.password)
        val cookie = setUpCookie("Bearer", loggedIn.jwToken)
        LOG.info(String.format("Logging user %s", loginRequest.identifier))
       return  Response.ok(usersDtoMappers.toLoginResponse(loggedIn)).cookie(cookie).build()
    }

    @POST
    @Path("/login/admin")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @ResponseStatus(OK)
    @PermitAll
    fun adminLogin(loginRequest: LoginRequest): Response {
        val loggedIn = loginIn.adminLogin(loginRequest.identifier, loginRequest.password)
        val cookie = setUpCookie("Bearer", loggedIn.jwToken)
        LOG.info(String.format("Logging user %s", loginRequest.identifier))
        return  Response.ok(usersDtoMappers.toLoginResponse(loggedIn)).cookie(cookie).build()
    }

    @GET
    @Path("/logout")
    @RolesAllowed("CLIENT","ADMIN")
    fun logout(): Response {
        val cookie = setUpCookie("Bearer", "")
        return Response.ok("Logged out").cookie(cookie).build()
    }
}