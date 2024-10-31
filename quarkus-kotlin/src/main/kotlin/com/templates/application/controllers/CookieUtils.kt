package com.templates.application.controllers

import jakarta.ws.rs.core.NewCookie

object CookieUtils {
    fun setUpCookie(name:String, value:String) : NewCookie {
        return if (name == "Bearer" ) NewCookie(name, value, "/", null, null, 64800, true) else NewCookie(name, value,
        "/",
        null, null, 64800, false)
    }
}