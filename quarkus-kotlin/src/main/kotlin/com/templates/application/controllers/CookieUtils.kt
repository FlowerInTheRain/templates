package com.templates.application.controllers

import jakarta.ws.rs.core.NewCookie

object CookieUtils {
    fun setUpCookie(name:String, value:String) : NewCookie {
        return NewCookie(name, value, "/", null, null, 3600, false)
    }
}