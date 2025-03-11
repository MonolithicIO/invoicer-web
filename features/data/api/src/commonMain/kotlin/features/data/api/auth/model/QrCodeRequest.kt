package features.data.api.auth.model

import kotlinx.serialization.Serializable

@Serializable
data class QrCodeRequest(
    val size: Int
)
