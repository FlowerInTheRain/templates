package com.templates.application.controllers

import com.templates.application.controllers.CookieUtils.setUpCookie
import com.templates.domain.ports.`in`.AdminCodeIn
import com.templates.domain.ports.`in`.CsrfTokenGeneratorIn
import jakarta.annotation.security.PermitAll
import jakarta.annotation.security.RolesAllowed
import jakarta.enterprise.context.RequestScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.ws.rs.GET
import jakarta.ws.rs.Path
import jakarta.ws.rs.core.Response
import org.eclipse.microprofile.config.inject.ConfigProperty
import org.eclipse.microprofile.jwt.JsonWebToken
import org.eclipse.microprofile.openapi.annotations.media.Content
import org.eclipse.microprofile.openapi.annotations.media.Schema
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses
import org.jboss.resteasy.reactive.ResponseStatus
import org.jboss.resteasy.reactive.RestResponse.StatusCode.OK

@Path("/admin-code")
@RequestScoped
class AdminCodeResource {
    @Inject
    @field:Default
    private lateinit var adminCodeIn: AdminCodeIn

    @Inject
    @field:Default
    private lateinit var jwt: JsonWebToken

    @Inject
    @field:Default
    private lateinit var csrfTokenGeneratorIn: CsrfTokenGeneratorIn

    @field:ConfigProperty(name="quarkus.rest-csrf.cookie-name")
    private lateinit var csrfCookieName: String


    @GET
    @ResponseStatus(OK)
    @RolesAllowed("ADMIN")
    @APIResponses(
        APIResponse(responseCode = "200", description = "OK", content = [Content(mediaType = "text/plain",
            schema = Schema(implementation = String::class))]),
    )
    fun createAdmin(): Response {
        val mail = jwt.name
        val csrfToken = csrfTokenGeneratorIn.generateToken(mail)
        val csrfCookie = setUpCookie(csrfCookieName, csrfToken)
        return Response.ok(adminCodeIn.getCurrentCode()).cookie(csrfCookie).build()
    }
}