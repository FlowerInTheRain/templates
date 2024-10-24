package com.templates.bootstrap.configuration;

import com.azure.identity.ClientSecretCredentialBuilder
import com.azure.security.keyvault.secrets.SecretClientBuilder
import io.smallrye.config.ConfigSourceContext
import io.smallrye.config.ConfigSourceFactory
import io.smallrye.config.PropertiesConfigSource
import org.eclipse.microprofile.config.spi.ConfigSource
import java.util.*

class AzureConfigSourceFactory : ConfigSourceFactory {
	companion object {
		private const val API_KEY = "api.key"
	}

	override fun getConfigSources(context: ConfigSourceContext): Iterable<ConfigSource> {
		val caregiversApiKey = context.getValue(API_KEY)
		val conf = mutableMapOf<String, String>()

		if (caregiversApiKey == null || caregiversApiKey.value == null) {
			val clientId = context.getValue("azure.clientid")?.value
			val tenantId = context.getValue("azure.tenantid")?.value
			val secret = context.getValue("azure.tenant.token")?.value
			val vaultUrl = context.getValue("azure.vault.url")?.value

			if (clientId != null && tenantId != null && secret != null && vaultUrl != null) {
				val secretClient = SecretClientBuilder()
					.vaultUrl(vaultUrl)
					.credential(
						ClientSecretCredentialBuilder()
							.tenantId(tenantId)
							.clientSecret(secret)
							.clientId(clientId)
							.build()
					)
					.buildClient()

				conf[API_KEY] = secretClient.getSecret("API-KEY").value
			}

			return listOf(PropertiesConfigSource(conf, null, priority))
		}

		conf[API_KEY] = caregiversApiKey.value
		return listOf(PropertiesConfigSource(conf, caregiversApiKey.sourceName, priority))
	}

	override fun getPriority(): OptionalInt {
		return OptionalInt.of(275)
	}

	private val priority: Int
		get() = getPriority().asInt
}