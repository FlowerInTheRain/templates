package com.templates.domain.ports.out

import java.sql.Timestamp


interface UpdateClientsOut {
    fun updateProfilePicture(mail: String, profilePictureUrl: String)
    fun approveAccount(mail: String)
    fun changeOtpCode(mail: String, newOtp: String, newOtpTimestamp: Timestamp,)
}