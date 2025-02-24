package features.domain.impl.auth.services

import features.domain.api.auth.repository.AuthRepository
import features.domain.api.auth.service.LoginService

internal class LoginServiceImpl(
    private val authRepository: AuthRepository
) : LoginService {
    override suspend fun login(email: String, password: String) {
        TODO("Not yet implemented")
    }
}