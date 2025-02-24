package features.data.impl.auth.datasource

import features.data.api.auth.datasource.AuthDataSource
import features.data.api.auth.model.AuthTokenResponseData
import features.data.api.auth.model.CreateAccountRequestData
import features.data.api.auth.model.LoginRequestData

internal class AuthDataSourceImpl: AuthDataSource {
    override suspend fun login(requestData: LoginRequestData): AuthTokenResponseData {
        TODO("Not yet implemented")
    }

    override suspend fun craeteAccount(requestData: CreateAccountRequestData) {
        TODO("Not yet implemented")
    }
}