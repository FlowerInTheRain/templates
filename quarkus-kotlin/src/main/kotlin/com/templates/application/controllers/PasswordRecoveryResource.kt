package com.templates.application.controllers

import com.templates.application.dto.requests.InitPasswordRecoveryRequest
import com.templates.application.dto.requests.PasswordChangeRequest
import com.templates.application.dto.requests.PasswordRecoveryRequest
import com.templates.domain.ports.`in`.PasswordManagementIn
import jakarta.annotation.security.PermitAll
import jakarta.annotation.security.RolesAllowed
import jakarta.enterprise.context.RequestScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.PUT
import jakarta.ws.rs.Path
import jakarta.ws.rs.core.MediaType
import org.eclipse.microprofile.jwt.JsonWebToken
import org.jboss.resteasy.reactive.ResponseStatus
import org.jboss.resteasy.reactive.RestResponse.StatusCode.ACCEPTED
import org.jboss.resteasy.reactive.RestResponse.StatusCode.NO_CONTENT
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Path("/password-recovery")
@RequestScoped
class PasswordRecoveryResource {
    private val LOGGER: Logger = LoggerFactory.getLogger(PasswordRecoveryResource::class.java.name)

    @Inject
    @field:Default
    lateinit var passwordManagementIn: PasswordManagementIn
    @Inject
    @field:Default
    lateinit var jwt:JsonWebToken

    @PUT
    @Path("/init-reset")
    @Consumes(MediaType.APPLICATION_JSON)
    @ResponseStatus(NO_CONTENT)
    @PermitAll
    fun initiatePasswordReset(passwordRecoveryRequest: InitPasswordRecoveryRequest) {
        passwordManagementIn.initPasswordRecovery(passwordRecoveryRequest.identifier)
    }

    @PUT
    @Path("/reset-password")
    @Consumes(MediaType.APPLICATION_JSON)
    @ResponseStatus(NO_CONTENT)
    @PermitAll
    fun resetPassword(passwordRecoveryRequest: PasswordRecoveryRequest) {
        passwordManagementIn.recoverPassword(passwordRecoveryRequest.mail, passwordRecoveryRequest.token,
            passwordRecoveryRequest.password,
            passwordRecoveryRequest.passwordConfirmation)
    }

    @PUT
    @Path("/change-password")
    @Consumes(MediaType.APPLICATION_JSON)
    @ResponseStatus(NO_CONTENT)
    @RolesAllowed("CLIENT","ADMIN")
    fun changePassword(passwordChangeRequest: PasswordChangeRequest) {
        val mail = jwt.name
        passwordManagementIn.changePassword(mail, passwordChangeRequest.password, passwordChangeRequest.passwordConfirmation)
    }
}