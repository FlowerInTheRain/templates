package com.templates.bootstrap.interceptors

import io.quarkus.qute.Template
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import jakarta.ws.rs.NotFoundException
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
class NotFoundResource : ExceptionMapper<NotFoundException?> {
    @Inject
    @field: Default
    lateinit var error404: Template

    @Produces(MediaType.TEXT_HTML)
    override fun toResponse(exception: NotFoundException?): Response {
        return Response.ok(error404.render()).build()
    }
}