package features.domain.api.auth.model

import kotlinx.datetime.Instant


data class QrCodeModel(
    val base64Content: String,
    val rawContent: String,
    val expiration: Instant
)