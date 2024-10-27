package com.templates.domain.ports.out

import java.sql.Timestamp


interface UpdateUserOut {
    fun updateUserProfilePicture(mail: String, profilePictureUrl: String)
    fun approveUserAccount(mail: String)
    fun putNewOtpCode(mail: String, newOtp: String, newOtpTimestamp: Timestamp,)

}