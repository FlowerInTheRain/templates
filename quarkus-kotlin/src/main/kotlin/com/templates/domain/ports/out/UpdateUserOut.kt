package com.templates.domain.ports.out


interface UpdateUserOut {
    fun updateUserProfilePicture(mail: String, profilePictureUrl: String)
}