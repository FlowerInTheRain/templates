package com.templates.application.dto.requests

data class PasswordRecoveryRequest(val mail:String, val token:String, val password:String, val
passwordConfirmation:String)
