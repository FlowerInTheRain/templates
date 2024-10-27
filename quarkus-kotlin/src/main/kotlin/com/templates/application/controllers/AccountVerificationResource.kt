package com.templates.application.controllers

import com.templates.application.dto.requests.LoginRequest
import com.templates.application.dto.requests.OtpRequest
import com.templates.application.dto.responses.UserLoginResponse
import com.templates.application.mappers.UsersDtoMappers
import com.templates.domain.ports.`in`.LoginIn
import com.templates.domain.ports.`in`.VerifyAccountsIn
import jakarta.annotation.security.PermitAll
import jakarta.annotation.security.RolesAllowed
import jakarta.enterprise.context.RequestScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.POST
import jakarta.ws.rs.PUT
import jakarta.ws.rs.Path
import jakarta.ws.rs.core.MediaType
import org.eclipse.microprofile.jwt.JsonWebToken
import org.jboss.logging.Logger
import org.jboss.resteasy.reactive.ResponseStatus
import org.jboss.resteasy.reactive.RestResponse.StatusCode.OK

@Path("/verify-account")
@RequestScoped
class AccountVerificationResource {
    private val LOG: Logger = Logger.getLogger(AccountVerificationResource::class.java)

    @Inject
    @field:Default
    lateinit var verifyAccountsIn: VerifyAccountsIn
    @Inject
    @field:Default
    lateinit var jwt: JsonWebToken

    @PUT
    @Path("/client")
    @Consumes(MediaType.APPLICATION_JSON)
    @ResponseStatus(OK)
    @RolesAllowed("CLIENT")
    fun clientLogin(otpRequest: OtpRequest) {
        val mail = jwt.name
        verifyAccountsIn.verifyClientAccount(mail, otpRequest.otpCode)
    }

    @PUT
    @Path("/new-otp")
    @Consumes(MediaType.APPLICATION_JSON)
    @ResponseStatus(OK)
    @RolesAllowed("CLIENT")
    fun generateNewOtpCode() {
        val mail = jwt.name
        verifyAccountsIn.generateNewOtpCode(mail)
    }
}