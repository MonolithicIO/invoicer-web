package features.data.api.auth.model

import kotlinx.serialization.Serializable

@Serializable
data class AuthTokenResponseData(
    val accessToken: String,
    val refreshToken: String
)
