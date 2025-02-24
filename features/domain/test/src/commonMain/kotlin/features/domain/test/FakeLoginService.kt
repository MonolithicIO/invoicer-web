package features.domain.test

import features.domain.api.auth.service.LoginService

class FakeLoginService : LoginService {
    override suspend fun login(email: String, password: String) = Unit
}