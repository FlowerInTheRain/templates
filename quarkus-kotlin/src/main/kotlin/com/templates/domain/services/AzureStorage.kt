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
import com.templates.domain.ports.out.UpdateClientsOut
import jakarta.annotation.PostConstruct
import jakarta.enterprise.context.ApplicationScoped
import jakarta.enterprise.inject.Default
import jakarta.inject.Inject
import org.eclipse.microprofile.config.inject.ConfigProperty
import org.jboss.resteasy.reactive.multipart.FileUpload
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@ApplicationScoped
class AzureStorage : AzureStorageIn {
    companion object {
        const val FORMATTER: String = "user-%s"
    }

    private val LOGGER: Logger = LoggerFactory.getLogger(AzureStorage::class.java.name)

    @field:ConfigProperty(name = "azure.client-id")
    lateinit var clientId: String

    @field:ConfigProperty(name = "azure.tenant-id")
    lateinit var tenantId: String

    @field:ConfigProperty(name = "azure.tenant.token")
    lateinit var clientSecret: String

    @field:ConfigProperty(name = "azure.store.endpoint")
    lateinit var endpoint: String

    @Inject
    @field:Default
    lateinit var updateClientsOut: UpdateClientsOut

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

    override fun updateProfilePicture(mail: String, phoneNumber:String, file: FileUpload): String {
        val containerName = String.format(FORMATTER, phoneNumber)
        val fileName: String = file.fileName()
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
            updateClientsOut.updateProfilePicture(mail, profilePictureUrl)
            LOGGER.info("Profile picture updated : $profilePictureUrl")
            return profilePictureUrl
        } catch (e: Exception) {
            LOGGER.info(e.toString())
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
            LOGGER.info(e.message)
            throw ApplicationException(ApplicationExceptionsEnum.ERROR)
        }
    }

}