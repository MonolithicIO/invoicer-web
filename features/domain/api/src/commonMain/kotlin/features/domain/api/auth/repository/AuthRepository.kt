package features.domain.api.auth.repository

import features.domain.api.auth.model.AuthTokenModel

interface AuthRepository {
    suspend fun login(email: String, password: String): AuthTokenModel
    suspend fun createAccount(email: String, confirmEmail: String, password: String)
}