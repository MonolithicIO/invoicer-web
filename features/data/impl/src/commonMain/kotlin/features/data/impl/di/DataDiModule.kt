package features.data.impl.di

import features.data.api.auth.datasource.AuthDataSource
import features.data.impl.auth.datasource.AuthDataSourceImpl
import features.data.impl.auth.repository.AuthRepositoryImpl
import features.domain.api.auth.repository.AuthRepository
import kotlinx.coroutines.Dispatchers
import org.koin.dsl.module

val dataDiModule = module {
    factory<AuthDataSource> {
        AuthDataSourceImpl(
            httpWrapper = get(),
            dispatcher = Dispatchers.Default
        )
    }

    factory<AuthRepository> {
        AuthRepositoryImpl(
            dataSource = get()
        )
    }
}