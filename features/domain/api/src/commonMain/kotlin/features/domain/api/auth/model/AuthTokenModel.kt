package features.domain.api.auth.model

data class AuthTokenModel(
    val refreshToken: String,
    val accessToken: String,
)
