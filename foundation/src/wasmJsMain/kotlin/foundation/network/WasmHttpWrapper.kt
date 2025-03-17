package foundation.network

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.js.*
import io.ktor.client.plugins.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.plugins.websocket.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.json.Json

internal class WasmHttpWrapper() : HttpWrapper {

    private val json by lazy {
        Json {
            ignoreUnknownKeys = true
            prettyPrint = true
        }
    }

    override val client: HttpClient = HttpClient(Js) {
        expectSuccess = true

        install(ContentNegotiation) {
            json(json)
        }

        install(WebSockets) {
            contentConverter = KotlinxWebsocketSerializationConverter(json)
        }

        HttpResponseValidator {
            handleResponseExceptionWithRequest { cause, _ ->
                when (cause) {
                    is ClientRequestException -> throwClientError(cause)

                    is ServerResponseException -> {
                        throw HttpException(
                            message = cause.message,
                            timeStamp = cause.response.responseTime.toString(),
                            errorCode = cause.response.status.value
                        )
                    }

                    else -> return@handleResponseExceptionWithRequest
                }
            }
        }

        defaultRequest {
            contentType(ContentType.Application.Json)
            url("http://localhost:4000")
        }
    }
}

private suspend fun throwClientError(cause: ClientRequestException): Nothing {
    val exception = runCatching {
        cause.response.body<HttpError>()
    }.fold(
        onSuccess = {
            HttpException(
                message = it.message,
                timeStamp = it.timeStamp,
                errorCode = it.errorCode
            )
        },
        onFailure = { it }
    )
    throw exception
}