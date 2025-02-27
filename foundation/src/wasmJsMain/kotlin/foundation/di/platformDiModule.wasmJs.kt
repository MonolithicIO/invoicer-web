package foundation.di

import foundation.network.HttpWrapper
import foundation.network.WasmHttpWrapper
import org.koin.core.module.Module
import org.koin.dsl.module

internal actual val platformDiModule: Module = module {
    factory<HttpWrapper> { WasmHttpWrapper() }
}