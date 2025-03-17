package features.domain.api.auth.repository

import features.domain.api.auth.model.AuthTokenModel
import features.domain.api.auth.model.QrCodeModel
import kotlinx.coroutines.flow.Flow

interface AuthRepository {
    suspend fun login(email: String, password: String): AuthTokenModel
    suspend fun createAccount(email: String, confirmEmail: String, password: String)
    suspend fun requestLoginQrCode(): QrCodeModel
    suspend fun listenQrCodeLogin(qrCodeContentId: String): Flow<AuthTokenModel>
}