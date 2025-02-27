package foundation.di

import org.koin.dsl.module

val foundationDiModule = module {
    includes(platformDiModule)
}