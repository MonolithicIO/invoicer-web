package features.data.impl.auth.repository

import features.data.api.auth.datasource.AuthDataSource
import features.data.api.auth.model.CreateAccountRequestData
import features.data.api.auth.model.LoginRequestData
import features.domain.api.auth.model.AuthTokenModel
import features.domain.api.auth.model.QrCodeModel
import features.domain.api.auth.repository.AuthRepository

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
            accessToken = response.accessToken
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
}