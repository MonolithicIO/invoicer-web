package features.data.api.auth.model

import kotlinx.serialization.Serializable

@Serializable
data class CreateAccountRequestData(
    val email: String,
    val confirmEmail: String,
    val password: String
)
