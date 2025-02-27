package foundation.network

import io.ktor.client.*

interface HttpWrapper {
    val client: HttpClient
}