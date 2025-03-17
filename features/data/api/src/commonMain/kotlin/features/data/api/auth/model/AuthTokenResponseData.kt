package features.data.api.auth.model

import kotlinx.serialization.Serializable

@Serializable
data class AuthTokenResponseData(
    val token: String,
    val refreshToken: String
)
