package com.templates.domain.models

class User(
    var id: Long,
    var firstName: String,
    var lastName: String,
    var email: String,
    var password: String,
    var reference:String,
    var type:String,
    var phoneNumber:String
) {
}