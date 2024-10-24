package com.petpals.shared.entities.uuid

import jakarta.validation.constraints.NotNull
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.*

object UUIDFormatter {
    private val LOGGER: Logger = LoggerFactory.getLogger(UUIDFormatter::class.java.name)
    fun formatUUIDSequence(uuidToFormat: UUID?, withUnionTrailRemoval: Boolean, joiner: @NotNull String?): String {
        requireNotNull(uuidToFormat) { "UUID can not be null" }
        LOGGER.info(
            "Formatting UUIDSequence. UUID : $uuidToFormat" + " SplitOption : " + if (withUnionTrailRemoval) "true" else "false" + " Joiner : " + joiner.toString()
        )
        return java.lang.String.join(
            joiner,
            *uuidToFormat.toString().split("-".toRegex()).dropLastWhile { it.isEmpty() }
                .toTypedArray())
    }
}