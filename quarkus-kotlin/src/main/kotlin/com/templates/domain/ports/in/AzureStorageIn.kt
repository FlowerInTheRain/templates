package com.templates.domain.ports.`in`

import org.jboss.resteasy.reactive.multipart.FileUpload


interface AzureStorageIn {
    fun updateProfilePicture(mail: String, file: FileUpload):String
    fun createContainerForUser(phoneNumber:String)
}