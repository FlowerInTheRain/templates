package com.templates.domain.utils

import jakarta.validation.constraints.NotNull
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.*

object UUIDFormatter {
    private val LOGGER: Logger = LoggerFactory.getLogger(UUIDFormatter::class.java.name)
    fun formatUUIDSequence(uuidToFormat: UUID?, joiner: @NotNull String?): String {
        requireNotNull(uuidToFormat) { "UUID can not be null" }
        LOGGER.info("Formatting UUIDSequence.")
        return java.lang.String.join(
            joiner,
            *uuidToFormat.toString().split("-".toRegex()).dropLastWhile { it.isEmpty() }
                .toTypedArray())
    }
}