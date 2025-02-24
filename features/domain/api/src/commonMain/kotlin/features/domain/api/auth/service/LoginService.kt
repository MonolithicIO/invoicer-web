package features.domain.api.auth.service

interface LoginService {
    suspend fun login(email: String, password: String)
}