package com.templates.application.controllers

import com.templates.application.dto.responses.UpdateProfilePictureResponse
import com.templates.domain.ports.`in`.AzureStorageIn
import jakarta.annotation.security.RolesAllowed
import jakarta.enterprise.context.RequestScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.ws.rs.Consumes
import jakarta.ws.rs.PUT
import jakarta.ws.rs.Path
import jakarta.ws.rs.core.MediaType
import org.eclipse.microprofile.jwt.JsonWebToken
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType
import org.eclipse.microprofile.openapi.annotations.media.Schema
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement
import org.jboss.resteasy.reactive.ResponseStatus
import org.jboss.resteasy.reactive.RestForm
import org.jboss.resteasy.reactive.RestResponse.StatusCode.ACCEPTED
import org.jboss.resteasy.reactive.multipart.FileUpload
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Path("/profile-pictures")
@RequestScoped
class ProfilePicturesResource {
    private val LOGGER: Logger = LoggerFactory.getLogger(ProfilePicturesResource::class.java.name)

    @Inject
    @field:Default
    lateinit var jwt: JsonWebToken
    @Inject
    @field:Default
    lateinit var azureStorageIn: AzureStorageIn

    @PUT
    @Path("/update-profile-picture/{phoneNumber}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    @ResponseStatus(ACCEPTED)
    @RolesAllowed("CLIENT","ADMIN")
    @SecurityRequirement(name = "bearer")
    fun updateClientProfilePicture(phoneNumber:String, @Schema(type = SchemaType.STRING,
    format = "binary") @RestForm
        ("image")  image:
                                    FileUpload
    ): UpdateProfilePictureResponse {
        LOGGER.info(image.fileName())
        val userMail = jwt.name
        return UpdateProfilePictureResponse(azureStorageIn.updateProfilePicture(userMail, phoneNumber, image))
    }
}