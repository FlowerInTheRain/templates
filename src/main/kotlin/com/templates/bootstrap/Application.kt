package com.templates.bootstrap.quarkusapp

import io.quarkus.runtime.Quarkus
import io.quarkus.runtime.annotations.QuarkusMain

@QuarkusMain
object Application {
    @JvmStatic
    fun main(args: Array<String>) {
        Quarkus.run(*args)
    }
}