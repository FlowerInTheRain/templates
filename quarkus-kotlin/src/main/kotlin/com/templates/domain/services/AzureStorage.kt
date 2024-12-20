package com.templates.domain.services

import com.azure.identity.ClientSecretCredentialBuilder
import com.azure.storage.blob.BlobClient
import com.azure.storage.blob.BlobContainerClient
import com.azure.storage.blob.BlobServiceClient
import com.azure.storage.blob.BlobServiceClientBuilder
import com.azure.storage.blob.models.PublicAccessType
import com.templates.domain.errors.ApplicationException
import com.templates.domain.errors.ApplicationExceptionsEnum
import com.templates.domain.ports.`in`.AzureStorageIn
import com.templates.domain.ports.out.UpdateAdminsOut
import com.templates.domain.ports.out.UpdateClientsOut
import jakarta.annotation.PostConstruct
import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import org.eclipse.microprofile.config.inject.ConfigProperty
import org.jboss.resteasy.reactive.multipart.FileUpload
import io.quarkus.logging.Log;


@ApplicationScoped
class AzureStorage : AzureStorageIn {
    companion object {
        const val FORMATTER: String = "user-%s"
    }


    @field:ConfigProperty(name = "azure.client-id")
    private lateinit var clientId: String

    @field:ConfigProperty(name = "azure.tenant-id")
    private lateinit var tenantId: String

    @field:ConfigProperty(name = "azure.tenant.token")
    private lateinit var clientSecret: String

    @field:ConfigProperty(name = "azure.store.endpoint")
    private lateinit var endpoint: String

    @Inject
    @field:Default
    private lateinit var updateClientsOut: UpdateClientsOut

    @Inject
    @field:Default
    private lateinit var updateAdminsOut: UpdateAdminsOut

    var blobServiceClient: BlobServiceClient? = null

    @PostConstruct
    fun init() {
        blobServiceClient = BlobServiceClientBuilder()
            .endpoint(endpoint)
            .credential(
                ClientSecretCredentialBuilder()
                    .tenantId(tenantId)
                    .clientId(clientId)
                    .clientSecret(clientSecret).build()
            )
            .buildClient()
    }

    override fun updateProfilePicture(mail: String, role:String, phoneNumber:String, file: FileUpload): String {
        val containerName = String.format(FORMATTER, phoneNumber)
        val fileName = "profile-picture${file.name().substringAfterLast(".")}"
        try {
            val containerClient: BlobContainerClient = blobServiceClient!!.getBlobContainerClient(containerName)
            containerClient.listBlobs().forEach{ blob ->
                containerClient.getBlobClient(blob.name).delete()
            }
            val client: BlobClient = containerClient.getBlobClient(fileName)
            client.uploadFromFile(
                file.filePath().toString()
            )
            val profilePictureUrl = client.blobUrl
            if(role == "CLIENT"){
                updateClientsOut.updateProfilePicture(mail, profilePictureUrl)
            } else {
                updateAdminsOut.updateProfilePicture(mail, profilePictureUrl)
            }
            Log.info("Profile picture updated : $profilePictureUrl")
            return profilePictureUrl
        } catch (e: Exception) {
            Log.debug(e.toString())
            throw ApplicationException(ApplicationExceptionsEnum.ERROR)
        }
    }

    override fun createContainerForUser(phoneNumber: String) {
        val containerName = String.format(FORMATTER, phoneNumber)
        try {
            blobServiceClient!!.createBlobContainer(containerName)
            val blobServiceCLient = blobServiceClient!!.getBlobContainerClient(containerName)
            blobServiceCLient.setAccessPolicy(PublicAccessType.BLOB, null)
        } catch (e: Exception) {
            Log.debug(e.message)
            throw ApplicationException(ApplicationExceptionsEnum.ERROR)
        }
    }

}