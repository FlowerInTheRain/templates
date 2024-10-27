import com.templates.application.dto.responses.ErrorResponse
import com.templates.domain.errors.ApplicationException
import jakarta.ws.rs.Produces
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider
import java.awt.PageAttributes

@Provider
class ApplicationExceptionsHandler : ExceptionMapper<ApplicationException> {
    override fun toResponse(e: ApplicationException): Response {
        val errorResponse = ErrorResponse(e.origin, e.message)
        return Response.status(Response.Status.fromStatusCode(e.statusCode))
            .entity(errorResponse).build()
    }
}