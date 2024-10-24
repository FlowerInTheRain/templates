package com.templates

import io.quarkus.test.junit.QuarkusTest
import io.restassured.RestAssured.given
import org.hamcrest.CoreMatchers.`is`
import org.junit.jupiter.api.Test

@QuarkusTest
class HealthCheckResourceTest {

    @Test
    fun testHelloEndpoint() {
        given()
            .`when`().get("/healthcheck")
            .then()
            .statusCode(200)
            .body(`is`("Application is up and running"))
    }

}