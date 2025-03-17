package features.data.impl.auth.repository

import features.data.api.auth.datasource.AuthDataSource
import features.data.api.auth.model.CreateAccountRequestData
import features.data.api.auth.model.LoginRequestData
import features.domain.api.auth.model.AuthTokenModel
import features.domain.api.auth.model.QrCodeModel
import features.domain.api.auth.repository.AuthRepository
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map

internal class AuthRepositoryImpl(
    private val dataSource: AuthDataSource
) : AuthRepository {
    override suspend fun login(
        email: String,
        password: String
    ): AuthTokenModel {
        val response = dataSource.login(
            requestData = LoginRequestData(
                email = email,
                password = password
            )
        )
        return AuthTokenModel(
            refreshToken = response.refreshToken,
            accessToken = response.token
        )
    }

    override suspend fun createAccount(email: String, confirmEmail: String, password: String) {
        return dataSource.craeteAccount(
            requestData = CreateAccountRequestData(
                email = email,
                confirmEmail = confirmEmail,
                password = password
            )
        )
    }

    override suspend fun requestLoginQrCode(): QrCodeModel {
        val response = dataSource.requestLoginQrCode()
        return QrCodeModel(
            base64Content = response.base64Content,
            rawContent = response.rawContent,
            expiration = response.expiration
        )
    }

    override suspend fun listenQrCodeLogin(qrCodeContentId: String): Flow<AuthTokenModel> {
        return dataSource.listenQrCodeSocket(
            contentId = qrCodeContentId
        ).map {
            AuthTokenModel(
                refreshToken = it.refreshToken,
                accessToken = it.token
            )
        }
    }
}