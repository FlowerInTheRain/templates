package com.templates.application.controllers

import jakarta.enterprise.context.ApplicationScoped
import jakarta.ws.rs.core.NewCookie
import io.quarkus.logging.Log

@ApplicationScoped
class CookieUtils {
    fun setUpCookie(name:String, value:String) : NewCookie {
        Log.info("ouaiouai")
        return if (name == "Bearer" ) NewCookie(name, value, "/", null, null, 64800, true) else NewCookie(name, value,
        "/",
        null, null, 64800, false)
    }
}