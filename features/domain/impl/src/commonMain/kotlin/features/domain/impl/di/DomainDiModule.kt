package features.domain.impl.di

import features.domain.api.auth.service.LoginService
import features.domain.impl.auth.services.LoginServiceImpl
import org.koin.dsl.module

val domainDiModule = module {
    factory<LoginService> {
        LoginServiceImpl(
            authRepository = get()
        )
    }
}