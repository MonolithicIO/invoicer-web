package features.data.api.auth.model

import kotlinx.serialization.Serializable

@Serializable
data class LoginRequestData(
    val email: String,
    val password: String
)
