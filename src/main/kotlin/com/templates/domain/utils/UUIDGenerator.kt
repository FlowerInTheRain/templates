import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.*

object UUIDGenerator {
    private val LOGGER: Logger = LoggerFactory.getLogger(UUIDGenerator::class.java.name)

    fun generateUUID(): UUID {
        LOGGER.info("Generating UUID reference.")
        val newRandomBusinessReference = UUID.randomUUID()
        LOGGER.info("UUID base Reference $newRandomBusinessReference Successfully generated.")
        return newRandomBusinessReference
    }
}