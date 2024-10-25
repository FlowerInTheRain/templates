package com.templates.application.dto.requests

import kotlinx.serialization.Serializable
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType
import org.eclipse.microprofile.openapi.annotations.media.Schema
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter
import org.jboss.resteasy.reactive.RestForm
import org.jboss.resteasy.reactive.multipart.FileUpload


@Serializable
data class ProfilePictureRequest(
                                 @Parameter(name = "image") @RestForm("image") val image: FileUpload
)
