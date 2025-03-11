package features.data.api.auth.model

import kotlinx.datetime.Instant
import kotlinx.serialization.Serializable

@Serializable
data class QrCodeResponse(
    val base64Content: String,
    val rawContent: String,
    val expiration: Instant
)
