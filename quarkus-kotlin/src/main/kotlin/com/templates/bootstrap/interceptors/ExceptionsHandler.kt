import com.templates.domain.errors.ApplicationException
import jakarta.ws.rs.core.Response
import jakarta.ws.rs.ext.ExceptionMapper
import jakarta.ws.rs.ext.Provider

@Provider
class ExceptionsHandler : ExceptionMapper<ApplicationException> {
    override fun toResponse(e: ApplicationException): Response {
        return Response.status(Response.Status.fromStatusCode(e.statusCode))
            .entity(e.message).build()
    }
}